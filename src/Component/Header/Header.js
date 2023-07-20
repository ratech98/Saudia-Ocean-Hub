import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
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
      />
    </div>
  );
};

export default Header;
