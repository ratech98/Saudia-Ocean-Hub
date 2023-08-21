import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserType } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./UserChoice.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import IMAGES from "../../Images";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export const UserChoice = () => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUser = (values) => {
    setUserType(values);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <div className={class_name.show_outer_headder}>
        <img
          src={IMAGES.APP_ICON}
          alt="ICON"
          // className="app-icon"
          className={class_name.app_icon_style}
        />
      </div>
      <div
        // className="user-choice-root"
        className={class_name.body_content}
      >
        <div className={class_name.show_inner_headder}>
          <img src={IMAGES.APP_ICON} alt="ICON" className="app-icon" />
        </div>
        <Container
          // fluid
          className="body"
        >
          <Typography
            // className="title-txt"
            className={class_name.choice_title_txt}
          >
            Join Us In Saudia Ocean Hub
          </Typography>

          <Container className="container-option">
            <Row className="row-options">
              <Col className="col-options" md={6} sm={12}>
                <div
                  onClick={() => {
                    handleUser("BOAT_OWNER");
                  }}
                  className="options"
                >
                  <div
                    style={{
                      backgroundColor:
                        userType === "BOAT_OWNER" ? "dimgray" : "white",
                    }}
                    className="select-dot"
                  />
                  <div className="text-box">
                    <Typography
                      // className="option-text-style"
                      className={class_name.option_txt_style}
                    >
                      I am a Boat Owner, offering my boat
                    </Typography>
                  </div>
                </div>
              </Col>

              {/* ====================================================seleect=============================================== */}

              <Col className="col-options" md={6} sm={12}>
                <div
                  md={6}
                  sm={10}
                  onClick={() => {
                    handleUser("CUSTOMER");
                  }}
                  className="options"
                >
                  <div
                    style={{
                      backgroundColor:
                        userType === "CUSTOMER" ? "dimgray" : "white",
                    }}
                    className="select-dot"
                  />
                  <div className="text-box">
                    <Typography
                      // className="option-text-style"
                      className={class_name.option_txt_style}
                    >
                      I am a Customer, looking for a new experience
                    </Typography>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>

          <Button
            onClick={() => {
              dispatch(UserType(userType));
              navigate("/SignUp");
            }}
            className="btn"
          >
            <Typography className="btn-txt">Apply</Typography>
          </Button>

          <div className="log-in">
            <Typography className="login-txt">
              Already have an account?
            </Typography>
            <Typography
              onClick={() => {
                navigate("/LogIn");
              }}
              className="select-login"
            >
              Log in
            </Typography>
          </div>
        </Container>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  show_outer_headder: {
    display: "none",
  },
  app_icon_style: {
    width: "200px",
    height: "100px",
  },
  body_content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f6f6f6",
  },
  choice_title_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 48px)", // Adjust the range as needed
    fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    // textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },
  show_inner_headder: {
    display: "flex",
  },
  option_txt_style: {
    fontFamily: "Poppins",
    fontSize: "clamp(12px, 1vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    // textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  "@media (max-width: 767px)": {
    app_icon_style: {
      width: "96px",
      height: "48px",
      margin: "16px",
    },
    show_outer_headder: {
      display: "flex",
    },
    show_inner_headder: {
      display: "none",
    },
  },
}));
