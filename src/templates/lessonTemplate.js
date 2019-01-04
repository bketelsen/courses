import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";
import Sidebar from "../components/sidebar";
import Vimeo from '@u-wave/react-vimeo';
import { MDXRenderer } from "gatsby-mdx";

export default function Template(props) {
  let { mdx, allMdx } = props.data; // data.mdx holds our post data

  const { frontmatter, html } = mdx;
  const prevLink =
    frontmatter.order > 0 ? (
      <Link
        className="prev"
        to={
          allMdx.edges[frontmatter.order - 1].node.frontmatter.path
        }
      >
        {"← " +
          allMdx.edges[frontmatter.order - 1].node.frontmatter.title}
      </Link>
    ) : null;
  const nextLink =
    frontmatter.order + 1 < allMdx.edges.length ? (
      <Link
        className="next"
        to={
          allMdx.edges[frontmatter.order + 1].node.frontmatter.path
        }
      >
        {allMdx.edges[frontmatter.order + 1].node.frontmatter.title +
          " →"}
      </Link>
    ) : null;
  return (

    <Sidebar
      title="Lessons"
      content={allMdx.edges}>
      <div className="lesson-container">
        <div className="lesson">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <Vimeo
            video={frontmatter.videoid}
            width="1080"
          />
          <MDXRenderer
            className="lesson-content"
          >{mdx.code.body}</MDXRenderer>
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
    mdx(frontmatter: { path: { eq: $path } }) {
      code { body }
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
