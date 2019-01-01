import React from "react";
import Link from "gatsby-link";

import "./TOCLesson.css";

const LessonCard = ({ content, title }) => (
  <div className="lesson-main-card">
    <h1 className="lesson-title gradient">{title}</h1>
    <div className="lesson-content">
      <ol>
        {content.map(lesson => (
          <li key={lesson.node.frontmatter.path}>
            <Link to={lesson.node.frontmatter.path}>
              {lesson.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default LessonCard;
