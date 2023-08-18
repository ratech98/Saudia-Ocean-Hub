/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import Backgroundimg from "../../assets/Images/bg_img.png";
// import Backgroundimg from "../../assets/Images/boat-background-img.jpeg";
import Banner_button from "../../assets/Images/Banner_button.png";
//
import Journey from "../../Component/Journey/Journey";
import Owner_boat from "../../Component/Owner_boat/Owner_boat";
import Ocian_hub from "../../Component/Ocian_Hub/Ocian_hub";
import Client_review from "../../Component/Testimonial/Client_review";
import Cretified from "../../Component/Certificate/Cretified";
import Footer from "../../Component/Footer/Footer";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyOTP } from "../../redux/slices";
import { PageHeader } from "../Dash/page-header/PageHeader";
import "./Home.css";
import { Button, Typography } from "@material-ui/core";
// import { useHistory } from "react-router-dom";

//Imges
import Boat from "../../assets/Images/boat_carousal_1.png";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const scrollableRowRef = useRef(null);
  const [fullyVisibleCardIds, setFullyVisibleCardIds] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
  // const link3 = "List a Boat Offer";
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
  const reviewCard_height = 299;
  const reviewCard_width = 425;
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
      navigate("/signUp");
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

  const [imageHeight, setImageHeight] = useState(0);

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
    "window.innerHeight",
    window.innerHeight,
    window.innerHeight < 768
  );
  return (
    <>
      <div className="home-full-box">
        {/* outSide header */}
        <div className="show-header-outSide-banner">
          {/* <PageHeader
            handle_navigation={handle_navigation}
            // showLoginSignUp={showLoginSignUp}
            presentPage={"Home"}
            link1={link1}
            link2={link2}
            // link3={link3}
            showItem={showItem}
            href1={href1}
            href2={href2}
            href3={href3}
            showLogin={showLogin}
            showProfile={showProfile}
            num={num}
            num1={num1}
            // backgroundColor={backgroundColor}
            // clicktoScroll={clicktoScroll}
            // homeBtn={homeBtn}
            // homeBtnHref={homeBtnHref}
          /> */}
          <PageHeader
            showLoginSignUp={!auth?.AuthToken}
            handle_navigation={handle_navigation}
            presentPage={"Home"}
            link1={link1}
            link2={link2}
            // link3={link3}
          />
        </div>

        {/* ================================================== banner ================================================== */}

        {/* header & content */}
        <div
          className="banner"
          style={{
            height: window.innerHeight > 768 ? window.innerHeight : "auto",
          }}
        >
          {/* inside header */}
          <div className="show-header-inside-banner">
            <PageHeader
              showLoginSignUp={!auth?.AuthToken}
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
                <Typography className="welcome-txt">{title}</Typography>

                <Typography className="sub-titile">{content}</Typography>

                <Button className="get-start-btn">Get Started</Button>
              </div>
            </Container>
          </div>
        </div>

        {/* ================================================== choose journey ================================================== */}

        <div
          style={{
            backgroundColor: "#f6f6f6",
            // backgroundColor: "yellowgreen",
          }}
        >
          <Container className="choose-journey">
            <Typography className="title">
              Choose Your Journey To Go With Saudia Ocean Hub
            </Typography>

            <div className="show-img-box">
              <div style={{ width: "48%" }}>
                <img
                  src={Boat}
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
                <Typography className="for-boat-owner-txt">
                  For Boat Owners
                </Typography>
                <Typography className="sub-title-txt">
                  It's time for your boat to start paying you back!
                </Typography>

                <div className="owner-desc">
                  <div className="point-list">
                    <img src={Clock} alt="clock" className="point-list-img" />
                    <Typography className="point-txt">
                      Save time, earn more by listing your boat on Saudia Ocean
                      hub
                    </Typography>
                  </div>
                  <div className="point-list">
                    <img src={Grow} alt="clock" className="point-list-img" />
                    <Typography className="point-txt">
                      Boost up your business and increase your visitors and
                      profits
                    </Typography>
                  </div>
                  <div className="point-list">
                    <img src={Web} alt="clock" className="point-list-img" />
                    <Typography className="point-txt">
                      Let a wide range of customers know about your boat, and
                      have the freedom to update its information at any time
                      with ease
                    </Typography>
                  </div>
                </div>
                <div>
                  <Button
                    className="boat-owner-btn"
                    onClick={() => {
                      navigate("/boatOwnerDashBoard");
                    }}
                  >
                    List Your Boat Now{" "}
                  </Button>
                </div>
              </Container>

              <div className="boat-img-show">
                <img src={BoatOwner} alt="boat_owner" className="img-fluid" />
              </div>
            </div>
          </Container>
        </>

        {/* ================================================== Ocian hub ================================================== */}
        <div>
          <Container
            fluid
            style={
              {
                // backgroundColor: "red",
                // padding: 0
              }
            }
            className="ocean-hub"
          >
            <Typography className="ocean-hub-title">
              Why Saudia Ocean Hub?
            </Typography>

            <div
              className="ocean-hub-content-box"
              // style={{ backgroundColor: "green" }}
            >
              <div className="ocen-hub-each-point">
                <div className="white-circle-background">
                  <img
                    src={Handshake}
                    alt="handshake"
                    className="ocen-hub-list-icon"
                  />
                </div>
                <div className="ocen-hub-txt-box">
                  <Typography className="ocean-hub-point-title">
                    Flexibility
                  </Typography>
                  <Typography className="ocean-hub-point-info">
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
                  <Typography className="ocean-hub-point-title">
                    100% Trust Worthy
                  </Typography>
                  <Typography className="ocean-hub-point-info">
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
                  <Typography className="ocean-hub-point-title">
                    Professional Connection
                  </Typography>
                  <Typography className="ocean-hub-point-info">
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
                <div>
                  <Typography className="certified-title">
                    Trusted by PADI®
                  </Typography>
                  <Typography className="certified-info">
                    Saudia Ocean Hub is officially certified as an official hub
                    for scuba by PADI Professional Association of Diving
                    Instructors
                  </Typography>
                </div>
                <div>
                  <img
                    src={Cretificate}
                    alt="Cretificate"
                    className="certified_img"
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
