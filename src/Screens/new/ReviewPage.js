import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { HeaderContent } from "../Common/map/HeaderContent";
import { SelectableStarRating } from "../../UI kit/5Star/SelectableStarRating";
import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";

const start_space_Validation = new RegExp(/^(?!\s).*/);

export const ReviewPage = () => {
  const navigate = useNavigate();
  // const navigate = useHistory();
  const [tellUsAboutYourExperience, setTellUsAboutYourExperience] =
    useState("");

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

  const handleRatingChange = (selectedRating) => {
    // Do something with the selectedRating
    console.log("Selected rating:", selectedRating);
  };
  return (
    <>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Boat Offers"}
        contentname3={"Scuba Courses/Programs"}
        contentname4={"Scuba Diving Trips"}
        handleBack={handleCallBack}
      />
      <div style={styles.container}>
        <Typography style={styles.titleTxt}>
          We hope you enjoyed your experience with us!
        </Typography>
        <Typography style={styles.infoTxt}>
          Your feedback helps us improve our services and ensures that we
          provide the best possible experience for our customers. Please take a
          moment to share your thoughts and rate your experience with us. Thank
          you for your time!
        </Typography>
        <Typography style={styles.starRateTxt}>
          How likely are you to rate your experience with us?
        </Typography>
        <SelectableStarRating onSelect={handleRatingChange} />
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="TellUsAboutYourExperience"
            name="TellUsAboutYourExperience"
            placeholder="Tell us about your experience and if there's anything to recommend"
            value={tellUsAboutYourExperience}
            onChange={(event) => {
              const inputValue = event.target.value;
              if (start_space_Validation.test(inputValue)) {
                setTellUsAboutYourExperience(inputValue);
              }
            }}
            InputProps={{
              style: styles.textFieldStyles,
            }}
            style={{
              backgroundColor: "white",
              verticalAlign: "top",
              display: "flex",
              alignSelf: "flex-start",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "start",
            }}
            multiline
            maxRows={5}
          />
        </Grid>

        <Typography style={styles.pictureTxt}>
          Would you like to leave a picture for your joyful experience?
        </Typography>
        <div
          style={{
            marginTop: "33px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignSelf: "center",
            // alignContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "265px",
            border: "solid 0.5px rgba(66, 70, 81, 0.36)",
            borderRadius: "10px",
          }}
        >
          <img
            alt="camera"
            src={IMAGES.CAMERA}
            style={{ width: "60px", height: "50px" }}
          />
          <Typography style={styles.uploadTxt}>Click here to Upload</Typography>
        </div>
        <Button style={styles.btnStyle}>Submit</Button>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    width: "100%",
    // height: "100vh",
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "278px",
    paddingRight: "278px",
    paddingBottom: "116px",
  },
  titleTxt: {
    marginTop: "110px",
    fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.33,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  infoTxt: {
    marginTop: "32px",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.46,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  starRateTxt: {
    marginTop: "64px",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.54,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  textFieldStyles: {
    border: "solid 0.01px rgba(66, 70, 81, 0.36)",
    borderRadius: "10px",
    borderWidth: ".01px",
    height: "265px",
  },
  pictureTxt: {
    marginTop: "64px",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.54,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  uploadTxt: {
    marginTop: "27px",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.15,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.6)",
  },
  btnStyle: {
    backgroundColor: "#3973a5",
    color: "white",
    marginTop: "72px",
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.15,
    letterSpacing: "normal",
    textAlign: "center",
    borderRadius: "0px",
    padding: "19px 137.5px 18px 138.5px",
    width: "350px",
    height: "65px",
    alignSelf: "flex-end",
  },
};
