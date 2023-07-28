import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ presentPage }) => {
  const opacity = 1;
  const auth = useSelector((state) => state?.auth);
  const location = useLocation();

  return (
    <div>
      <Navbar
        opacity={opacity}
        showLoginSignUp={
          location.pathname === "/" ? true : auth?.AuthToken ? false : true
        }
        presentPage={presentPage}
      />
    </div>
  );
};

export default Header;
