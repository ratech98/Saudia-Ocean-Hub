import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import IMAGES from "../../Common/Images";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // backgroundColor: "#f6f6f6",
    width: "100vw",
  },
  body: {
    width: "100vw",
    display: "flex",
    backgroundColor: "red",
    padding: "24px 140px",
    justifyContent: "space-between",
  },
  appIcon: {
    width: "198px",
    height: "98px",
  },
  rowContent: {
    display: "flex",
  },
  profileImg: {
    width: "77px",
    height: "77px",
  },
}));

export const HeaderContent = ({ handleBack }) => {
  const classes = useStyles();
  const user = useSelector((state) => state?.auth);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <img alt="iocn" src={IMAGES.APP_ICON} className={classes.appIcon} />
        <div className={classes.rowContent}>
          <Typography>Home</Typography>
          <Typography>Boat Offers</Typography>
          <Typography>My Listings</Typography>
          <Typography>List a Boat Offer</Typography>
        </div>
        <div className={classes.rowContent}>
          <img
            alt="iocn"
            src={IMAGES.PROFILE_ICON}
            className={classes.profileImg}
          />
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
          <Typography>GJ</Typography>
        </div>
      </div>
    </div>
  );
};
