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
    <div className="user-choice-root">
      <img src={IMAGES.APP_ICON} alt="ICON" className="app-icon" />
      <Container
        // fluid
        className="body"
      >
        <Typography className="title-txt">
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
                  <Typography className="option-text-style">
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
                  <Typography className="option-text-style">
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
  );
};
