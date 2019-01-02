import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Sidebar from "../components/sidebar";

export default function Template(props) {
  let { markdownRemark, allMarkdownRemark } = props.data; // data.markdownRemark holds our post data

  const { frontmatter, html } = markdownRemark;
  const prevLink =
    frontmatter.order > 0 ? (
      <Link
        className="prev"
        to={
          allMarkdownRemark.edges[frontmatter.order - 1].node.frontmatter.path
        }
      >
        {"← " +
          allMarkdownRemark.edges[frontmatter.order - 1].node.frontmatter.title}
      </Link>
    ) : null;
  const nextLink =
    frontmatter.order + 1 < allMarkdownRemark.edges.length ? (
      <Link
        className="next"
        to={
          allMarkdownRemark.edges[frontmatter.order + 1].node.frontmatter.path
        }
      >
        {allMarkdownRemark.edges[frontmatter.order + 1].node.frontmatter.title +
          " →"}
      </Link>
    ) : null;
  return (

            <Sidebar
          title="Lessons"
          content={allMarkdownRemark.edges}>
    <div className="lesson-container">
      <div className="lesson">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="lesson-links">
          {prevLink}
          {nextLink}
        </div>
      </div>
    </div>

        </Sidebar>
  );
}

export const pageQuery = graphql`
  query LessonByPath($path: String!, $course: String!) {
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
     	filter: { fields: { isCourse: {eq: false}, course: {eq: $course }}}
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
