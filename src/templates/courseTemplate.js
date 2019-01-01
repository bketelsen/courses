import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";

export default function Template(props) {
  let { markdownRemark, allMarkdownRemark } = props.data; // data.markdownRemark holds our post data

  const { frontmatter, html } = markdownRemark;


  return (
    <div className="lesson-container">
      <div className="lesson">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query CourseByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        order
      }
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            order
            path
            title
          }
        }
      }
    }
  }
`;
