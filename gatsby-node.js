const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({  actions, graphql }) => {
  console.log("create pages");
  const { createPage } = actions;

  const lessonTemplate = path.resolve(`src/templates/lessonTemplate.js`);
  const courseTemplate = path.resolve(`src/templates/courseTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___order] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              sourceName
              course
              isCourse
            }
            frontmatter {
              order
              path
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.fields.sourceName ==="courses") {
        console.log("creating a course page");
        console.log(node.fields.course);
      createPage({
        path: node.frontmatter.path,
        component: courseTemplate,
        context: {
          course: node.fields.course
        }
      });
      } else {
        console.log("creating a lesson page");
        console.log(node.fields.course);
      createPage({
        path: node.frontmatter.path,
        component: lessonTemplate,
        context: {
          course: node.fields.course
        }

      });
    }
    });
  });
};


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    if (parent.internal.type === "File") {
      createNodeField({
        name: `sourceName`,
        node,
        value: path.dirname(parent.absolutePath).split(path.sep).pop()
      });
      createNodeField({
        name: `isCourse`,
        node,
        value: false
      });
      if (parent.relativeDirectory !="" ){

      createNodeField({
        name: `course`,
        node,
        value: parent.relativeDirectory
      });
} else {
      createNodeField({
        name: `isCourse`,
        node,
        value: true
      });
      createNodeField({
        name: `course`,
        node,
        value: node.frontmatter.path.split(path.sep).pop()
      });
      }
    }
  }
};