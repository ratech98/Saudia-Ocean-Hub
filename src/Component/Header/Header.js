import React from "react";
import Navbar from "../Navbar/Navbar";
import { HeaderContent } from "../../Screens/Common/map/HeaderContent";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const opacity = 1;
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const location = useLocation();

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      // navigate("/");
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "Boat Offers") {
      //   navigate("/");
    } else if (name === "My Listings") {
      navigate("/myListings");
    } else if (name === "List a Boat Offer") {
      // navigate("/");
    } else {
      navigate(name);
    }
  };
  return (
    <div>
      <Navbar
        opacity={opacity}
        showLoginSignUp={
          location.pathname === "/" ? true : auth?.AuthToken ? false : true
        }
      />
      {/* <HeaderContent
        contentname1={"Home"}
        contentname2={"For Boat Owners"}
        contentname3={"For Boat Rentals"}
        contentname4={"My Listings"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={auth?.AuthToken ? false : true}
      /> */}
    </div>
  );
};

export default Header;
