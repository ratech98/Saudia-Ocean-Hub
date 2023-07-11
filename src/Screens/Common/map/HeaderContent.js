import { Typography } from "@mui/material";
import React from "react";
import IMAGES from "../../Images";

export const HeaderContent = ({
  handleBack,
  contentname1,
  contentname2,
  contentname3,
  contentname4,
  showLoginSignUp = false,
}) => {
  return (
    <div style={styles.root}>
      <div style={styles.body}>
        <div style={styles.rowContent}>
          <img alt="iocn" src={IMAGES.APP_ICON} style={styles.appIcon} />
          <div style={styles.diplayTxtContent}>
            <Typography
              style={{ ...styles.titleTxt, marginLeft: "50px" }}
              onClick={() => {
                handleBack(contentname1);
              }}
            >
              {contentname1}
            </Typography>
            <Typography
              style={styles.titleTxt}
              onClick={() => {
                handleBack(contentname2);
              }}
            >
              {contentname2}
            </Typography>
            <Typography
              style={styles.titleTxt}
              onClick={() => {
                handleBack(contentname3);
              }}
            >
              {contentname3}
            </Typography>
            <Typography
              style={styles.titleTxt}
              onClick={() => {
                handleBack(contentname4);
              }}
            >
              {contentname4}
            </Typography>
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
            <img alt="iocn" src={IMAGES.SEARCH} style={styles.searchIcon} />
            <img alt="iocn" src={IMAGES.EMAIL_ICON} style={styles.searchIcon} />
            <img alt="iocn" src={IMAGES.BELL} style={styles.searchIcon} />
            <img
              alt="iocn"
              src={IMAGES.PROFILE_ICON}
              style={styles.profileImg}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100vw",
  },
  body: {
    width: "100vw",
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
    width: "77px",
    height: "77px",
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
