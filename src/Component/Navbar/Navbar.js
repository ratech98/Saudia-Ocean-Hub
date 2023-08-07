import React, { useState } from "react";
import "./Navabr.css";
import Logo from "../../assets/Logo/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import IMAGES from "../../Screens/Images";
import { useDispatch, useSelector } from "react-redux";
import { AuthToken, TokenDecodeData, UserId } from "../../redux/slices";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
// import searchIcon from "../../assets/Icons/search.svg";
// import mail from "../../assets/Icons/mail-svgrepo-com.png";
// import bell from "../../assets/Icons/bell.svg";
// import Ellipse from "../../assets/Images/bg_img.png";

const Navbar = ({
  showLoginSignUp,
  presentPage,
  link1,
  link2,
  link3,
  showItem,
  href1,
  href2,
  href3,
  showLogin,
  showProfile,
  num,
  num1,
  backgroundColor,
  clicktoScroll = false,
  homeBtn,
  homeBtnHref,
}) => {
  console
    .log
    // "nav bar ",
    // link1
    // link2,
    // link3,
    // showItem,
    // href1,
    // href2,
    // href3,
    // showLogin,
    // showProfile,
    // num,
    // num1,
    // backgroundColor
    ();
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const handleLink1Click = () => {
    window.scrollTo({ top: 1655, behavior: "smooth" });
  };
  const handleLink1Click2 = () => {
    window.scrollTo({ top: 850, behavior: "smooth" });
  };

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

  const handle_navigation = (pageName) => {
    console.log("pageName", pageName);
    if (pageName === "Home") {
      navigate("/");
      // if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
      //   navigate("/boatOwnerDashBoard");
      // } else {
      //   navigate("/rental");
      // }
    } else if (pageName === "rental") {
      navigate("/rental");
    } else if (pageName === "boatOwnerDashBoard") {
      navigate("/boatOwnerDashBoard");
    } else {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
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
              <Nav.Item>
                <Typography
                  className="custom-text-style"
                  style={{
                    color: presentPage === homeBtn ? "#026b93" : "#424651",
                    marginLeft: "25px",
                  }}
                  onClick={() => navigate(homeBtnHref)}
                >
                  {homeBtn}
                </Typography>
              </Nav.Item>
              {link1 ? (
                <>
                  <Nav.Item>
                    <Typography
                      className="custom-text-style"
                      style={{
                        color: presentPage === link1 ? "#026b93" : "#424651",

                        marginLeft: "25px",
                      }}
                      //   onClick={() => }
                      onClick={() => {
                        clicktoScroll
                          ? handleLink1Click()
                          : handle_navigation("/");
                      }}
                    >
                      {link1}
                    </Typography>
                  </Nav.Item>
                </>
              ) : null}
              {link2 ? (
                <Nav.Item>
                  <Typography
                    className="custom-text-style"
                    style={{
                      color: presentPage === link2 ? "#026b93" : "#424651",

                      marginLeft: "25px",
                    }}
                    onClick={() => {
                      clicktoScroll
                        ? handleLink1Click2()
                        : handle_navigation("");
                    }}
                  >
                    {link2}
                  </Typography>
                </Nav.Item>
              ) : null}
              {link3 ? (
                <Nav.Item>
                  <Typography
                    className="custom-text-style"
                    style={{
                      color: presentPage === link2 ? "#026b93" : "#424651",

                      marginLeft: "25px",
                    }}
                    onClick={() => {
                      clicktoScroll
                        ? handleLink1Click2()
                        : handle_navigation("");
                    }}
                  >
                    {link3}
                  </Typography>
                </Nav.Item>
              ) : null}
            </Nav>
          </Col>
          <Col sm={2} className="d-flex align-items-center">
            {showLoginSignUp ? (
              <Nav>
                <Nav.Item>
                  <Nav.Link
                    href="/logIn"
                    style={{ fontWeight: "bolder", fontSize: "15px" }}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    href="/userChoice"
                    style={{ fontWeight: "bolder", fontSize: "15px" }}
                  >
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
                    handle_navigation();
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
