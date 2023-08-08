import React from "react";
// import { GoogleLogout, useGoogleLogout } from "@react-oauth/google";
import { Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google";

const googleClientId =
  "496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com";

const GoogleLogoutButton = () => {
  // const { logout } = useGoogleLogout({
  //   clientId: googleClientId,
  // });

  const handleGoogleSignOut = () => {
    googleLogout();
    // logout();
    // Perform additional logout actions if needed
  };

  return (
    <Button
      style={{
        width: "100%",
        backgroundColor: "red",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
        textTransform: "none",
      }}
      onClick={handleGoogleSignOut}
    >
      Sign out
    </Button>
  );
};

export default GoogleLogoutButton;
