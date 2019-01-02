import React from "react";
import Link from "gatsby-link";

import "./sidebar.css";
import { checkPropTypes } from "prop-types";

class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      active: true,
    }
}
 render() {
   let activeClass = (this.state.active ? "active" : "")
   return (
  <div className="wrapper">
    <nav id="sidebar" className={activeClass + " gradient"}>

      <div className="sidebar-header">
        <h3>Site</h3>
      </div>
            <Link to="/">
              Course List
            </Link>
      <div className="sidebar-header">
        <h3>{this.props.title}</h3>
      </div>

            <ol>
        {this.props.content.map(lesson => (
          <li key={lesson.node.frontmatter.path}>
            <Link to={lesson.node.frontmatter.path}>
              {lesson.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>

    <div className="index">
      <button type="button" id="sidebarCollapse" onClick={() => {
        this.setState({ active: !this.state.active })
      }} className= {"navbar-btn " + activeClass} >
        <span></span>
        <span></span>
        <span></span>
      </button>
        {this.props.children}
      </div>

  </div>
   )
 }
}

export default Sidebar;

