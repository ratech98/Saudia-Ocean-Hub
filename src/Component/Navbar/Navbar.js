import React from "react";
import "./Navabr.css";
import Logo from "../../assets/Logo/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <Container className="w-100 d-inline">
        <Row>
          <Col sm={3}>
            <Nav>
              <Nav.Item>
                <Nav.Link>
                  <img src={Logo} className="site_logo_img" alt="logo" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={7} className="d-flex align-items-center">
            <Nav>
              <Nav.Item>
                <Nav.Link href="/DashBoard">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">For Boat Owners</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Rental">For Boat Rentals</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={2} className="d-flex align-items-center">
            <Nav>
              <Nav.Item>
                <Nav.Link href="/logIn">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" href="/userChoice">
                  SignUp
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
