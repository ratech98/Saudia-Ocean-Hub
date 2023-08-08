/* eslint-disable react/prop-types */
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import IMAGES from "../../Images";
import "./GoogleSignInButton.css";

const googleClientId =
  "496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com";

const GoogleSignInButton = ({
  googleResponce,
  handle,
  title = "Sign up with Google",
  isTermsOfServiceChecked,
}) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log("userInfo", userInfo);
      handle(userInfo, "GOOGLE");
    },
  });

  return (
    <div style={{ width: "100%" }} className="google-box">
      <Button
        className="google-login-btn"
        onClick={() => {
          if (isTermsOfServiceChecked) {
            login();
          } else {
            handle();
          }
        }}
      >
        <img alt="google" src={IMAGES.GOOGLE} className="google-img" />
        <Typography className="btn-name">{title}</Typography>
      </Button>
    </div>
  );
};

export default GoogleSignInButton;

//   const { access_token, refresh_token } = tokenResponse.access_token; // now I have valid access_token
//   let userInfo = await axios.get(
//     "https://www.googleapis.com/oauth2/v3/userinfo",
//     {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );
//   console.log("userInfo", userInfo);

// const response = await fetch(
//   // "https://www.googleapis.com/oauth2/v3/userinfo",
//   // "https://www.googleapis.com/oauth2/v2/userinfo",
//   "https://www.googleapis.com/oauth2/v3/userinfo?access_token=",
//   {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${tokenResponse.access_token}`,
//       "Content-Type": "application/json",
//     },
//   }
// );
// console.log("response", response);
