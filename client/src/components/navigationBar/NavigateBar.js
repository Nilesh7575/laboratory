import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import authToken from "../login/authToken";

function NavigateBar(props) {
  const authData = authToken();
  return (
    <div className="navi-bar">
      <Navbar bg="primary" expand="lg" title="navbar">
        <Container fluid>
          <Navbar.Brand href="#" className="navi">
            MY LAB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              title="nav"
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {authData.role === "admin" ? (
                <Nav
                  className="my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/userrecords" className="navi">
                    SAMPLE
                  </Nav.Link>
                  <Nav.Link href="/createtest" className="navi">
                    ENTER SAMPLE
                  </Nav.Link>
                  <Nav.Link href="/register" className="navi">
                    REGISTER
                  </Nav.Link>
                  <Nav.Link
                    className="navi"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      props.history.push("/");
                    }}
                  >
                    LOGOUT
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav.Link
                  className="navi"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    props.history.push("/");
                  }}
                >
                  {!authData.token ? "LOGIN" : "LOGOUT"}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigateBar;
