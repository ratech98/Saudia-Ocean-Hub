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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyOTP } from "../../redux/slices";

// import { useHistory } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const link1 = "For Boat Owners";
  const link2 = "For Boat Rentel";
  const link3 = "List a Boat Offer";
  const href1 = "#";
  const href2 = "#";
  const href3 = "#";
  const num = "7";
  const num1 = "2";
  const showItem = false;
  const showLogin = true;
  const showProfile = false;
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

  const backgroundColors = "#70a8c0";
  const clientPadding = "150px 0 200.1px";
  const Client_Title_Show = true;
  const screenTop = 220;
  const reviewCard_color = " rgba(246, 246, 246, 0.7)";
  const reviewCard_height = 262;
  const reviewCard_width = 320;
  const reviewCard_center = "left";
  const bgimage =
    "linear-gradient(to bottom, #70a8c0, #3c85a7 29%, #03487a 74%, #03487a)";

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

  const handle_navigation = (pageName) => {
    console.log("pageName", pageName);
    dispatch(verifyOTP(null));
    if (pageName === "Home") {
      if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
        navigate("/boatOwnerDashBoard");
      } else {
        navigate("/rental");
      }
    } else if (pageName === "rental") {
      navigate("/rental");
    } else if (pageName === "boatOwnerDashBoard") {
      navigate("/boatOwnerDashBoard");
    } else {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
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
        homeBtn={"Home"}
        link1={link1}
        link2={link2}
        showItem={showItem}
        href1={href1}
        href2={href2}
        showLogin={showLogin}
        showProfile={showProfile}
        num={num}
        num1={num1}
        clicktoScroll={true}
      />
      {/* <Journey handleClick={handle_navigation} /> */}
      <Owner_boat handleClick={handle_navigation} />
      <Ocian_hub />
      <Client_review
        backgroundColors={backgroundColors}
        clientPadding={clientPadding}
        Client_Title_Show={Client_Title_Show}
        scrollingTop={screenTop}
        reviewCard_color={reviewCard_color}
        reviewCard_height={reviewCard_height}
        reviewCard_width={reviewCard_width}
        reviewCard_center={reviewCard_center}
        bgimage={bgimage}
      />
      <Cretified />
      <Footer />
    </div>
  );
};
export default Home;
