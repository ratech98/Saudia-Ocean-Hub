import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { UserType } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./UserChoice.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import IMAGES from "../../Images";

export const UserChoice = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUser = (values) => {
    setUserType(values);
  };

  return (
    <div className="user-choice-header">
      <img src={IMAGES.APP_ICON} alt="ICON" className="appIcon" />
      <Container
        style={{
          // backgroundColor: "ActiveBorder",
          padding: "20px 0px",
          height: "100%",
        }}
        // fluid
        className="user-body"
      >
        {/* <div> */}
        <Typography className="user-heading">
          Join Us In Saudia Ocean Hub
        </Typography>

        {/* <div className="user-options"> */}

        <Container
          class="user-options"
          style={{
            // backgroundColor: "lightsalmon",
            height: "100%",
          }}
        >
          <Row
            style={{
              display: "flex",
              height: "100%",

              width: "100%",
              margin: "0px",
              padding: "0px",
              // backgroundColor: "red",
              justifyContent: "space-between",
            }}
          >
            <Col
              md={6}
              sm={12}
              style={{
                margin: "0px",
                padding: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // alignContent: "center",

                // alignSelf: "center",
                // backgroundColor: "yellow",
              }}
            >
              <div
                // md={10}
                // sm={12}
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
                <Typography className="user-choice-text">
                  I am a Boat Owner, offering my boat
                </Typography>
              </div>
            </Col>

            {/* ====================================================seleect=============================================== */}
            <Col
              md={6}
              sm={12}
              style={{
                margin: "0px",
                padding: "0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "lightseagreen",
                // alignContent: "center",
                // alignItems: "center",
                // alignSelf: "center",
              }}
            >
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
                <Typography className="user-choice-text">
                  I am a Customer, looking for a new experience
                </Typography>
              </div>
            </Col>
          </Row>
        </Container>

        {/* </div> */}

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
        {/* </div> */}
      </Container>
    </div>
  );
};
