import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Insta from "../../assets/Icons/instagram.svg";
import Snap from "../../assets/Icons/snapchat.svg";
import Youtube from "../../assets/Icons/youtube.svg";

const Footer = () => {
  return (
    <div className="footer">
      <Container className="w-100 text-center">
        <Row className="justify-content-center">
          <Col>
            <div className="d-flex justify-content-center">
              <Nav className="w-100 justify-content-center ">
                <Nav.Item>
                  <Nav.Link>
                    <img className="social-icons" src={Insta} alt="Insta" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <img className="social-icons" src={Snap} alt="Snap" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <img className="social-icons" src={Youtube} alt="Youtube" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <Nav className="w-100 justify-content-center footer-links">
              <Nav.Item>
                <Nav.Link>About Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Help & Support</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Contact Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Terms Of Service</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>Privacy Policy</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
      <div className="copyright text-center">
        <p className="text-center">Copyright 2022 ...</p>
      </div>
    </div>
  );
};

export default Footer;
