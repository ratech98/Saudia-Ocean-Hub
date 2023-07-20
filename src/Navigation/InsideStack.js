import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InSideRoutes } from "./routes";

export const InsideStack = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<DashBoard />} /> */}
          {InSideRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
