/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { verifyOTP } from "../../redux/slices";
import { PageHeader } from "../Dash/page-header/PageHeader";
import Footer from "../../Component/Footer/Footer";
import "./Home.css";
//
import Journey from "../../Component/Journey/Journey";
import Owner_boat from "../../Component/Owner_boat/Owner_boat";
import Ocian_hub from "../../Component/Ocian_Hub/Ocian_hub";
import Client_review from "../../Component/Testimonial/Client_review";
import Cretified from "../../Component/Certificate/Cretified";

// import { useHistory } from "react-router-dom";

//Imges
import Banner_button from "../../assets/Images/Banner_button.png";
import Backgroundimg from "../../assets/Images/bg_img.png";
import choose_jour_boat from "../../assets/Images/boat_carousal_1.png";
import Question_Mark from "../../assets/Images/question_mark.png";
import BoatOwner from "../../assets/Images/owner_boat.png";
import Clock from "../../assets/Images/clock.svg";
import Grow from "../../assets/Images/grow.svg";
import Web from "../../assets/Images/web.svg";
import Handshake from "../../assets/Images/handshake.svg";
import Start from "../../assets/Images/start.svg";

import Ellipse from "../../assets/Images/Ellipse.svg";
import Cretificate from "../../assets/Images/certified.svg";
import { Container } from "react-bootstrap";

import IMAGES from "../Images";

const Home = () => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const scrollableRowRef = useRef(null);
  const [fullyVisibleCardIds, setFullyVisibleCardIds] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  const handleIntersection = (entries) => {
    const visibleCardIds = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => parseInt(entry.target.dataset.id));
    setFullyVisibleCardIds(visibleCardIds);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (scrollableRowRef.current) {
      const cards = scrollableRowRef.current.querySelectorAll(".review_card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => {
      observer.disconnect();
    };
  }, [Testimonial]);

  const link1 = "For Boat Owners";
  const link2 = "For Boat Rentel";
  const backgroundImage = Backgroundimg;
  const location = useLocation();
  const content =
    "Find all boat trips and certified Scuba professionals within Saudi Arabia in one place";
  const title = "Welcome to the only ocean hub in Saudi Arabia";

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

  const handle_navigation = (selected_page) => {
    toast.dismiss();
    console.log("handle_navigation pageName", selected_page);
    dispatch(verifyOTP(null));
    if (selected_page === "Home") {
      // if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
      //   navigate("/boatOwnerDashBoard");
      // } else {
      //   navigate("/rental");
      // }
    } else if (selected_page === "rental") {
      navigate("/rental");
    } else if (selected_page === "SignUp") {
      navigate("/userChoice");
    } else if (selected_page === "Login") {
      navigate("/login");
    } else if (selected_page === link1) {
      handleLink1Click();
    } else if (selected_page === link2) {
      handleLink1Click2();
    } else {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the screen width threshold as needed
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function adjustBannerHeight() {
      const backgroundImageElement = new Image();
      backgroundImageElement.src = backgroundImage;

      backgroundImageElement.onload = function () {
        const height = backgroundImageElement.height;
        setImageHeight(height);
      };
    }

    // Call the function initially
    adjustBannerHeight();

    // Attach the resize listener
    window.addEventListener("resize", adjustBannerHeight);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", adjustBannerHeight);
    };
  }, [backgroundImage]);

  const handleLink1Click = () => {
    window.scrollTo({ top: 1555, behavior: "smooth" });
  };
  const handleLink1Click2 = () => {
    window.scrollTo({ top: 750, behavior: "smooth" });
  };

  console.log(
    // '  height: window.innerWidth > 1000 ? window.innerHeight : "auto",',
    // window.innerWidth > 1000 ? window.innerHeight : "auto",
    " window.innerWidth",
    window.innerWidth
  );

  return (
    <>
      <div className="home-full-box">
        {/* outSide header */}
        <div className="show-header-outSide-banner">
          <PageHeader
            showLoginSignUp={true}
            handle_navigation={handle_navigation}
            presentPage={"Home"}
            link1={link1}
            link2={link2}
          />
        </div>

        {/* ================================================== banner ================================================== */}

        {/* header & content */}
        <div
          className="banner"
          style={{
            height: window.innerWidth > 1000 ? window.innerHeight : "auto",
            // height: "auto",
            // height: "100%",
          }}
        >
          {/* inside header */}
          <div className="show-header-inside-banner">
            <PageHeader
              showLoginSignUp={true}
              handle_navigation={handle_navigation}
              presentPage={"Home"}
              link1={link1}
              link2={link2}
            />
          </div>

          {/* banner txt content */}
          <div className="inner-banner-box">
            <Container className="banner-txt-content">
              <div className="banner-txt-box">
                <Typography
                  // className="welcome-txt"
                  className={class_name?.Welcome_txt}
                >
                  {title}
                </Typography>

                <Typography
                  // className="sub-titile"
                  className={class_name?.sub_titile}
                >
                  {content}
                </Typography>
                {/* <Button className="get-start-btn">Get Started</Button> */}
                <div className={class_name?.get_start_btn}>
                  <Typography
                    className={`${class_name.get_start_txt} hoverEffect`}
                  >
                    Get Started
                  </Typography>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* ================================================== choose journey ================================================== */}

        <div style={{}} className={class_name.Choose_Your_Journey}>
          <Container
            // className="choose-journey"
            style={{}}
            className={class_name.Choose_Your_Journey_container}
          >
            <Typography
              // className="title"
              className={class_name.choose_journey_txt}
            >
              Choose Your Journey To Go With Saudia Ocean Hub
            </Typography>

            <div
              // className="show-img-box"
              style={{}}
              className={class_name.show_img_box}
            >
              <div style={{ width: "48%" }}>
                <img
                  src={choose_jour_boat}
                  onClick={() => {
                    handle_navigation("rental");
                  }}
                  className="boat_img"
                  alt="boat_carousal_img"
                />
              </div>
              <div
                style={{
                  width: "48%",
                }}
              >
                <img
                  src={Question_Mark}
                  className="boat_img"
                  alt="boat_carousal_img"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* ================================================== Owner_boat ================================================== */}
        <>
          <Container
            fluid
            style={{
              margin: "0px",
              padding: "0px",
              backgroundColor: "rebeccapurple",
            }}
          >
            <div className="boat-owner-box">
              <Container className="boat-owners-point-list">
                <Typography
                  // className="for-boat-owner-txt"
                  className={class_name.for_boat_owner_txt}
                >
                  For Boat Owners
                </Typography>
                <Typography
                  // className="sub-title-txt"
                  className={class_name.boat_owner_sub_title_txt}
                >
                  It's time for your boat to start paying you back!
                </Typography>

                <div className="owner-desc">
                  <div className="point-list">
                    <img
                      src={Clock}
                      alt="clock"
                      className="point-list-img"
                      // className={class_name.picture_style}
                    />
                    <Typography
                      // className="point-txt"
                      className={class_name.point_txt}
                    >
                      Save time, earn more by listing your boat on Saudia Ocean
                      hub
                    </Typography>
                  </div>
                  <div className="point-list">
                    <img
                      src={Grow}
                      alt="clock"
                      className="point-list-img"
                      // className={class_name.picture_style}
                    />
                    <Typography
                      // className="point-txt"
                      className={class_name.point_txt}
                    >
                      Boost up your business and increase your visitors and
                      profits
                    </Typography>
                  </div>
                  <div className="point-list">
                    <img
                      src={IMAGES?.WEB_WORLD}
                      alt="clock"
                      className="point-list-img"
                      // className={class_name.boat_Owner_list_icons}
                      // style={{
                      //   backgroundColor: "red",
                      //   width: "clamp(9px, 10vw, 32px)", // Adjust the range as needed
                      //   height: "clamp(15px, 10vw, 56px)",
                      // }}
                    />
                    <Typography
                      // className="point-txt"
                      className={class_name.point_txt}
                    >
                      Let a wide range of customers know about your boat, and
                      have the freedom to update its information at any time
                      with ease
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {/* <Button
                    className="boat-owner-btn"
                    onClick={() => {
                      navigate("/boatOwnerDashBoard");
                    }}
                  >
                    List Your Boat Now{" "}
                  </Button> */}
                  <div
                    className={class_name?.list_boat_btn}
                    onClick={() => {
                      navigate("/boatOwnerDashBoard");
                    }}
                  >
                    <Typography
                      className={`${class_name.list_boat_txt} hoverEffect`}
                    >
                      List Your Boat Now{" "}
                    </Typography>
                  </div>
                </div>
              </Container>

              <div
                className="boat-img-show"
                // style={{ backgroundColor: "teal" }}
              >
                <img
                  src={BoatOwner}
                  alt="boat_owner"
                  className="img-fluid"
                  // style={{ backgroundSize: "cover" }}
                />
              </div>
            </div>
          </Container>
        </>

        {/* ================================================== Ocian hub ================================================== */}
        <div>
          <Container
            fluid
            // className="ocean-hub"
            className={class_name.ocean_hub}
          >
            <Typography
              // className="ocean-hub-title"
              className={class_name.ocean_hub_title}
            >
              Why Saudia Ocean Hub?
            </Typography>

            <div className="ocean-hub-content-box">
              <div className="ocen-hub-each-point">
                <div className="white-circle-background">
                  <img
                    src={Handshake}
                    alt="handshake"
                    className="ocen-hub-list-icon"
                  />
                </div>
                <div className="ocen-hub-txt-box">
                  <Typography
                    // className="ocean-hub-point-title"
                    className={class_name.ocean_hub_point_title}
                  >
                    Flexibility
                  </Typography>
                  <Typography
                    // className="ocean-hub-point-info"
                    className={class_name.ocean_hub_point_info}
                  >
                    At Saudia Ocean Hub, we believe in giving our customers the
                    flexibility to plan their bookings according to their own
                    schedule.
                  </Typography>
                </div>
              </div>
              <div className="ocen-hub-each-point">
                <div className="white-circle-background">
                  <img
                    src={Start}
                    alt="handshake"
                    className="ocen-hub-list-icon"
                  />
                </div>
                <div className="ocen-hub-txt-box">
                  <Typography
                    // className="ocean-hub-point-title"
                    className={class_name.ocean_hub_point_title}
                  >
                    100% Trust Worthy
                  </Typography>
                  <Typography
                    // className="ocean-hub-point-info"
                    className={class_name.ocean_hub_point_info}
                  >
                    At Saudia Ocean Hub, we take pride in offering a safe and
                    secure platform for all of our users. We ensure that all of
                    our boats are fully licensed and certified.
                  </Typography>
                </div>
              </div>
              <div className="ocen-hub-each-point">
                <div className="white-circle-background">
                  <img
                    src={Handshake}
                    alt="handshake"
                    className="ocen-hub-list-icon"
                  />
                </div>
                <div className="ocen-hub-txt-box">
                  <Typography
                    // className="ocean-hub-point-title"
                    className={class_name.ocean_hub_point_title}
                  >
                    Professional Connection
                  </Typography>
                  <Typography
                    // className="ocean-hub-point-info"

                    className={class_name.ocean_hub_point_info}
                  >
                    At Saudia Ocean Hub, we care about providing a unique
                    opportunity for all of our customers to connect together and
                    expand their network.
                  </Typography>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* ================================================== Client review ================================================== */}
        <>
          <Container fluid className="client-review-container">
            <div className="client-review-title">
              <Typography className="client-review-title-txt">
                What Our Customers Are Saying
              </Typography>
            </div>

            <div className="scrollable-row" ref={scrollableRowRef}>
              {Testimonial.map((item) => (
                <div
                  key={item.id}
                  className="flex-nowrap"
                  // style={{ backgroundColor: "lime" }}
                >
                  <div
                    className={"review_card"}
                    style={{
                      marginTop: fullyVisibleCardIds.includes(item.id)
                        ? isSmallScreen
                          ? "40px"
                          : "80px"
                        : "0",
                    }}
                    data-id={item.id}
                  >
                    <div
                      // className="review_image"
                      style={{
                        position: "absolute",
                      }}
                    >
                      <img
                        src={IMAGES?.PROFILE_ICON}
                        alt="client_img"
                        className="client-img"
                        style={{ backgroundColor: "white" }}
                      />
                    </div>
                    <Typography className="client-card-name-txt">
                      {item.name}
                    </Typography>
                    <Typography className="client-card-city-txt">
                      {item.place}
                    </Typography>
                    <Typography
                      style={{ textAlign: "left" }}
                      className="client-card-review-txt"
                    >
                      {item.review}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </>
        {/* ================================================== certified ================================================== */}
        <>
          <div
            style={{
              backgroundColor: "#f6f6f6",
              padding: "50px 0px",
            }}
          >
            <Container
              // fluid
              className="certified-box"
            >
              <div className="certified-content" style={{ padding: "0 20px" }}>
                <div style={{ width: "70%" }}>
                  <Typography
                    // className="certified-title"
                    className={class_name.certified_title}
                    style={{ fontWeight: "-moz-initial" }}
                  >
                    {"Trusted by "}
                    <span style={{ fontWeight: "bolder" }}> {"PADI®"}</span>
                  </Typography>
                  <Typography
                    // className="certified-info"
                    className={class_name.certified_info}
                  >
                    Saudia Ocean Hub is officially certified as an official hub
                    for scuba by PADI Professional Association of Diving
                    Instructors
                  </Typography>
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Cretificate}
                    alt="Cretificate"
                    // className="certified_img"
                    className={class_name.certified_img}
                  />
                </div>
              </div>
            </Container>
          </div>
        </>

        <div className="footer-style-hide">
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Home;

const useStyles = makeStyles((theme) => ({
  Welcome_txt: {
    // margin: "0 0 24px",
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 4vw, 48px)", // Adjust the range as needed
    fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },

  sub_titile: {
    // margin: "24px 0 80px",
    [theme.breakpoints.up("sm")]: {
      margin: "8px 0 24px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "16px 0 50px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "24px 0 80px",
    },
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.67,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },

  get_start_btn: {
    borderRadius: "30px",
    border: "solid 1px #026b93",
    padding: "3% 15%",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    transition: "background-color 0.3s", // Add a smooth transition for the background color
    "&:hover": {
      backgroundColor: "#026b93", // Change the background color on hover
      "& $get_start_txt": {
        color: "white", // Change text color on hover
      },
    },
  },
  get_start_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#026b93",
  },

  for_boat_owner_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 3vw, 30px)", // Adjust the range as needed
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "normal",
    textAlign: "start",
    color: "#f6f6f6",
  },
  boat_owner_sub_title_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(10px, 3vw, 45px)", // Adjust the range as needed
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#f6f6f6",
    [theme.breakpoints.up("sm")]: {
      marginTop: "10px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "25px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "50px",
    },
  },
  point_txt: {
    margin: "0 0 0 10px",
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 20px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(246, 246, 246, 0.87)",
    [theme.breakpoints.up("sm")]: {
      margin: "0 0 0 10px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0 0 0 30px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "0 0 0 55px",
    },
    boat_Owner_list_icons: {
      width: "clamp(9px, 1vw, 32px)", // Adjust the range as needed
      height: "clamp(15px, 1vw, 56px)", // Adjust the range as needed
      // border: "solid 0.5px rgba(112, 112, 112, 0.3)",
      // borderRadius: "150px",
      backgroundColor: "red",
    },
  },

  list_boat_btn: {
    marginTop: "10px",
    display: "flex",
    borderRadius: "30px",
    border: "solid 1px white",
    transition: "background-color 0.3s", // Add a smooth transition for the background color
    "&:hover": {
      backgroundColor: "white", // Change the background color on hover
      "& $list_boat_txt": {
        color: "#03487a", // Change text color on hover
      },
    },
    padding: "3% 5%",
    [theme.breakpoints.up("sm")]: {
      padding: "3% 5%",
    },
    [theme.breakpoints.up("md")]: {
      padding: "3% 10%",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "3% 15%",
    },
  },
  list_boat_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    // fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "center",
    color: "white",
  },

  Choose_Your_Journey: {
    backgroundColor: "#f6f6f6",
    transition: "background-color 0.3s",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    height: "auto",
    padding: "20px", // Default padding value
    [theme.breakpoints.up("sm")]: {
      padding: "30px", // Padding for small screens and up
    },
    [theme.breakpoints.up("md")]: {
      padding: "100px", // Padding for medium screens and up
    },
    [theme.breakpoints.up("lg")]: {
      padding: "150px 0px", // Padding for large screens and up
    },
  },

  Choose_Your_Journey_container: {
    padding: "0px",
    margin: "0px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  choose_journey_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 4vw, 48px)", // Adjust the range as needed
    fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
    maxWidth: "55%",
  },

  show_img_box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10% 0%",
    // backgroundColor: "yellowgreen",
  },
  ocean_hub: {
    backgroundColor: "#f6f6f6",
    padding: "32px", // Default padding value
    [theme.breakpoints.up("sm")]: {
      padding: "32px", // Padding for small screens and up
    },
    [theme.breakpoints.up("md")]: {
      padding: "100px", // Padding for medium screens and up
    },
    [theme.breakpoints.up("lg")]: {
      padding: "150px 0px", // Padding for large screens and up
    },

    // backgroundColor: "red",
  },

  ocean_hub_title: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 48px)",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
  },

  ocean_hub_point_title: {
    fontFamily: "Poppins",
    fontSize: "clamp(12px, 5vw, 30px)",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
    paddingBottom: "20px",
  },
  ocean_hub_point_info: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 5vw, 20px)",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.6)",
    paddingBottom: "20px",
  },
  certified_title: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 48px)",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    // lineHeight: 0.48,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
    paddingBottom: "40px",
  },
  certified_info: {
    fontFamily: "Poppins",
    fontSize: "clamp(10px, 2.5vw, 22px)",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    // lineHeight: 0.48,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.6)",
  },

  certified_img: {
    width: "clamp(50px, 20vw, 357.1px)", // Adjust the range as needed
    height: "clamp(20px, 15vh, 139px)", // Adjust the range as needed
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  "@media (max-width: 767px)": {
    ocean_hub_point_title: {
      fontFamily: "Poppins",
      fontSize: "clamp(12px, 3vw, 30px)",
      fontWeight: "600",
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: "normal",
      textAlign: "left",
      color: "rgba(66, 70, 81, 0.87)",
      paddingBottom: "5px",
      // backgroundColor: "green",
    },
    ocean_hub_point_info: {
      fontFamily: "Poppins",
      fontSize: "clamp(8px, 2vw, 20px)",
      fontWeight: "500",
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: 0.5,
      textAlign: "left",
      color: "rgba(66, 70, 81, 0.6)",
      paddingBottom: "20px",
      // backgroundColor: "red",
    },
    certified_title: {
      paddingBottom: "20px",
    },
    certified_img: {
      width: "clamp(130px, 20vw, 357.1px)", // Adjust the range as needed
      height: "clamp(10px, 15vh, 139px)", // Adjust the range as needed
    },
  },
}));
const Testimonial = [
  {
    id: 1,
    name: "Abdallah Hazmi",
    place: "Riyadh",
    review: "Best Experiences Ever. Good Idea!",
    image: Ellipse,
  },
  {
    id: 2,
    name: "Baker Arkan",
    place: "Jeddah",
    review: "This is very useful! we had a wonderful time.",
    image: Ellipse,
  },
  {
    id: 3,
    name: "Mohammed Wadi",
    place: "Abha",
    review: "good effort!",
    image: Ellipse,
  },
  {
    id: 4,
    name: "Salem Salem",
    place: "Mecca",
    review: "The most trusted scuba classes! Thank you.",
    image: Ellipse,
  },
  {
    id: 5,
    name: "Salem Salem",
    place: "Mecca",
    review: "The most trusted scuba classes! Thank you.",
    image: Ellipse,
  },
  {
    id: 6,
    name: "Salem Salem",
    place: "Mecca",
    review: "The most trusted scuba classes! Thank you.",
    image: Ellipse,
  },
];
