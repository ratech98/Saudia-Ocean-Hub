import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Typography } from "@mui/material";
import { HeaderContent } from "../Common/map/HeaderContent";
import Footer from "../../Component/Footer/Footer";
import IMAGES from "../Images";
import { Cancel } from "@material-ui/icons";

export const Notification = () => {
  const navigate = useNavigate();
  // const navigate = useHistory();

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
        <Typography style={styles.titleTxt}>Notifications</Typography>

        <div style={{ marginTop: "50px" }}>
          {notifiList?.map((item, index) => {
            return (
              <div style={{ marginBottom: "16px" }}>
                <Typography style={styles.dayTxt}>{item?.day}</Typography>
                {item?.message?.map((msgItem, msgIndex) => {
                  return (
                    <>
                      <div
                        style={{
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "row",
                          padding: "32px 60px",
                          border: "solid 0.5px rgba(66, 70, 81, 0.3)",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // alignContent: "center",
                          // alignSelf: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            // alignContent: "center",
                            // alignSelf: "center",
                          }}
                        >
                          <img
                            alt="img"
                            src={IMAGES.CAMERA}
                            style={styles.imgStyle}
                          />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              paddingLeft: "43px",
                            }}
                          >
                            <Typography style={styles.msgTxt}>
                              {msgItem?.msg}
                            </Typography>
                            <Typography style={styles.dateTxt}>
                              {msgItem?.day}
                            </Typography>
                          </div>
                        </div>
                        <IconButton>
                          <Cancel />
                        </IconButton>
                      </div>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
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
    marginTop: "100px",
    // fontFamily: "Poppins",
    fontSize: "40px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  dayTxt: {
    // fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.53,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#f6f6f6",
    backgroundColor: "#3973a5",
    padding: "20px 60px",
  },
  imgStyle: {
    width: "32px",
    height: "32px",
  },
  msgTxt: {
    // marginTop: "64px",
    fontFamily: "Poppins",
    fontSize: "22px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.54,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  dateTxt: {
    // marginTop: "64px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  //
  //
  //
  //
  //
  //
  //

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

const notifiList = [
  {
    id: 1,
    day: "Today",
    message: [
      {
        msg: "We're sorry. Your submitted request, Majd Boat, has been rejected by the owner",
        day: "22 September",
      },
      {
        msg: "Your experience matters to us! Leave a review and tell us how we can make your next experience even better.",
        day: "22 September",
      },
    ],
  },
  {
    id: 2,
    day: "Earlier",
    message: [
      {
        msg: "You have successfully booked `Madinah Ship` on Saturday 21.10.2022",
        day: "19 September",
      },
      {
        msg: "Congratulations! Your diving trip, Experience the Thrill of Diving , has been successfully approved.",
        day: "15 September",
      },

      {
        msg: "Your boat offer, Night Lights, was not approved yet. Please review your form and submit again.",
        day: "15 September",
      },
    ],
  },
];
