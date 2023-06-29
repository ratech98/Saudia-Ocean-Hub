import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import IMAGES from "../Images";

const googleClientId =
  "496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com";

const GoogleSignInButton = ({
  googleResponce,
  handle,
  title = "Sign up with Google",
  IsEmailChecked,
  setIsEmailChecked,
  handleIsEmailChecked,
}) => {
  console.log("IsEmailChecked", IsEmailChecked);
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
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

      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log("userInfo", userInfo);
      handle(userInfo, "GOOGLE");
    },
  });

  const handleGoogleSignIn = (googleUser) => {
    console.log("googleUser", googleUser);
  };

  return (
    <div style={{ width: "100%" }}>
      <Button
        style={{
          width: "100%",
          textTransform: "none",
          border: "1.5px solid #026b93",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
          padding: "10px",
        }}
        onClick={() => {
          if (IsEmailChecked) {
            console.log("enter if");
            login();
          } else {
            console.log("enter else");
            handleIsEmailChecked();
          }
        }}
      >
        <img
          alt="google"
          src={IMAGES.GOOGLE}
          style={{
            width: "20px",
            height: "20px",
            fill: "#3973a5",
            color: "#3973a5",
            marginRight: "15px",
          }}
        />
        <Typography
          style={{
            color: "#026b93",
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
