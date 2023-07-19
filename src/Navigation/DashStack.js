import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashBoardRoutes, InSideRoutes } from "./routes";
import { DashBoard } from "../Screens/Dash/BoatOwnerDashBoard";

export const DashStack = () => {
  console.log("DashStack");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/dashBoard" element={<DashBoard />} /> */}
          {DashBoardRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
