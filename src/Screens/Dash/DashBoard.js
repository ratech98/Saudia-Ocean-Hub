import { Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import IMAGES from "../Images";

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
        <div style={{}}>
          <img
            alt="add_file"
            src={IMAGES.ADD_FILES}
            style={{
              flex: 1,
              backgroundColor: "#f6f6f6",
              width: "120px",
              height: "120px",
            }}
          />
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
    alignItems: "center",
    backgroundColor: "#f6f6f6",
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
  },
  titleOptionTxt: {
    fontSize: 16,
    // color: "#424651",
    color: "black",
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
    // color: "#424651",
    color: "black",
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
};
