import { Link } from "gatsby";
import React from "react";

interface LayoutProps {
  currentLocation: string;
  title: string;
  children: any | any[];
}

export default class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <div>
        <header>
          {this.props.title}
          <ul className="nav">
            <li
              className={
                this.props.currentLocation === "/" ||
                this.props.currentLocation === "/index"
                  ? "active"
                  : ""
              }
            >
              <Link title="Work" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link
                title="About"
                to={"/about"}
                className={
                  this.props.currentLocation === "/about" ? "active" : ""
                }
              >
                About
              </Link>
            </li>
          </ul>
        </header>
        <main>{this.props.children}</main>
        <footer>© {new Date().getFullYear()} Anjana Iyer</footer>
      </div>
    );
  }
}
