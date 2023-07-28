import { Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../Images";
import { useDispatch } from "react-redux";
import { AuthToken, TokenDecodeData, UserId } from "../../../redux/slices";
import { useNavigate } from "react-router-dom";
import { animated, easings, useSpring } from "react-spring";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import MY_APP_ICON from "../../../assets/Logo/logo.png";
import MY_PROFILE from "../../../assets/Images/profileIcon.png";
import "./HeaderContent.css";

const NamingContent = animated(
  styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    // fontStyle: `bold`,
    fontSize: "18px",
    fontFamily: `Poppins`,
    fontWeight: `normal`,
    letterSpacing: `normal`,
    textTransform: `none`,
    margin: `0px`,
    lineHeight: "1.5",
    color: "#424651",
    // color: "#03396f",

    fontStretch: "normal",
    fontStyle: "normal",

    marginRight: "30px",
    // textAlign: "center",
    cursor: "pointer",
  }))
);

const Image1 = animated(
  styled("div")({
    backgroundImage: `url(${MY_APP_ICON})`,
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    borderRadius: `6px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    alignSelf: `stretch`,
    // height: `251px`,
    margin: `0px`,
    // backgroundColor: "red",
  })
);
export const HeaderContent = ({
  handleBack,
  contentname1,
  contentname2,
  contentname3,
  contentname4,
  contentname5,
  contentname6,
  search = "/search",
  showLoginSignUp = false,
  presentPage = "",
}) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [TitleSpring, TitleApi] = useSpring(() => ({
    config: {
      duration: 10,
      easing: easings["easeInOutExpo"],
    },
    delay: 1250,
    from: { transform: "translateY(-25px)", opacity: 0 },
  }));

  const slideInAnimation = useSpring({
    from: { marginLeft: "-100%" }, // Start from left side of the container
    to: { marginLeft: "0%" }, // Slide to the original position
    config: {
      duration: 1000, // Animation duration in milliseconds
    },
  });

  const [Image1Spring, Image1Api] = useSpring(() => ({
    config: {
      duration: 200,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9) translateX(-100%)", opacity: 0 },
    to: { transform: "scale(1) translateX(0)", opacity: 1 },
  }));

  const [transformSpring, transformApi] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9) translateX(-100%)" },
    to: { transform: "scale(1) translateX(0)" },
  }));

  const [opacitySpring, opacityApi] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  // from: { transform: "scale(0.9) translateX(-100%)", opacity: 0 },
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

  React.useEffect(() => {
    // Image1Api.start({
    //   ...{ transform: "scale(1)", opacity: 1 },
    //   delay: 1000,
    //   config: { duration: 750 },
    // });
    TitleApi.start({
      ...{ transform: "translateX(0px)", opacity: 1 },
      delay: 200, // Change the delay to 500 milliseconds
      config: { duration: 500 }, // This is the duration of the animation itself, not the delay
    });
    // Q3DotsApi.start({
    //   ...{ opacity: 1 },
    //   delay: 1250,
    //   config: { duration: 500 },
    // });
    // Details1Api.start({
    //   ...{ transform: "translateY(0px)", opacity: 1 },
    //   delay: 1500,
    //   config: { duration: 500 },
    // });
    // ButtonContainedApi.start({
    //   ...{ transform: "translateY(0px)", opacity: 1 },
    //   delay: 1750,
    //   config: { duration: 500 },
    // });
  }, []);

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

  const ImageFrame = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    //   padding: `10px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
    // backgroundColor: "#f6f6f6",
    backgroundColor: "red",
  });

  return (
    <>
      <div class="root">
        <div class="body">
          <div class="firstRowContent">
            <img alt="iocn" src={IMAGES.APP_ICON} className="appIcon" />
            <div class="diplayTxtContent">
              {contentname1 ? (
                <>
                  <Typography
                    style={{
                      color:
                        presentPage === contentname1 ? "#026b93" : "#424651",
                      textDecoration:
                        presentPage === contentname1 ? `underline` : "none",
                    }}
                    onClick={() => {
                      handleBack(contentname1);
                    }}
                    className="contentName"
                  >
                    {contentname1}
                  </Typography>
                </>
              ) : null}
              {contentname2 ? (
                <Typography
                  style={{
                    color: presentPage === contentname2 ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === contentname2 ? `underline` : "none",
                  }}
                  onClick={() => {
                    handleBack(contentname2);
                  }}
                  className="contentName"
                >
                  {contentname2}
                </Typography>
              ) : null}
              {contentname3 ? (
                <Typography
                  style={{
                    color: presentPage === contentname3 ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === contentname3 ? `underline` : "none",
                  }}
                  onClick={() => {
                    handleBack(contentname3);
                  }}
                  className="contentName"
                >
                  {contentname3}
                </Typography>
              ) : null}
              {contentname4 ? (
                <Typography
                  style={{
                    color: presentPage === contentname4 ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === contentname4 ? `underline` : "none",
                  }}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                  className="contentName"
                >
                  {contentname4}
                </Typography>
              ) : null}
              {contentname5 ? (
                <Typography
                  style={{
                    color: presentPage === contentname5 ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === contentname5 ? `underline` : "none",
                  }}
                  onClick={() => {
                    handleBack(contentname5);
                  }}
                  className="contentName"
                >
                  {contentname5}
                </Typography>
              ) : null}
              {contentname6 ? (
                <Typography
                  style={{
                    color: presentPage === contentname6 ? "#026b93" : "#424651",
                    textDecoration:
                      presentPage === contentname6 ? `underline` : "none",
                  }}
                  onClick={() => {
                    handleBack(contentname6);
                  }}
                  className="contentName"
                >
                  {contentname6}
                </Typography>
              ) : null}
            </div>
          </div>

          <div className="iconAndAuth">
            {showLoginSignUp ? (
              <div className="rowContent">
                <div
                  // style={styles.diplayTxtContent}
                  className="diplayTxtContent"
                >
                  <Typography
                    // style={styles.titleTxt}
                    className="titleTxt"
                    onClick={() => {
                      handleBack("Log In");
                    }}
                  >
                    {"Log In"}
                  </Typography>
                  <Typography
                    className="titleTxt"
                    // style={styles.titleTxt}
                    onClick={() => {
                      handleBack("Sign Up");
                    }}
                  >
                    {"Sign Up"}
                  </Typography>
                </div>
              </div>
            ) : (
              <div className="iconRowContent">
                <div
                  style={{
                    paddingBottom: presentPage === search ? "5px" : "none",
                    borderBottom:
                      presentPage === search ? "2px solid #3973a5" : "none",
                  }}
                  // className="bottomLineStyle"
                >
                  <img
                    alt="iocn"
                    src={
                      presentPage === search
                        ? IMAGES?.SEARCH_BLUE
                        : IMAGES.SEARCH
                    }
                    className="searchIcon"
                    onClick={() => {
                      handleBack(search);
                    }}
                  />
                </div>
                <img
                  alt="iocn"
                  src={IMAGES.EMAIL_ICON}
                  className="searchIcon"
                  onClick={() => {
                    toast.info("Under Development", {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 2000,
                    });
                  }}
                />
                {/* notification */}
                <div
                  className="bottomLineStyle"
                  style={{
                    paddingBottom:
                      presentPage === "notification" ? "5px" : "none",
                    borderBottom:
                      presentPage === "notification"
                        ? "2px solid #3973a5"
                        : "none",
                  }}
                >
                  <img
                    alt="iocn"
                    src={
                      presentPage === "notification"
                        ? IMAGES?.BELL_COLOR
                        : IMAGES.BELL
                    }
                    className="searchIcon"
                    onClick={() => {
                      navigate("/notification");
                    }}
                  />
                </div>

                <div>
                  <Image1
                    style={{
                      backgroundImage: `url(${MY_PROFILE})`,
                    }}
                    className="profileImg"
                    onClick={() => {
                      handleOpenModal();
                    }}
                  ></Image1>
                </div>
              </div>
            )}
          </div>
        </div>
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
    </>
  );
};

// "@media (max-width: 768px)": {
//   body: {
//     padding: "16px 30px", // Adjust padding for smaller screens
//   },
//   appIcon: {
//     width: "150px", // Adjust appIcon size for smaller screens
//   },
//   iconRowContent: {
//     width: "30%", // Adjust the width for smaller screens
//   },
//   titleTxt: {
//     marginRight: "20px", // Adjust margin for smaller screens
//     fontSize: "16px", // Adjust font size for smaller screens
//   },
//   // Add any other style changes for smaller screens
// },
// // Media query for screens smaller than 576px
// "@media (max-width: 576px)": {
//   body: {
//     padding: "10px 20px", // Adjust padding for even smaller screens
//   },
//   appIcon: {
//     width: "100px", // Adjust appIcon size for even smaller screens
//   },
//   iconRowContent: {
//     width: "40%", // Adjust the width for even smaller screens
//   },
//   titleTxt: {
//     marginRight: "10px", // Adjust margin for even smaller screens
//     fontSize: "14px", // Adjust font size for even smaller screens
//   },
// },

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
