import React from "react";
import Footer from "../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { HeaderContent } from "../Common/map/HeaderContent";
import IMAGES from "../Images";
import { Typography } from "@mui/material";
import { StarRating } from "../../UI kit/5Star/StarRating";

export const BoatViewDetails = () => {
  const navigate = useNavigate();

  const handleCallBack = (name) => {
    if (name === "Home") {
      navigate("/home");
    } else if (name === "Boat Offers") {
      //   navigate("/home");
    } else if (name === "My Listings") {
    } else if (name === "List a Boat Offer") {
      //   navigate("/home");
    }
  };

  let boatImages = [
    {
      id: 1,
      img: IMAGES.boat2,
    },
    {
      id: 2,
      img: IMAGES.boat1,
    },
    {
      id: 3,
      img: IMAGES.boat3,
    },
    {
      id: 4,
      img: IMAGES.boat4,
    },
  ];

  return (
    <div style={styles.container}>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Boat Offers"}
        contentname3={"My Listings"}
        contentname4={"List a Boat Offer"}
        handleBack={handleCallBack}
      />

      <div style={styles.backgroundImage}>
        <div style={styles.insideBackgroundImage}>
          <Typography style={styles.boatName}>Night Light</Typography>
          <Typography style={styles.boatNameSub}>Riyadh</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          margin: "0px 140px 100px",
          padding: "30px 107.5px 196px 107.5px",
        }}
      >
        <div
          style={{
            // backgroundColor: "blueviolet",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {boatImages?.map((item, index) => {
            return (
              <>
                <img
                  alt="boat img"
                  src={item?.img}
                  style={{ ...styles.displayBoatImg, marginLeft: "16px" }}
                />
              </>
            );
          })}
          <div
            style={{
              boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
              marginLeft: "30px",
              padding: "35px 34px 35px 35px",
              border: "solid 1px rgba(66, 70, 81, 0.3)",
              height: "277px",
              //   position: "absolute",
              alignSelf: "flex-end",
              alignContent: "flex-end",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              //   left: 0,
              //   right: 0,
            }}
          >
            <StarRating rating={3} />
            <Typography>(30 reviews)</Typography>
            <Typography style={styles.bookRequestBtn}>
              Send a Book Request
            </Typography>
          </div>
        </div>

        <div style={{ ...styles.straightLine, marginTop: "94px" }} />
        <div>
          <img
            alt="profile"
            src={IMAGES.PROFILE_ICON}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      </div>

      <div
        style={
          {
            //   marginTop: "200px",
            //   alignSelf: "center",
            //   alignItems: "center",
            //   alignContent: "center",
          }
        }
      >
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
  backgroundImage: {
    backgroundImage: `url(${IMAGES.boat1})`, // Use the url() function with the image path
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // width: "100%",
    height: "640px",
    position: "relative",
  },
  insideBackgroundImage: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boatName: {
    // marginTop: "113px",
    fontFamily: "Poppins",
    fontSize: "85px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.51,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
    // textDecoration: "underline",
    // cursor: "pointer",
  },
  boatNameSub: {
    fontFamily: "Poppins",
    fontSize: "60px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
  },
  displayBoatImg: {
    width: "225px",
    height: "197px",
  },
  bookRequestBtn: {
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#f6f6f6",
    backgroundColor: "#3973a5",
    borderRadius: "15px",
    margin: "26px 0 0",
  },
  straightLine: {
    backgroundColor: "rgba(66, 70, 81, 0.1)",
    height: "2px",
    width: "100%",
  },
};
