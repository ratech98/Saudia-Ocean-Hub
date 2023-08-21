import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import "../Setting.css";
import { withStyles } from "@mui/styles";
import { Edit } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import IMAGES from "../../../Images";
import { VerifyOTPmodal } from "./VerifyOTPmodal";
import { ChangePwdModal } from "./ChangePwdModal";

const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

const useStyles = makeStyles((theme) => ({
  customSwitch: {
    "&$checked": {
      color: "#3973a5", // Change this to the desired thumb color
      margin: "0px",
      //   backgroundColor: "red",
      //   padding: "0px",
      //   alignSelf: "center",
    },
    "&$checked + $track": {
      backgroundColor: "#3973a5", // Change this to the desired track color
      margin: "0px",
      //   backgroundColor: "red",
    },
  },
  checked: {},
  track: {},
}));

export const SecurityAndPwdTab = ({}) => {
  const classes = useStyles();
  const [toggled, setToggled] = React.useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
    setShowPwdModal(false);
  };

  return (
    <>
      {showPwdModal ? (
        <ChangePwdModal
          showmodal={showPwdModal}
          handleModalClose={handleModalClose}
        />
      ) : null}
      {showModal ? (
        <VerifyOTPmodal
          showmodal={showModal}
          handleModalClose={handleModalClose}
        />
      ) : null}
      <div className="security-pwd-container">
        <div className="security-pwd">
          <Container
            style={{
              padding: "50px 94px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0px 0px 0px 0px",
                padding: "0px 10px 0px 0px",
                justifyContent: "space-between",
                //   backgroundColor: "lightpink",
              }}
            >
              <Typography className="security-pwd-title-txt">
                Password
              </Typography>

              <IconButton
                style={{
                  width: "53px",
                  height: "53px",
                  padding: "14.8px 13.5px 14.6px 15.9px",
                  border: "solid 1px #3973a5",
                  color: "#3973a5", // Background color of the IconButton
                  backgroundColor: "white", // Color of the Edit icon
                }}
                onClick={() => {
                  setShowPwdModal(true);
                }}
              >
                <Edit backgroundColor="#3973a5" />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "30px 0px 0px 0px",
              }}
            >
              <div className="tick-background-design">
                <Typography style={{ color: "white" }}>✔</Typography>
              </div>
              <Typography className="pwd-second-title">
                Password has been set
              </Typography>
            </div>
            <Typography className="sub-title-info">
              You currently use Google sign-in to login
            </Typography>
          </Container>
        </div>
        <div className="security-pwd" style={{ marginTop: "10px" }}>
          <Container
            style={{
              padding: "50px 94px",
            }}
          >
            <Typography className="security-pwd-title-txt">
              Two-Factor Authentication Options
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "30px 0px 0px 0px",
                justifyContent: "space-between",
                // backgroundColor: "lightpink",
              }}
            >
              <Typography
                className="pwd-second-title"
                style={{ margin: "0px", fontSize: "24px" }}
              >
                Email Verification
              </Typography>
              <Switch
                checked={toggled}
                onChange={(e) => setToggled(e.target.checked)}
                classes={{
                  switchBase: classes.customSwitch,
                  checked: classes.checked,
                  track: classes.track,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "10px 0px 0px 0px",
              }}
            >
              <div className="tick-background-design">
                <Typography style={{ color: "white" }}>✔</Typography>
              </div>
              <Typography className="pwd-second-title">Enabled</Typography>
            </div>
            <Typography className="sub-title-info">
              Receive passcode from your email to confirm it's you
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "30px 0px 0px 0px",
                padding: "0px 10px 0px 0px",
                justifyContent: "space-between",
                //   backgroundColor: "lightpink",
              }}
            >
              <Typography
                className="pwd-second-title"
                style={{ margin: "0px" }}
              >
                Phone Verification
              </Typography>
              <img
                src={IMAGES.TOGGELE_BUTTON}
                alt="toggle-off"
                style={{ width: "40px", height: "40px" }}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </div>
            <Typography className="sub-title-info" style={{ margin: "0px" }}>
              Receive a six digit code by text message to confirm it’s you.
            </Typography>
          </Container>
        </div>
      </div>
    </>
  );
};
