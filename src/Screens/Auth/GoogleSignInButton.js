import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import axios from "axios";

const googleClientId =
  "496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com";

const GoogleSignInButton = ({ googleResponce }) => {
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
      googleResponce(userInfo);
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
          backgroundColor: "#026b93",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          textTransform: "none",
        }}
        onClick={() => login()}
      >
        Sign up with Google
      </Button>
      ;
    </div>
  );
};

export default GoogleSignInButton;

{
  /* <GoogleLogin
clientId={googleClientId}
// {...options}
onSuccess={handleGoogleSignIn}
onFailure={() => {
  console.log("Login Failed");
}}
render={({ onClick }) => (
  <Button
    style={{
      width: "100%",
      backgroundColor: "#026b93",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      textTransform: "none",
    }}
    onClick={onClick}
  >
    Sign in with Google
  </Button>
)}
/> */
}
