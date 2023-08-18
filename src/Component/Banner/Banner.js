/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./Banner.css";
import Header from "../Header/Header";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FaSearch } from "react-icons/fa";
import { PageHeader } from "../../Screens/Dash/page-header/PageHeader";
import { Typography } from "@material-ui/core";

const Banner = ({
  showLoginSignUp,
  backgroundImage,
  content,
  title,
  showButton,
  button,
  buttonStyle,
  descStyle,
  className,
  backgroundColor,
  opacity,
  extraInputValue,
  handleExtraInputChange,
  showInput,
  inputStyle,

  presentPage,
  showHeader = true,
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
  clicktoScroll,
  homeBtn,
  homeBtnHref,
}) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log("windowHeight", windowHeight);

  return (
    // <div
    //   style={{
    //     // backgroundImage: `url(${backgroundImage})`,
    //     // backgroundSize: "cover",
    //     // backgroundColor: `${backgroundColor}`,
    //     // opacity: `${opacity}`,
    //     // opacity: 0.5,
    //     // height: windowHeight,

    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "red",
    //     margin: "0px",
    //     padding: "0px",
    //   }}
    // >
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        // backgroundColor: `${backgroundColor}`,
        // opacity: `${opacity}`,
        // opacity: 0.5,
        height: windowHeight,
        // width: windowWidth,
        //
      }}
    >
      <div
        style={{
          // width: "100%",
          // height: "100%",
          height: windowHeight,
          // backgroundColor: "rgba(255, 255, 255, 0.5)",
          // backgroundColor: "red",
          // display: "flex",
          // flexDirection: "column",
          // position: "relative",
          // zIndex: 1,
          // position: "absolute",
          // top: 0,
          // left: 0,
          width: "100%",
          // height: "100%",
          // backgroundImage: `url${"../../assets/Images/boat-background-img.jpeg"}`,
          // backgroundSize: "cover",
          // backgroundPosition: "center center",
          // backgroundRepeat: "no-repeat",
        }}
      >
        {showHeader ? (
          <>
            <PageHeader
              showLoginSignUp={showLoginSignUp}
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
            {/* <Header
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
          /> */}
          </>
        ) : null}
        {/* <div
          style={{
            // margin: "10px",
            // padding: "0px",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            // alignContent: "center",
            // alignSelf: "center",
            // // backgroundColor: "whitesmoke",
            width: "100%",
            height: "100%",
          }}
          // className="insideBackGround-img"
        > */}
        {/* <Container> */}
        <div
          // className={`pt-5 ${className}`}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <div style={{ width: "55%" }}>
            <Typography className="Welcome-to-the-only-ocean-hub-in-Saudi-Arabia">
              {title}
            </Typography>

            <Typography className="sub-titile">{content}</Typography>
            {showButton && (
              <Button className="get-start-btn">Get Started</Button>
            )}
          </div>
        </div>
        {/* </Container> */}
      </div>
    </div>
    // </div>
    // </div>
  );
};

export default Banner;

{
  /* {showInput && (
          <div
            className={`${className}`}
            // className="d-flex justify-content-end"
            // style={{ backgroundColor: "red" }}
          >
            <div style={{ position: "relative" }}>
              <input
                style={{
                  ...inputStyle,
                  paddingLeft: "30px", // Add left padding to accommodate the search icon
                }}
                type="text"
                placeholder="Search For a City"
                value={extraInputValue}
                onChange={handleExtraInputChange}
              />
              <div
                style={{
                  position: "absolute",
                  top: "63%",
                  right: "50px",
                  // transform: 'translateY(-50%)',
                }}
              >
                <FaSearch size={24} color="#424651" />
              </div>
            </div>
          </div>
        )} */
}
