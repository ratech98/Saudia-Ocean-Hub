import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";
import { StarRating } from "../../UI kit/5Star/StarRating";

const boatServices = [
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
  {
    service: "Toilet",
  },
  {
    service: "Wi-Fi",
  },
  {
    service: "Fishing Gear",
  },
  {
    service: "BBQ",
  },
  {
    service: "Hot Drinks",
  },
  {
    service: "Watersport Activities",
  },
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
];

export const DashBoard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Container style={styles.headerContainer} maxWidth="100%">
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            margin: "24px",
            // backgroundColor: "green",
          }}
        >
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flex: 0.5,
            }}
          >
            <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIcon} />
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              Home
            </Typography>
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              For Boat Owners
            </Typography>
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              For Boat Rentals
            </Typography>
            <Typography
              onClick={() => {
                navigate("/MyListings");
              }}
              style={styles.titleOptionTxt}
            >
              My Listings
            </Typography>
          </div>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",

              flex: 0.1,
            }}
          >
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              Log In
            </Typography>
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              Sign Up
            </Typography>
          </div>
        </div>
      </Container>
      <Container style={styles.pageTopContainer} maxWidth="100%">
        <Typography onClick={() => {}} style={styles.subtitleTxt}>
          List Your Boat and Earn Money{" "}
        </Typography>
        <span
          style={{
            fontWeight: "bolder",
            fontSize: "30px",
            textAlign: "center",
          }}
        >
          in 2 Steps
        </span>
      </Container>
      <Container style={styles.docUploadContainer} maxWidth="100%">
        <div
          style={{
            display: "flex",
            // flexDirection: "row",
            // alignSelf: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "40px",
              backgroundColor: "white",
              // width: "211px",
              borderRadius: "500px",
              // height: "211px",
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              alt="add_file"
              src={IMAGES.ADD_FILES}
              style={{
                flex: 1,
                backgroundColor: "white",
                // width: "120px",
                height: "120px",
              }}
            />
          </div>
          <div
            style={{
              width: "50%",
              marginLeft: "50px",
            }}
          >
            <Typography style={styles.uploadBoatDocTitleTxt}>
              Upload your boat documentations
            </Typography>
            <Typography style={styles.uploadBoatDocTxt}>
              To ensure authenticity and build trust, we kindly request boat
              owners to upload their boat documents during the listing process.
            </Typography>
          </div>
        </div>
      </Container>

      <Container
        style={{ ...styles.docUploadContainer, marginLeft: "25%" }}
        maxWidth="100%"
      >
        <div
          style={{
            display: "flex",
            // flexDirection: "row",
            // alignSelf: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: "40px",
              backgroundColor: "white",
              // width: "211px",
              borderRadius: "500px",
              // height: "211px",
              alignSelf: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img
              alt="add_file"
              src={IMAGES.ADD_BOATE_DETAILS}
              style={{
                flex: 1,
                backgroundColor: "white",
                width: "150px",
                height: "120px",
              }}
            />
          </div>
          <div
            style={{
              width: "50%",
              marginLeft: "50px",
            }}
          >
            <Typography style={styles.uploadBoatDocTitleTxt}>
              Add your boat's details
            </Typography>
            <Typography style={styles.uploadBoatDocTxt}>
              To attract potential guests, we suggest you to showcase your boat,
              its features, amenities, and unique qualities.
            </Typography>
          </div>
        </div>
      </Container>
      <div style={styles.contentContainer}>
        <Typography
          onClick={() => {
            navigate("/BoatOfferStep1");
          }}
          style={styles.actionButton}
        >
          List Your Boat Now
        </Typography>

        <Typography style={styles.boatOfferTitle}>
          Best Boat Offers This Week
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",

          margin: "0px 230px",
        }}
      >
        {boatServices?.map((item, index) => {
          return (
            <div
              style={{
                margin: "10px",
                backgroundColor: "white",
              }}
            >
              <img
                src={IMAGES.boat1}
                style={{ width: "450px", height: "260px" }}
                alt="boat"
              />
              <div style={{ padding: "32px" }}>
                <Typography style={styles.boatName}>Night Light</Typography>
                <Typography style={styles.boatDrierName}>Jeddah</Typography>

                <StarRating rating={3} />
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <img
                      src={IMAGES.MONEY_CARD}
                      style={styles.moneyIcon}
                      alt="money"
                    />
                    <Typography style={styles.boatprice}>7200 SAR</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <img
                      src={IMAGES.GROUP}
                      style={styles.groupIcon}
                      alt="money"
                    />
                    <Typography style={styles.boatprice}>15</Typography>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  headerContainer: {
    width: "100%",
  },
  appIcon: {
    width: "158px",
    height: "98px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    //
    // backgroundColor: "#f6f6f6",
    alignSelf: "flex-start",
    width: "100%",
    // backgroundColor: "yellow",
  },
  actionButton: {
    fontSize: 24,
    color: "#026b93",
    fontWeight: "600",
    borderColor: "#026b93",
    borderWidth: 2,
    borderRadius: "30px",
    borderStyle: "solid",
    padding: "10px 50px",
    cursor: "pointer",
    marginLeft: "65%",
    alignItems: "center",
    width: "25%",
  },
  titleOptionTxt: {
    fontSize: 16,
    color: "#424651",
    fontWeight: "500",
    cursor: "pointer",
  },
  pageTopContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "57px",
  },
  subtitleTxt: {
    fontSize: "28px",
    color: "#424651",

    // fontWeight: "500",
    // cursor: "pointer",
    textAlign: "center",
  },
  docUploadContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "57px",
    marginLeft: "10%",
  },
  uploadBoatDocTitleTxt: {
    fontSize: 30,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.53,
  },
  uploadBoatDocTxt: {
    marginTop: "20px",
    fontSize: 20,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "300",
    lineHeight: 1.53,
  },
  boatOfferTitle: {
    marginTop: "193px",
    fontSize: 48,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "center",
  },
  boatName: {
    fontSize: 20,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "left",
    // marginTop: "24px",
  },
  boatDrierName: {
    fontSize: 20,
    color: "rgba(66, 70, 81, 0.6)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    lineHeight: 1.5,
    textAlign: "left",
    marginTop: "8px",
  },
  boatprice: {
    fontSize: 18,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "left",
    marginLeft: "10px",
  },
  moneyIcon: {
    width: "28px",
    height: "30px",
  },
  groupIcon: {
    width: "33px",
    height: "25px",
    marginRight: "10px",
  },
};
