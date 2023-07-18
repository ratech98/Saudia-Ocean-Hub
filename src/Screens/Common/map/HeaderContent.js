import { Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../Images";
import LogOutModal from "../../Dash/LogOutModal";
import { useDispatch } from "react-redux";
import { AuthToken, TokenDecodeData, UserId } from "../../../redux/slices";
import { useNavigate } from "react-router-dom";

export const HeaderContent = ({
  handleBack,
  contentname1,
  contentname2,
  contentname3,
  contentname4,
  contentname5,
  contentname6,
  search,
  showLoginSignUp = false,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <>
      <div style={styles.root}>
        <div style={styles.body}>
          <div style={styles.rowContent}>
            <img alt="iocn" src={IMAGES.APP_ICON} style={styles.appIcon} />
            <div style={styles.diplayTxtContent}>
              {contentname1 ? (
                <Typography
                  style={{ ...styles.titleTxt, marginLeft: "50px" }}
                  onClick={() => {
                    handleBack(contentname1);
                  }}
                >
                  {contentname1}
                </Typography>
              ) : null}
              {contentname2 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname2);
                  }}
                >
                  {contentname2}
                </Typography>
              ) : null}
              {contentname3 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname3);
                  }}
                >
                  {contentname3}
                </Typography>
              ) : null}
              {contentname4 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname4}
                </Typography>
              ) : null}
              {contentname5 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname5}
                </Typography>
              ) : null}
              {contentname6 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname6}
                </Typography>
              ) : null}
            </div>
          </div>
          {showLoginSignUp ? (
            <div style={styles.rowContent}>
              <div style={styles.diplayTxtContent}>
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack("Log In");
                  }}
                >
                  {"Log In"}
                </Typography>
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack("Sign Up");
                  }}
                >
                  {"Sign Up"}
                </Typography>
              </div>
            </div>
          ) : (
            <div style={styles.rowContent}>
              <img
                alt="iocn"
                src={IMAGES.SEARCH}
                style={styles.searchIcon}
                onClick={() => {
                  handleBack(search);
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
                onClick={() => {
                  handleOpenModal();
                }}
              />
            </div>
          )}
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
  },
  Icon: {
    width: "30px",
    height: "30px",
  },
  searchIcon: {
    width: "25px",
    height: "25px",
    marginRight: "35px",
  },
  diplayTxtContent: {
    display: "flex",
  },
  titleTxt: {
    fontSize: "18px",
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
