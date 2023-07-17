import React from "react";
import "./Navabr.css";
import Logo from "../../assets/Logo/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../Screens/Images";

const Navbar = ({ showLoginSignUp }) => {
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
                <Nav.Link href="/">Home</Nav.Link>
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
            {showLoginSignUp ? (
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
            ) : (
              <div style={styles.rowContent}>
                <img
                  alt="iocn"
                  src={IMAGES.SEARCH}
                  style={styles.searchIcon}
                  onClick={() => {
                    navigate("/searchBoat");
                  }}
                />
                <img
                  alt="iocn"
                  src={IMAGES.EMAIL_ICON}
                  style={styles.searchIcon}
                />
                <img alt="iocn" src={IMAGES.BELL} style={styles.searchIcon} />
                <img
                  alt="iocn"
                  src={IMAGES.PROFILE_ICON}
                  style={styles.profileImg}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;

const styles = {
  root: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  body: {
    width: "100%",
    display: "flex",
    padding: "24px 100px",
    justifyContent: "space-between",
  },
  appIcon: {
    width: "198px",
    height: "98px",
  },
  rowContent: {
    display: "flex",
    alignItems: "center",
  },
  profileImg: {
    width: "57px",
    height: "57px",
  },
  Icon: {
    width: "30px",
    height: "30px",
  },
  searchIcon: {
    width: "30px",
    height: "30px",
    marginRight: "35px",
  },
  diplayTxtContent: {
    display: "flex",
  },
  titleTxt: {
    fontSize: "24px",
    fontWeight: "normal",
    fontFamily: "Poppins",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#424651",
    marginRight: "30px",
    // textAlign: "center",
  },
};
