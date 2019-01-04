import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";
import Card from "../components/TOCCourse";

export default function Template(props) {
  let { mdx, allMdx } = props.data; // data.mdx holds our post data

  const { frontmatter, html } = mdx;

  return (
    <div className="lesson-container">
      <Card
        title="Contents"
        content={allMdx.edges}
      />
      <div className="lesson">
        <h1>{frontmatter.title}</h1>
        <MDXRenderer
          className="lesson-content"
        >{mdx.code.body}</MDXRenderer>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query CourseByPath($path: String!, $course: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      code {
        body
      }
      frontmatter {
        path
        title
        order
        videoid
      }
    }
    allMdx(
      sort: { order: ASC, fields: [frontmatter___order] }
     	filter: { fields: { isCourse: {eq: false}, course: {eq: $course }}}
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            order
            path
            title
            videoid
          }
        }
      }
    }
  }
`;
