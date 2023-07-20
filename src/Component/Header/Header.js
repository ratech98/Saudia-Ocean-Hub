import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({
  link1,
  link2,
  link3,
  showItem,
  href1,
  href2,
  href3,
  showLogin,
  showProfile,
  num,
  num1,
  backgroundColor,
}) => {
  const opacity = 1;
  const auth = useSelector((state) => state?.auth);
  const location = useLocation();
  return (
    <div>
      <Navbar
        opacity={opacity}
        link1={link1}
        link2={link2}
        link3={link3}
        showItem={showItem}
        href1={href1}
        href2={href2}
        href3={href3}
        showLogin={showLogin}
        showProfile={showProfile}
        num={num}
        num1={num1}
        backgroundColor={backgroundColor}
        showLoginSignUp={
          location.pathname === "/" ? true : auth?.AuthToken ? false : true
        }
      />
    </div>
  );
};

export default Header;
