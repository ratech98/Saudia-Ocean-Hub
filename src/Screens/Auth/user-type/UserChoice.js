import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { UserType } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./UserChoice.css";
import { Button, Container } from "react-bootstrap";

export const UserChoice = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUser = (values) => {
    setUserType(values);
  };

  return (
    <Container>
      <div className="user-container">
        <Typography className="user-heading">
          Join Us In Saudia Ocean Hub
        </Typography>

        <div className="user-options">
          <div
            onClick={() => {
              handleUser("BOAT_OWNER");
            }}
            className="user-choice-option"
          >
            <div
              style={{
                backgroundColor:
                  userType === "BOAT_OWNER" ? "dimgray" : "white",
              }}
              className="user-choice-dot"
            />

            <Typography className="user-choice-text">
              I am a Boat Owner, offering my boat
            </Typography>
          </div>
          <div
            onClick={() => {
              handleUser("CUSTOMER");
            }}
            className="user-choice-option"
          >
            <div
              style={{
                backgroundColor: userType === "CUSTOMER" ? "dimgray" : "white",
              }}
              className="user-choice-dot"
            />

            <Typography className="user-choice-text">
              I am a Customer, looking for a new experience
            </Typography>
          </div>
        </div>

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
      </div>
    </Container>
  );
};
