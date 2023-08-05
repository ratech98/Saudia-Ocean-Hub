import React from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({
  presentPage,
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
  clicktoScroll,
  homeBtn,
  homeBtnHref,
}) => {
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
        clicktoScroll={clicktoScroll}
        homeBtn={homeBtn}
        homeBtnHref={homeBtnHref}
      />
    </div>
  );
};

export default Header;
