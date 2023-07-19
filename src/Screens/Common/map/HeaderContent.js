import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import IMAGES from "../../Images";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100vw",
  },
  body: {
    width: "100vw",
    display: "flex",
    // backgroundColor: "red",
    padding: "24px 140px",
    justifyContent: "space-between",
  },
  appIcon: {
    width: "198px",
    height: "98px",
  },
  rowContent: {
    display: "flex",
    // backgroundColor: "grey",
    // alignSelf: "center",
    // alignContent: "center",
    alignItems: "center",
  },
  profileImg: {
    width: "77px",
    height: "77px",
  },
  Icon: {
    width: "30px",
    height: "30px",
  },
  diplayTxtContent: {
    display: "flex",
    // backgroundColor: "grey",
    // width: "30vw",
  },
  titleTxt: {
    fontSize: "16px",
    color: "#424651",
    fontWeight: "normal",
    marginRight: "30px",
    fontFamily: "Poppins",
  },
}));

export const HeaderContent = ({ handleBack }) => {
  const classes = useStyles();
  const user = useSelector((state) => state?.auth);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.rowContent}>
          <img alt="iocn" src={IMAGES.APP_ICON} className={classes.appIcon} />
          <div className={classes.diplayTxtContent}>
            <Typography
              className={classes.titleTxt}
              style={{ marginLeft: "50px" }}
            >
              Home
            </Typography>
            <Typography className={classes.titleTxt}>Boat Offers</Typography>
            <Typography className={classes.titleTxt}>My Listings</Typography>
            <Typography className={classes.titleTxt}>
              List a Boat Offer
            </Typography>
          </div>
        </div>
        <div className={classes.rowContent}>
          <img alt="iocn" src={IMAGES.SEARCH} className={classes.Icon} />
          <img alt="iocn" src={IMAGES.EMAIL_ICON} className={classes.Icon} />
          <img alt="iocn" src={IMAGES.BELL} className={classes.Icon} />
          {/* SEARCH */}
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
          <img
            alt="iocn"
            src={IMAGES.PROFILE_ICON}
            className={classes.profileImg}
          />
        </div>
      </div>
    </div>
  );
};
