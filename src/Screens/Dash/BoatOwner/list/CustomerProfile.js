import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Instagram,
  Star,
  StarOutline,
  Twitter,
  YouTube,
} from "@material-ui/icons";
import IMAGES from "../../../Images";
import { StarRating } from "../../../../UI kit/5Star/StarRating";
import { HeaderContent } from "../../../Common/map/HeaderContent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../../../Component/Footer/Footer";

const useStyles = makeStyles({
  myListingsContainer: {
    display: "flex",
    width: "100vw",
    backgroundColor: "#f6f6f6",
    // height: "100vw",
    flexDirection: "column",
  },
  body: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    paddingBottom: "114px",
  },
  headerContent: {
    display: "flex",
    width: "100%",
    backgroundImage: `url(${IMAGES.subaDiving})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "367px",
  },
  insideHeader: {
    display: "flex",
    width: "100%",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "rgba(169, 209, 239, 0.5)",
    padding: "0px 200px",
    alignContent: "center",
    // alignSelf: "center",
    paddingBottom: "30px",
  },
  contentContainer: {
    display: "flex",
    // flexDirection: "column",
    // opacity: 1,
    width: "100%",
  },
  titleName: {
    fontSize: "24px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.46,
    letterSpacing: "normal",
    // color: "#424651",
    color: "black",
    textAlign: "left",
  },
  subTitle: {
    marginTop: "8px",
    fontSize: "22px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    // color: "#424651",
    color: "#36454F",
  },
  titleContainer: {
    marginLeft: "80px",
  },
  cancelDiv: {
    display: "flex",
    alignItems: "flex-end",
    // backgroundColor: "red",
    // flex: 1,
    width: "23%",
    alignSelf: "center",
    justifyContent: "center",
  },
  buttonStyles: {
    // fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.46",
    letterSpacing: "normal",
    textAlign: "left",
    color: "#3973a5",
    borderRadius: "10px",
  },
  dateTitleDiv: {
    display: "flex",
    width: "100%",
  },
  userDetailsContainer: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
  },
  userDetailsSingleContainer: {
    marginLeft: "20px",
    display: "flex",
    width: "30%",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    // alignSelf: "center",
    // alignContent: "center",
    padding: "65px",
    alignItems: "center",
  },
  userBoxDiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: "53px 87px",
  },
  rowDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rowDivShowUserDetails: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "24px",
  },
  seeDetailsTxt: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.6)",
  },
  lableTxt: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
    width: "30%",
  },
  userInfoTxt: {
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
});

export const CustomerProfile = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const auth = useSelector((state) => state?.auth);

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
        navigate("/boatOwnerDashBoard");
      } else {
        navigate("/rental");
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
      <HeaderContent
        contentname1={"Home"}
        contentname2={"For Boat Owners"}
        contentname3={"For Boat Rentals"}
        contentname4={"My Listings"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={auth?.AuthToken ? false : true}
        // presentPage={"My Listings"}
      />
      <div className={classes.myListingsContainer}>
        <div className={classes.body}>
          <div className={classes.headerContent}>
            <div className={classes.insideHeader}>
              <div className={classes.contentContainer}>
                <div className={classes.dateTitleDiv}>
                  <div>
                    <Typography className={classes.titleName}>28 </Typography>
                    <Typography className={classes.titleName}>May </Typography>
                  </div>
                  <div className={classes.titleContainer}>
                    <Typography className={classes.titleName}>
                      Advanced Open Water Diving Course
                    </Typography>
                    <Typography className={classes.subTitle}>
                      Blue Ocean Dive Resort
                    </Typography>
                  </div>
                </div>
                <div className={classes.cancelDiv}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className={classes.buttonStyles}
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              // width: "100%",
              flexDirection: "row",
              marginBottom: "156px",
              margin: "0px 200px",
              paddingTop: "80px",
            }}
          >
            <div className={classes.userDetailsContainer}>
              <div className={classes.userBoxDiv}>
                <div className={classes.rowDiv}>
                  <Typography className={classes.titleName}>
                    Course/Program
                  </Typography>
                  <Typography className={classes.seeDetailsTxt}>
                    See Full Details
                  </Typography>
                </div>
                <div
                  className={classes.rowDivShowUserDetails}
                  style={{ marginTop: "40px" }}
                >
                  <Typography className={classes.lableTxt}>
                    Instructor
                  </Typography>
                  <Typography className={classes.userInfoTxt}>
                    Ali Muhammed
                  </Typography>
                </div>
                <div className={classes.rowDivShowUserDetails}>
                  <Typography className={classes.lableTxt}>Duration</Typography>
                  <Typography className={classes.userInfoTxt}>
                    5 days
                  </Typography>
                </div>
                <div className={classes.rowDivShowUserDetails}>
                  <Typography className={classes.lableTxt}>Price</Typography>
                  <Typography className={classes.userInfoTxt}>
                    2000 SAR Per Person
                  </Typography>
                </div>
              </div>

              <div className={classes.userBoxDiv} style={{ marginTop: "24px" }}>
                <div className={classes.rowDiv}>
                  <Typography className={classes.titleName}>
                    Recent Activity
                  </Typography>
                </div>
                <div
                  className={classes.rowDivShowUserDetails}
                  style={{ marginTop: "40px" }}
                >
                  <Typography className={classes.lableTxt}>
                    19.05.2022
                  </Typography>
                  <Typography className={classes.userInfoTxt}>
                    Ali accepted your book request
                  </Typography>
                </div>
                <div className={classes.rowDivShowUserDetails}>
                  <Typography className={classes.lableTxt}>
                    22.05.2022
                  </Typography>
                  <Typography className={classes.userInfoTxt}>
                    You paid 2000 SAR
                  </Typography>
                </div>
                <div className={classes.rowDivShowUserDetails}>
                  <Typography className={classes.lableTxt}>
                    11.06.2022
                  </Typography>
                  <Typography className={classes.userInfoTxt}>
                    You gave your feedback to Ali
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.userDetailsSingleContainer}>
              <Typography
                className={classes.titleName}
                style={{ marginBottom: "50px" }}
              >
                Your Review
              </Typography>
              <StarRating rating={3} />
              <Typography
                className={classes.userInfoTxt}
                style={{ marginTop: "50px", textAlign: "center" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </div>
          </div>
        </div>
        {/* <div
          style={{
            backgroundColor: "white",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() => {
                console.log("Twitter");
              }}
              style={{ backgroundColor: "rgba(66, 70, 81, 0.2)" }}
            >
              <Twitter style={{ fill: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("YouTube");
              }}
              style={{
                marginLeft: "25px",
                backgroundColor: "rgba(66, 70, 81, 0.2)",
              }}
            >
              <YouTube style={{ fill: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("Instagram");
              }}
              style={{
                marginLeft: "25px",
                backgroundColor: "rgba(66, 70, 81, 0.2)",
              }}
            >
              <Instagram style={{ fill: "black" }} />
            </IconButton>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "28px",
              paddingBottom: "40px",
              // width: "100%"
            }}
          >
            <Typography
              className={classes.userInfoTxt}
              style={{ width: "10%", fontWeight: "200" }}
            >
              About Us
            </Typography>
            <Typography
              className={classes.userInfoTxt}
              style={{ width: "15%", fontWeight: "200" }}
            >
              Help & Support
            </Typography>
            <Typography
              className={classes.userInfoTxt}
              style={{ width: "10%", fontWeight: "200" }}
            >
              Contact Us
            </Typography>
            <Typography
              className={classes.userInfoTxt}
              style={{ width: "15%", fontWeight: "200" }}
            >
              Terms Of Service
            </Typography>
            <Typography
              className={classes.userInfoTxt}
              style={{ width: "10%", fontWeight: "200" }}
            >
              Privacy Policy
            </Typography>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};
