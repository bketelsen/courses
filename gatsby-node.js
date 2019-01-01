const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({  actions, graphql }) => {
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
      console.log(node.fields.sourceName);
      createPage({
        path: node.frontmatter.path,
        component: (node.fields.sourceName == "courses" ? courseTemplate : lessonTemplate)
      });
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    // Update the page.
    createPage(page)
  }
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
      if (parent.relativeDirectory !="" ){
        console.log(parent.relativeDirectory);
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
      }
    }
  }
};