import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import IMAGES from "../Images";

export const Confirmation = () => {
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  // const navigate = useHistory();

  return (
    <div style={styles.container}>
      <img src={IMAGES.APP_ICON} alt="ICON" style={styles.appIcon} />
      <div style={styles.body}>
        <div style={styles.insideBody}>
          <img
            src={IMAGES.CONFIRM_TICK}
            alt="ICON"
            style={{
              width: "200px",
              height: "200px",
            }}
          />
          <Typography style={styles.reqSentTxt}>
            Request Sent Successfully
          </Typography>
          <Typography style={styles.msgTxt}>
            Our team is now processing your request. If you have any further
            questions or need assistance, please don't hesitate to contact our
            support team
          </Typography>
          <Typography style={styles.backToHomeTxt}>back to home</Typography>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f6f6f6",
    paddingBottom: "100px",
  },
  appIcon: {
    marginLeft: "140px",
    width: "200px",
    height: "100px",
  },
  body: {
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    // backgroundColor: "white",
    // width: "80%",
    // height: "100%",
  },
  insideBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    width: "75%",
    height: "100%",
    padding: "50px 0px",
  },
  reqSentTxt: {
    marginTop: "53px",
    fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
  },
  msgTxt: {
    marginTop: "14px",
    fontFamily: "Poppins",
    fontSize: "26px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.7)",
    width: "80%",
  },
  backToHomeTxt: {
    marginTop: "113px",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.46,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
