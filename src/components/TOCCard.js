import React from "react";
import Link from "gatsby-link";

import "./TOCCard.css";

const CourseCard = ({ content, title }) => (
  <div className="main-card">
    <h1 className="lesson-title gradient">{title}</h1>
    <div className="lesson-content">
      <ol>
        {content.map(course => (
          <li key={course.node.frontmatter.path}>
            <Link to={course.node.frontmatter.path}>
              {course.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default CourseCard;
