import React, { useState } from "react";
import "./BookingHistory.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { HeaderContent } from "../../Common/map/HeaderContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../Component/Footer/Footer";
import { Typography } from "@mui/material";

export const BookingHistory = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [bookingStatus, setBookingStatus] = useState("Current");

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      if (auth?.AuthToken) {
        if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
          navigate("/boatOwnerDashBoard");
        } else {
          navigate("/rental");
        }
      } else {
        navigate("/");
      }
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "My Listings") {
      navigate("/myListings");
    } else if (name === "For Boat Rentals" || name === "For Boat Owners") {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (name === "/searchBoat") {
      navigate("/searchBoat");
    }
  };

  return (
    <>
      <div className="full-container">
        <HeaderContent
          contentname1={"Home"}
          contentname2={"For Boat Owners"}
          contentname3={"For Boat Rentals"}
          contentname4={"Booking History"}
          handleBack={handleHeaderCallBack}
          search={"/searchBoat"}
          showLoginSignUp={auth?.AuthToken ? false : true}
          presentPage={"Booking History"}
        />
        <div
          className="container"
          // main-container
          style={{ width: "100%", height: "100%", marginTop: "3%" }}
        >
          <Typography className="page-title">Booking History</Typography>
          <Typography className="info-text">
            you can easily view and manage all of your past and current boat
            bookings.
          </Typography>

          <div className="select-tab">
            <div
              className="inside-select-tab"
              onClick={() => {
                setBookingStatus("Current");
              }}
              style={{
                backgroundColor:
                  bookingStatus === "Current" ? "#3973a5" : "white",
              }}
            >
              <Typography
                className="tab-text"
                style={{
                  color: bookingStatus === "Current" ? "white" : "#424651",
                }}
              >
                Current Booking
              </Typography>
            </div>
            <div
              className="inside-select-tab"
              onClick={() => {
                setBookingStatus("Previous");
              }}
              style={{
                backgroundColor:
                  bookingStatus === "Previous" ? "#3973a5" : "white",
              }}
            >
              <Typography
                className="tab-text"
                style={{
                  color: bookingStatus === "Previous" ? "white" : "#424651",
                }}
              >
                Previous Booking
              </Typography>
            </div>
          </div>
          {bookingStatus === "Current" ? (
            <div className="booking-row">
              <Typography className="booking-date">15 Jun</Typography>
              <div className="boat-name-content">
                <Typography className="booking-date">skyLine Boat</Typography>
                <Typography className="booking-name-txt">Jeddah</Typography>
              </div>
            </div>
          ) : null}
        </div>

        <Footer />
      </div>
    </>
  );
};

{
  /* <Col>
<div className="d-flex justify-content-center">oaudfvubsdv</div>
</Col>
</Row>
<Row className="justify-content-center">
<Col>GJ</Col> */
}
