import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/logIn" />;
};

export default PrivateRoutes;
