import { Link } from "gatsby";
import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

interface LayoutProps {
  currentLocation: string;
  title: string;
  children: any | any[];
}

export default class Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center logo">Anjana Iyer</h1>
          </Col>
        </Row>
        <nav className="main-nav sticky-top">
          <Row>
            <Col>
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <Link
                    to="/"
                    className={
                      this.props.currentLocation === "/work" ||
                      this.props.currentLocation === "/" ||
                      this.props.currentLocation === "/index"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Work
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/about"
                    className={
                      this.props.currentLocation === "/about"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    About
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </nav>
        <main>{this.props.children}</main>
        <footer>
          <Row>
            <Col className="text-center">
              © {new Date().getFullYear()} Anjana Iyer
            </Col>
          </Row>
        </footer>
      </Container>
    );
  }
}
