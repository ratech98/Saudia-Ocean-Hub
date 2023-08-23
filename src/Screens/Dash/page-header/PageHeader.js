import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import IMAGES from "../../Images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Drawer, List, ListItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./PageHeader.css";

import Insta from "../../../assets/Icons/instagram.svg";
import Snap from "../../../assets/Icons/snapchat.svg";
import Youtube from "../../../assets/Icons/youtube.svg";
import Twitter from "../../../assets/Icons/twitter.png";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";
import useWindowDimensions from "../../../UI kit/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { AuthToken, TokenDecodeData, UserId } from "../../../redux/slices";

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
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { height, width } = useWindowDimensions();
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state) => state?.auth);

  const handleOpenModal = () => {
    setOpenModal(true);
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

  //   const handleLink1Click = () => {
  //     window.scrollTo({ top: 1655, behavior: "smooth" });
  //   };
  //   const handleLink1Click2 = () => {
  //     window.scrollTo({ top: 850, behavior: "smooth" });
  //   };

  return (
    <div className="navigation-container-box">
      <div className="header-container-style">
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
            {/* <img src={IMAGES.APP_ICON} className="app-icon-style" alt="logo" /> */}
            <img
              src={IMAGES.APP_ICON}
              className={class_name.picture_style}
              alt="logo"
            />

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
                // className="search-mail-icon"
                className={class_name.search_mail_icon}
                onClick={() => {
                  navigate("/searchBoat");
                }}
              />
              <img
                alt="iocn"
                src={IMAGES.EMAIL_ICON}
                // className="search-mail-icon"
                className={class_name.search_mail_icon}
                onClick={() => {
                  handle_navigation();
                }}
              />
              <img
                alt="iocn"
                src={IMAGES.BELL}
                // className="bell-icon"
                className={class_name.bell_icon}
                onClick={() => {
                  navigate("/notification");
                }}
              />
              <div className={class_name.profile_icon_div}>
                <img
                  alt="iocn"
                  src={IMAGES.PROFILE_ICON}
                  // className="profile-icon"
                  className={class_name.profile_icon_style}
                  onClick={() => {
                    handleOpenModal();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===========================================================            Drawer            ========================================= */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          style: {
            width: "90%",

            overflow: "hidden",
          },
        }}
        data-bs-toggle="collapse"
      >
        <div
          style={
            {
              // backgroundColor: "red"
            }
          }
        >
          <div
            style={{
              display: "flex",
              //   alignItems: "center",
              //   width: "100%",
              paddingLeft: "33px",
              paddingTop: 20,
              paddingRight: 33,
              justifyContent: "space-between",
            }}
          >
            <img
              src={IMAGES.LEFT_BACK_BUTTON}
              alt="close"
              style={{
                width: "16px",
                height: "14px",
                alignSelf: "center",
              }}
              onClick={() => {
                setOpenDrawer(false);
              }}
            />
            {/* <div className="app-icon-drawer"> */}
            <img
              src={IMAGES.APP_ICON}
              // className="drawer-app-icon-style"
              className={class_name.drawer_app_icon_style}
              alt="logo"
            />
            {/* </div> */}
          </div>

          <List
            className="content-list"
            style={{
              height: height - 265,
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              padding: 0,
              //   margin: 0,
            }}
          >
            <ListItem
              button
              onClick={() => {
                handleOpenModal();
                setOpenDrawer(false);
              }}
            >
              {!showLoginSignUp ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    alignItems: "center",
                    padding: "30px 0",
                    width: "100%",
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
                    <Typography style={{}}>
                      {auth?.tokenDecodeData?.user_type === "BOAT_OWNER"
                        ? "Boat Owner"
                        : "Customer"}
                    </Typography>
                  </div>
                </div>
              ) : null}
            </ListItem>
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
            {showLoginSignUp ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Divider
                  variant="middle"
                  style={{
                    backgroundColor: "rgba(172, 172, 172, 0.4)",
                    height: "1px",
                  }}
                />

                <ListItem
                  button
                  onClick={() => {
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

            <Divider
              variant="middle"
              style={{
                backgroundColor: "rgba(172, 172, 172, 0.4)",
                height: "1px",
              }}
            />

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
      {openModal ? (
        <div style={modalStyle} className={class_name.modal}>
          <div style={modalContentStyle} className={class_name.inside_modal}>
            <Typography
              style={
                width > 767
                  ? { fontSize: "32px", fontWeight: "bold" }
                  : { fontSize: "18px", fontWeight: "bold" }
              }
            >
              Logout Confirmation
            </Typography>
            <Typography
              style={
                width > 767
                  ? { fontSize: "24px", fontWeight: "normal" }
                  : { fontSize: "14px", fontWeight: "normal" }
              }
            >
              Are you sure you want to logout?
            </Typography>
            <div>
              <button style={logoutButtonStyle} onClick={handleLogout}>
                <Typography
                  style={
                    width > 767
                      ? { fontSize: "20px", fontWeight: "normal" }
                      : { fontSize: "10px", fontWeight: "normal" }
                  }
                >
                  Logout
                </Typography>
              </button>
              <button style={cancelButtonStyle} onClick={handleClose}>
                <Typography
                  style={
                    width > 767
                      ? { fontSize: "20px", fontWeight: "normal" }
                      : { fontSize: "10px", fontWeight: "normal" }
                  }
                >
                  Cancel
                </Typography>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const modalContentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  alignSelf: "center",
  alignTracks: "center",
  position: "fixed" /* Ensure it's fixed in the viewport */,
  top: "30%" /* Move the top of the modal to the vertical center */,
  left: "50%" /* Move the left of the modal to the horizontal center */,
  transform: "translate(-50%, -50%)" /* Center it precisely */,
  backgroundColor: "#f6f6f6",
  // backgroundColor: "white",
  padding: "2%",
  border: "1px solid #888",
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
    fontSize: "clamp(10px, 1.6vw, 20px)",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
    letterSpacing: 0.5,
  },
  picture_style: {
    width: "clamp(136px, 23vw, 198px)",
    height: "clamp(52px, 13vw, 98px)",
  },
  profile_icon_div: {
    display: "flex",
  },
  profile_icon_style: {
    width: "clamp(25px, 4.9vw, 45px)",
    height: "clamp(25px, 4.9vw, 45px)",
  },
  search_mail_icon: {
    width: "clamp(15px, 2vw, 25px)",
    height: "clamp(15px, 2vw, 25px)",
    marginRight: "10px",
    [theme.breakpoints.up("sm")]: {
      marginRight: "10px",
    },
    [theme.breakpoints.up("md")]: {
      marginRight: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: "25px",
    },
  },
  bell_icon: {
    width: "clamp(15px, 2vw, 25px)",
    height: "clamp(15px, 2vw, 25px)",
    marginRight: "10px",
    [theme.breakpoints.up("sm")]: {
      marginRight: "10px",
    },
    [theme.breakpoints.up("md")]: {
      marginRight: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: "25px",
    },
    modal: {
      // display: openModal ? "block" : "none",
      position: "fixed",
      zIndex: 1,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    inside_modal: {
      backgroundColor: "#fefefe",
      margin: "15% auto",
      padding: "20px",
      border: "1px solid #888",
      width: "300px",
    },
  },

  "@media (max-width: 767px)": {
    inside_modal: {
      backgroundColor: "#fefefe",
      margin: "15% auto",
      padding: "20px",
      border: "1px solid #888",
      width: "300px",
    },
    profile_icon_div: {
      display: "none",
    },
    picture_style: {
      width: "clamp(96px, 25vw, 165px)", // Adjust the range as needed
      height: "clamp(48px, 15vw, 98px)", // Adjust the range as needed
      // border: "solid 0.5px rgba(112, 112, 112, 0.3)",
      //   backgroundColor: "red",
    },
    search_mail_icon: {
      width: "clamp(10px, 5vw, 20px)",
      height: "clamp(10px, 5vw, 20px)",
      marginRight: "16px",
    },
    bell_icon: {
      width: "clamp(10px, 5vw, 20px)",
      height: "clamp(10px, 5vw, 20px)",
      marginRight: "0px",
    },
    drawer_app_icon_style: {
      width: "clamp(102px, 25vw, 152px)", // Adjust the range as needed
      height: "clamp(51px, 15vw, 81px)", // Adjust the range as needed
    },
  },
}));
