import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IMAGES from "../../../Images";

const useStyles = makeStyles({
  myListingsContainer: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100vw",
  },
  body: {
    display: "flex",
    width: "100%",
    paddingRight: 248,
    paddingLeft: 248,
    flexDirection: "column",
  },
  headerContent: {
    marginTop: "97px",
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "90px",
  },

  titleName: {
    fontSize: "40px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#424651",
    textAlign: "left",
  },
  subTitle: {
    marginTop: "30px",
    fontSize: "25px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.52,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  reqName: {
    fontSize: "25px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.52,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  reqDetailTxt: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.56,
    letterSpacing: "normal",
    textAlign: "left",
    // color: "#424651",
    color: "aqua",
    width: "10%",
    backgroundColor: "tomato",
  },

  boatListBody: {
    display: "flex",
    flexDirection: "row",
  },
});

export const RequestList = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const request_list = [
    {
      id: 1,
      boatName: "Night Light, Jeddah",
      star: 4,
      SAR: "300 SAR",
      date: "18.07.2022",
      image: IMAGES.boat1,
    },
    {
      id: 1,
      boatName: "Black Purl",
      star: 2,
      SAR: "30 SAR",
      date: "31.07.2022",
      image: IMAGES.boat2,
    },
    {
      id: 1,
      boatName: "Tanker",
      star: 3.5,
      SAR: "500 SAR",
      date: "11.07.2022",
      image: IMAGES.boat3,
    },
    {
      id: 1,
      boatName: "Titen",
      star: 4.5,
      SAR: "700 SAR",
      date: "15.07.2022",
      image: IMAGES.boat4,
    },
  ];

  return (
    <div className={classes.myListingsContainer}>
      <div className={classes.body}>
        <div className={classes.headerContent}>
          <div>
            <Typography className={classes.titleName}>
              Received Requests
            </Typography>
            <Typography className={classes.subTitle}>
              You have received 5 Requests
            </Typography>
          </div>
          <div>
            <img
              alt="list"
              src={IMAGES.FILTER_LIST}
              style={{ width: "32px", height: "22px" }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "156px",
          }}
        >
          {request_list?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate("/CustomerProfile");
                }}
                key={item.id}
                className="boatListBody"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 1px rgba(66, 70, 81, 0.3)",
                  padding: "20px 82px",
                  border: "solid 0.5px rgba(66, 70, 81, 0.3)",
                }}
              >
                <img
                  alt="list"
                  src={IMAGES.PROFILE_ICON}
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "100px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginLeft: "35px",
                  }}
                >
                  <Typography
                    className="reqName"
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.52,
                      letterSpacing: "normal",
                      textAlign: "left",
                      color: "#424651",
                    }}
                  >
                    Sara Qwider
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      marginTop: "17px",
                    }}
                  >
                    <Typography
                      className="reqDetailTxt"
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.56,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#424651",

                        width: "20%",
                      }}
                    >
                      Reserved
                    </Typography>
                    <Typography className="reqDetailTxt">
                      Magical space
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      // marginTop: "10px",
                    }}
                  >
                    <Typography
                      className="reqDetailTxt"
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.56,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#424651",
                        width: "20%",
                        // backgroundColor: "antiquewhite",
                      }}
                    >
                      Booking Date
                    </Typography>
                    <Typography
                      className="reqDetailTxt"
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.56,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#424651",
                        width: "20%",
                        // backgroundColor: "aqua",
                      }}
                    >
                      30.09.2022
                    </Typography>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
