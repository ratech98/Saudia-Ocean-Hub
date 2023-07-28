/* eslint-disable react/jsx-pascal-case */
import React, { useEffect } from "react";
import Backgroundimg from "../../assets/Images/bg_img.png";
import Banner_button from "../../assets/Images/Banner_button.png";
//
import Journey from "../../Component/Journey/Journey";
import Owner_boat from "../../Component/Owner_boat/Owner_boat";
import Ocian_hub from "../../Component/Ocian_Hub/Ocian_hub";
import Client_review from "../../Component/Testimonial/Client_review";
import Cretified from "../../Component/Certificate/Cretified";
import Footer from "../../Component/Footer/Footer";
import Banner from "../../Component/Banner/Banner";
import { useLocation, useNavigate } from "react-router-dom";
import { BoatDetailCard } from "../new/BoatDetailCard";
// import { useHistory } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const backgroundImage = Backgroundimg;
  const location = useLocation();
  const content =
    "Find all boat trips and certified Scuba professionals within Saudi Arabia in one place";
  const title = "Welcome to the only ocean hub in Saudi Arabia";
  const button = Banner_button;
  const titleStyle = {
    marginTop: 100,
    width: 674,
    fontFamily: "Poppins",
    fontSize: 48,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  };
  const descStyle = {
    width: 536,
    height: 71,
    fontFamily: "Poppins",
    fontSize: 22,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.82,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
    marginTtop: 35,
  };
  const showButton = true;
  const showInput = false;
  const className = "d-flex justify-content-end";
  const buttonStyle = {
    marginRight: "11rem",
    marginTop: 70,
    width: 350,
    height: 81,
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      // Prevent the default behavior of the back button
      event.preventDefault();

      // Force the user back to the current route
      navigate(location.pathname);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location.pathname, navigate]);

  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          onClick={() => {
            navigate("/boatBookingRequest");
          }}
        >
          boat Booking Request
        </span>
        <span
          onClick={() => {
            navigate("/boatViewDetails");
          }}
        >
          boat View Details
        </span>
        <span
          onClick={() => {
            navigate("/boatDetailCard");
          }}
        >
          {"BoatDetail==>>>Card"}
        </span>
        <span
          onClick={() => {
            navigate("/boatCard");
          }}
        >
          {"boat Card"}
        </span>
        <span
          onClick={() => {
            navigate("/boatOfferStep3");
          }}
        >
          {"boat Offer Step 3"}
        </span>
      </div> */}

      <Banner
        backgroundImage={backgroundImage}
        content={content}
        title={title}
        button={button}
        titleStyle={titleStyle}
        descStyle={descStyle}
        showButton={showButton}
        className={className}
        showInput={showInput}
        buttonStyle={buttonStyle}
        presentPage={"Home"}
      />
      <Journey />
      <Owner_boat />
      <Ocian_hub />
      <Client_review />
      <Cretified />
      <Footer />
    </div>
  );
};
export default Home;
