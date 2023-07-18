import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";
import { StarRating } from "../../UI kit/5Star/StarRating";
import Imagebox from "../../Component/ImageBox/Imagebox";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderContent } from "../Common/map/HeaderContent";
import { useSelector } from "react-redux";

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

export const BoatOwnerDashBoard = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(location.pathname);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location.pathname, navigate]);

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      // navigate("/home");
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "Boat Offers") {
      //   navigate("/home");
    } else if (name === "My Listings") {
      navigate("/myListings");
    } else if (name === "List a Boat Offer") {
      // navigate("/home");
    } else {
      navigate(name);
    }
  };
  return (
    <div style={styles.container}>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"For Boat Owners"}
        contentname3={"For Boat Rentals"}
        contentname4={"My Listings"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={auth?.AuthToken ? false : true}
      />

      <Container style={styles.pageTopContainer} maxWidth="100%">
        <Typography onClick={() => {}} style={styles.subtitleTxt}>
          List Your Boat and Earn Money{" "}
        </Typography>
        <span
          style={{
            fontWeight: "bolder",
            fontSize: "38px",
            textAlign: "center",
            color: "#424651",
          }}
        >
          in 2 Steps
        </span>
      </Container>
      <Container style={styles.docUploadContainer}>
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
              padding: "25px",
              backgroundColor: "white",
              borderRadius: "500px",
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
                height: "80px",
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

      <Container style={{ ...styles.docUploadContainer }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20%",
          }}
        >
          <div
            style={{
              padding: "30px",
              backgroundColor: "white",
              borderRadius: "500px",
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
                width: "95px",
                height: "85px",
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
      <Imagebox imageBox={boatListData} />

      <div style={{ marginTop: "200px" }}>
        <Footer />
      </div>
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
    alignSelf: "center,",
    textAlign: "center",
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
    marginTop: "30px",
  },
  subtitleTxt: {
    fontSize: "38px",
    color: "#424651",

    // fontWeight: "500",
    // cursor: "pointer",
    textAlign: "center",
  },
  docUploadContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "10%",
  },
  uploadBoatDocTitleTxt: {
    fontSize: 25,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.53,
  },
  uploadBoatDocTxt: {
    marginTop: "20px",
    fontSize: 17,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "300",
    lineHeight: 1.53,
  },
  boatOfferTitle: {
    marginTop: "80px",
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

const boatListData = [
  {
    id: 1,
    boat_name: "Jagadeesh",
    marine_city: "Durrat Al Arus",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  {
    id: 2,
    boat_name: "Bhadur",
    marine_city: "Al Fanateer Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  {
    id: 3,
    boat_name: "Farasan",
    marine_city: "Umluj Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  {
    id: 4,
    boat_name: "Al Saif",
    marine_city: "Indigo Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
];
