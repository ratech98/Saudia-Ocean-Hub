import React, { useState } from "react";
import "./Navabr.css";
import Logo from "../../assets/Logo/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "../../Screens/Images";
import { useDispatch } from "react-redux";
import { AuthToken, TokenDecodeData, UserId } from "../../redux/slices";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";

const Navbar = ({ showLoginSignUp, presentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    dispatch(TokenDecodeData(null));
    dispatch(UserId(null));
    dispatch(AuthToken(null));
    localStorage.removeItem("session");
    localStorage.removeItem("persist:root");
    navigate("/logIn");
    setOpenModal(false);
  };

  const modalStyle = {
    display: openModal ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  };
  // console.log("location", location.pathname);

  const warningMsg = () => {
    toast.info("Under Development", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
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
              {console.log('presentPage === "Home"', presentPage === "Home")}
              <Nav.Item>
                <Typography
                  className="custom-text-style"
                  style={{
                    color: presentPage === "Home" ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === "Home" ? "underline" : "none",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Home
                </Typography>
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link href="" eventKey="link-1">
                  For Boat Owners
                </Nav.Link> */}
                <Typography
                  className="custom-text-style"
                  style={{
                    color:
                      presentPage === "For Boat Owners" ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === "For Boat Owners" ? "underline" : "none",
                    marginLeft: "25px",
                  }}
                  onClick={() => {
                    warningMsg();
                  }}
                >
                  For Boat Owners
                </Typography>
              </Nav.Item>
              <Nav.Item>
                {/* <Nav.Link href="">For Boat Rentals</Nav.Link> */}
                <Typography
                  className="custom-text-style"
                  style={{
                    color:
                      presentPage === "For Boat Rentals"
                        ? "#026b93"
                        : "#424651",
                    textDecoration:
                      presentPage === "For Boat Owners" ? "underline" : "none",
                    marginLeft: "25px",
                  }}
                  onClick={() => {
                    warningMsg();
                  }}
                >
                  For Boat Rentals
                </Typography>
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
                  onClick={() => {
                    warningMsg();
                  }}
                />
                <img
                  alt="iocn"
                  src={IMAGES.BELL}
                  style={styles.searchIcon}
                  onClick={() => {
                    navigate("/notification");
                  }}
                />
                <img
                  alt="iocn"
                  src={IMAGES.PROFILE_ICON}
                  style={styles.profileImg}
                  onClick={() => {
                    handleOpenModal();
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
      {openModal ? (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <button style={logoutButtonStyle} onClick={handleLogout}>
              Logout
            </button>
            <button style={cancelButtonStyle} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
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
    width: "35px",
    height: "35px",

    opacity: 5,
  },
  Icon: {
    width: "30px",
    height: "30px",
  },
  searchIcon: {
    width: "25px",
    height: "25px",
    marginRight: "25px",
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

const modalContentStyle = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "300px",
};

const buttonStyle = {
  marginBottom: "10px",
  marginRight: "10px",
  padding: "10px 20px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

const logoutButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
  color: "white",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ccc",
  color: "black",
};
