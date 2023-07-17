import { Typography } from "@mui/material";
import React, { useState } from "react";
import IMAGES from "../../Images";
import LogOut from "../../Dash/LogOut";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

export const HeaderContent = ({
  handleBack,
  contentname1,
  contentname2,
  contentname3,
  contentname4,
  contentname5,
  contentname6,
  search,
  showLoginSignUp = false,
}) => {
  const [openModal, setOpenModal] = useState(true);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Code to handle the logout functionality
    handleClose();
  };

  console.log("open Modal condition ", open);
  return (
    <>
      <div style={styles.root}>
        <div style={styles.body}>
          <div style={styles.rowContent}>
            <img alt="iocn" src={IMAGES.APP_ICON} style={styles.appIcon} />
            <div style={styles.diplayTxtContent}>
              {contentname1 ? (
                <Typography
                  style={{ ...styles.titleTxt, marginLeft: "50px" }}
                  onClick={() => {
                    handleBack(contentname1);
                  }}
                >
                  {contentname1}
                </Typography>
              ) : null}
              {contentname2 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname2);
                  }}
                >
                  {contentname2}
                </Typography>
              ) : null}
              {contentname3 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname3);
                  }}
                >
                  {contentname3}
                </Typography>
              ) : null}
              {contentname4 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname4}
                </Typography>
              ) : null}
              {contentname5 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname5}
                </Typography>
              ) : null}
              {contentname6 ? (
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack(contentname4);
                  }}
                >
                  {contentname6}
                </Typography>
              ) : null}
            </div>
          </div>
          {showLoginSignUp ? (
            <div style={styles.rowContent}>
              <div style={styles.diplayTxtContent}>
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack("Log In");
                  }}
                >
                  {"Log In"}
                </Typography>
                <Typography
                  style={styles.titleTxt}
                  onClick={() => {
                    handleBack("Sign Up");
                  }}
                >
                  {"Sign Up"}
                </Typography>
              </div>
            </div>
          ) : (
            <div style={styles.rowContent}>
              <img
                alt="iocn"
                src={IMAGES.SEARCH}
                style={styles.searchIcon}
                onClick={() => {
                  handleBack(search);
                }}
              />
              <img
                alt="iocn"
                src={IMAGES.EMAIL_ICON}
                style={styles.searchIcon}
              />
              <img alt="iocn" src={IMAGES.BELL} style={styles.searchIcon} />
              <img
                alt="iocn"
                src={IMAGES.PROFILE_ICON}
                style={styles.profileImg}
                onClick={handleOpen}
              />
            </div>
          )}
        </div>
      </div>
      {/* {openModal ? ( */}
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className={classes.modalContent}>
          <h2>Logout Confirmation</h2>
          <p>Are you sure you want to logout?</p>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
      {/* ) : null} */}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const styles = {
  root: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100%",
  },
  body: {
    width: "100%",
    display: "flex",
    padding: "24px 100px",
    justifyContent: "space-between",
  },
  appIcon: {
    width: "198px",
    height: "98px",
  },
  rowContent: {
    display: "flex",
    alignItems: "center",
  },
  profileImg: {
    width: "57px",
    height: "57px",
  },
  Icon: {
    width: "30px",
    height: "30px",
  },
  searchIcon: {
    width: "30px",
    height: "30px",
    marginRight: "35px",
  },
  diplayTxtContent: {
    display: "flex",
  },
  titleTxt: {
    fontSize: "24px",
    fontWeight: "normal",
    fontFamily: "Poppins",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#424651",
    marginRight: "30px",
    // textAlign: "center",
  },
};
