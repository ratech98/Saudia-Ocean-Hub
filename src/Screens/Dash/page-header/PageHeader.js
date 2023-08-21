/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import IMAGES from "../../Images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Drawer, List, ListItem, Typography } from "@material-ui/core";
import "./PageHeader.css";
import { Container, Nav } from "react-bootstrap";
import Footer from "../../../Component/Footer/Footer";

import Insta from "../../../assets/Icons/instagram.svg";
import Snap from "../../../assets/Icons/snapchat.svg";
import Youtube from "../../../assets/Icons/youtube.svg";
import Twitter from "../../../assets/Icons/twitter.png";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export const PageHeader = ({
  showLoginSignUp,
  handle_navigation,
  presentPage,
  link1,
  link2,
  link3,
  //
}) => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenModal = () => {
    // setOpenModal(true);
  };
  //   const handle_navigation = (pageName) => {
  //     // console.log("pageName", pageName);
  //     if (pageName === "Home") {
  //       navigate("/");
  //       // if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
  //       //   navigate("/boatOwnerDashBoard");
  //       // } else {
  //       //   navigate("/rental");
  //       // }
  //     } else if (pageName === "rental") {
  //       navigate("/rental");
  //     } else if (pageName === "boatOwnerDashBoard") {
  //       navigate("/boatOwnerDashBoard");
  //     } else {
  //       toast.info("Under Development", {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 2000,
  //       });
  //     }
  //   };

  //   const handleLink1Click = () => {
  //     window.scrollTo({ top: 1655, behavior: "smooth" });
  //   };
  //   const handleLink1Click2 = () => {
  //     window.scrollTo({ top: 850, behavior: "smooth" });
  //   };

  return (
    <div className="navigation-container-box">
      <Container className="header-container-style">
        {/* ---------------->> open drawer btn <<---------------- */}
        <div
          className="drawer-menu-icon"
          onClick={() => {
            setOpenDrawer(true);
          }}
          style={{ backgroundColor: "white" }}
        >
          <img src={IMAGES?.MENU_ICON} alt="menu" className="menu-icon" />
        </div>
        {/* ---------------->> list content <<---------------- || ---> appIcon <----> tab-list <---> search,mail,bell,-icons <--- */}
        <div className="all-content-box">
          <div className="icon-tabName-content">
            <img src={IMAGES.APP_ICON} className="app-icon-style" alt="logo" />

            <div className="tab-name-list">
              <Typography
                // className="tab-name-txt"
                className={class_name.header_content_txt}
                style={{
                  color: presentPage === "Home" ? "#026b93" : "#424651",
                  fontWeight: presentPage === "Home" ? "bolder" : "400",
                }}
                onClick={() => handle_navigation("Home")}
              >
                Home
              </Typography>

              {link1 ? (
                <>
                  <Typography
                    className={class_name.header_content_txt}
                    style={{
                      color: presentPage === link1 ? "#026b93" : "#424651",
                      fontWeight: presentPage === link1 ? "bolder" : "400",
                    }}
                    onClick={() => {
                      //   clicktoScroll
                      //     ? handleLink1Click()
                      //     :
                      handle_navigation(link1);
                    }}
                  >
                    {link1}
                  </Typography>
                </>
              ) : null}
              {link2 ? (
                <Typography
                  className={class_name.header_content_txt}
                  style={{
                    color: presentPage === link2 ? "#026b93" : "#424651",
                    fontWeight: presentPage === link2 ? "bolder" : "400",
                  }}
                  onClick={() => {
                    // clicktoScroll ? handleLink1Click2() :
                    handle_navigation(link2);
                  }}
                >
                  {link2}
                </Typography>
              ) : null}
              {link3 ? (
                <Typography
                  className={class_name.header_content_txt}
                  style={{
                    color: presentPage === link2 ? "#026b93" : "#424651",
                    fontWeight: presentPage === link3 ? "bolder" : "400",
                  }}
                  onClick={() => {
                    // clicktoScroll ? handleLink1Click2() :
                    handle_navigation(link3);
                  }}
                >
                  {link3}
                </Typography>
              ) : null}
            </div>
          </div>
          {showLoginSignUp ? (
            <div className="icon-group">
              <Typography
                className={class_name.header_content_txt}
                style={{
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handle_navigation("Login");
                }}
              >
                Login
              </Typography>
              <Typography
                className={class_name.header_content_txt}
                style={{
                  fontWeight: "bold",
                }}
                onClick={() => {
                  handle_navigation("SignUp");
                }}
              >
                SignUp
              </Typography>
            </div>
          ) : (
            <div className="icon-group">
              <img
                alt="iocn"
                src={IMAGES.SEARCH}
                className="search-mail-icon"
                onClick={() => {
                  navigate("/searchBoat");
                }}
              />
              <img
                alt="iocn"
                src={IMAGES.EMAIL_ICON}
                className="search-mail-icon"
                onClick={() => {
                  handle_navigation();
                }}
              />
              <img
                alt="iocn"
                src={IMAGES.BELL}
                className="bell-icon"
                onClick={() => {
                  navigate("/notification");
                }}
              />
              <div
              //   class="collapse navbar-collapse"
              >
                <img
                  alt="iocn"
                  src={IMAGES.PROFILE_ICON}
                  className="profile-icon"
                  onClick={() => {
                    handleOpenModal();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* ===========================================================            Drawer            ========================================= */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ style: { width: "90%", height: "100%" } }}
        data-bs-toggle="collapse"
      >
        <div
          style={
            {
              // backgroundColor: "red",
            }
          }
          className="drawer-styles"
        >
          <div
            style={{
              display: "flex",
              //   justifyContent: "space-evenly",
              //   alignSelf: "center",
              //   alignContent: "center",
              alignItems: "center",
              //   backgroundColor: "rebeccapurple",
              width: "100%",
              paddingLeft: "33px",
            }}
          >
            <img
              src={IMAGES.LEFT_BACK_BUTTON}
              alt="close"
              style={{
                width: "16px",
                height: "14px",
              }}
            />
            <div className="app-icon-drawer">
              <img
                src={IMAGES.APP_ICON}
                className="drawer-app-icon-style"
                alt="logo"
              />
            </div>
          </div>

          <List className="content-list">
            {showLoginSignUp ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  //   backgroundColor: "lightblue",
                  alignItems: "center",
                  padding: "30px 0",
                }}
              >
                <img
                  alt="profile"
                  src={IMAGES?.PROFILE_ICON}
                  style={{ width: "40px", height: "40px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    //   backgroundColor: "lightcyan",
                    marginLeft: "16px",
                  }}
                >
                  <Typography style={{ fontWeight: "bold" }}>
                    user name
                  </Typography>
                  <Typography style={{}}>Boat Owner</Typography>
                </div>
              </div>
            ) : null}
            <ListItem
              button
              onClick={() => {
                setOpenDrawer(false);
                handle_navigation("Home");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color: presentPage === "Home" ? "#026b93" : "#424651",
                }}
              >
                {"Home"}
              </Typography>
            </ListItem>
            {link1 ? (
              <>
                <ListItem
                  button
                  onClick={() => {
                    // clicktoScroll ? handleLink1Click() :
                    setOpenDrawer(false);
                    handle_navigation(link1);
                  }}
                >
                  <Typography
                    className="custom-text-style"
                    style={{
                      color: presentPage === link1 ? "#026b93" : "#424651",
                    }}
                  >
                    {link1}
                  </Typography>
                </ListItem>
              </>
            ) : null}
            {link2 ? (
              <ListItem
                button
                onClick={() => {
                  //   clicktoScroll ? handleLink1Click2() :
                  setOpenDrawer(false);
                  handle_navigation(link2);
                }}
              >
                <Typography
                  className="custom-text-style"
                  style={{
                    color: presentPage === link2 ? "#026b93" : "#424651",
                  }}
                >
                  {link2}
                </Typography>
              </ListItem>
            ) : null}
            {link3 ? (
              <ListItem
                button
                onClick={() => {
                  //   clicktoScroll ? handleLink1Click2() :
                  handle_navigation(link3);
                }}
              >
                <Typography
                  className="custom-text-style"
                  style={{
                    color: presentPage === link2 ? "#026b93" : "#424651",
                  }}
                >
                  {link3}
                </Typography>
              </ListItem>
            ) : null}
            {!showLoginSignUp ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="straight-line" />
                <ListItem
                  button
                  onClick={() => {
                    // clicktoScroll ? handleLink1Click() :
                    setOpenDrawer(false);
                    handle_navigation("Login");
                  }}
                >
                  <Typography
                    className="custom-text-style"
                    style={{
                      color: presentPage === "Login" ? "#026b93" : "#424651",
                    }}
                  >
                    Login
                  </Typography>
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    // clicktoScroll ? handleLink1Click() :
                    setOpenDrawer(false);
                    handle_navigation("SignUp");
                  }}
                >
                  <Typography
                    className="custom-text-style"
                    style={{
                      color: presentPage === "SignUp" ? "#026b93" : "#424651",
                    }}
                  >
                    SignUp
                  </Typography>
                </ListItem>
              </div>
            ) : null}

            <div className="straight-line" />
            <ListItem
              button
              onClick={() => {
                handle_navigation("");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color: presentPage === "About Us" ? "#026b93" : "#424651",
                }}
              >
                {"About Us"}
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handle_navigation("");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color:
                    presentPage === "Help & Support" ? "#026b93" : "#424651",
                }}
              >
                {"Help & Support"}
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handle_navigation("");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color: presentPage === "Contact Us" ? "#026b93" : "#424651",
                }}
              >
                {"Contact Us"}
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handle_navigation("");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color:
                    presentPage === "Terms of Service" ? "#026b93" : "#424651",
                }}
              >
                {"Terms of Service"}
              </Typography>
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handle_navigation("");
              }}
            >
              <Typography
                className="custom-text-style"
                style={{
                  color:
                    presentPage === "Privacy Policy" ? "#026b93" : "#424651",
                }}
              >
                {"Privacy Policy"}
              </Typography>
            </ListItem>
          </List>
        </div>
        <div className="end-content">
          <div className="straight-line2" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              padding: "30px 10px",
              alignContent: "flex-end",
            }}
          >
            <img className="social-icons" src={Twitter} alt="Twitter" />
            <img className="social-icons" src={Insta} alt="Insta" />
            <img className="social-icons" src={Snap} alt="Snap" />
            <img className="social-icons" src={Youtube} alt="Youtube" />
          </div>
          <div className="copyright text-center" style={{ width: "100%" }}>
            <p className="text-center">Copyright 2022 ...</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

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

const useStyles = makeStyles((theme) => ({
  header_content_txt: {
    marginLeft: "25px",
    // /* font-family: Poppins; */
    fontSize: "clamp(10px, 2vw, 20px)",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
    letterSpacing: 0.5,
  },
}));
