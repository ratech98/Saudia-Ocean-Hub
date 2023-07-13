import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { UserType } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const UserChoice = () => {
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
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        style={{
          paddingTop: "79px",
          fontSize: "40px",
          fontFamily: "inherit",
          fontWeight: "bold",
          color: "rgba(66, 70, 81, 0.87)",
          textAlign: "center",
        }}
      >
        Join Us In Saudia Ocean Hub
      </Typography>
      <div
        style={{
          marginTop: "77px",
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
          flex: 0.1,
          flexDirection: "row",
        }}
      >
        <div
          onClick={() => {
            handleUser("BOAT_OWNER");
          }}
          style={{
            padding: "10px",
            border: "solid 0.1px rgba(66, 70, 81, 0.4)",
            flex: 0.4,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: userType === "BOAT_OWNER" ? "dimgray" : "white",
              borderRadius: 30,
              border: "solid 1px #707070",
              alignSelf: "flex-end",
            }}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",
              padding: "20px",
            }}
          >
            <Typography
              style={{
                fontSize: 24,
                fontWeight: "500",
                color: "rgba(66, 70, 81, 0.87)",
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              I'm a boat owner, offering my boat
            </Typography>
          </div>
        </div>

        <div
          onClick={() => {
            handleUser("CUSTOMER");
          }}
          style={{
            padding: "10px",
            border: "solid 0.1px rgba(66, 70, 81, 0.4)",
            flex: 0.4,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: userType === "CUSTOMER" ? "dimgray" : "white",
              borderRadius: 30,
              border: "solid 1px #707070",
              alignSelf: "flex-end",
            }}
          />
          <div
            style={{
              alignItems: "center",
              display: "flex",

              padding: "20px",
            }}
          >
            <Typography
              style={{
                fontSize: 24,
                fontWeight: "500",
                color: "rgba(66, 70, 81, 0.87)",
                lineHeight: 1.25,
                textAlign: "center",
              }}
            >
              I'm a customer, looking for a new experience
            </Typography>
          </div>
        </div>
      </div>

      <Typography
        onClick={() => {
          dispatch(UserType(userType));
          navigate("/SignUp");
        }}
        style={{
          backgroundColor: "#026b93",
          marginTop: "50px",
          color: "white",
          padding: "10px",
          width: "50%",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Create Account
      </Typography>
    </div>
  );
};
