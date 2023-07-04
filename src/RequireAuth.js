import React from "react";
import { Navigate } from "react-router-dom/dist";

export const RequireAuth = ({ children }) => {
  let auth = true;
  console.log("RequireAuth page");
  if (auth) {
    return <Navigate to="/logIn" />;
  }
  return children;
};
