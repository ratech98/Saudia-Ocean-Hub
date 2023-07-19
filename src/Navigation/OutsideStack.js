import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { OutSideRoutes } from "./routes";
import Home from "../Screens/Dash/Home";

export const OutsideStack = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {OutSideRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
