import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IMAGES from "../../../Images";
import { HeaderContent } from "../../../Common/map/HeaderContent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../../../Component/Footer/Footer";

const styles = {
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

  contentTitleName: {
    fontSize: "25px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.52,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  lable: {
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.56,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",

    width: "20%",
  },
};

export const RequestList = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);

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
        presentPage={"My Listings"}
      />
      <div style={styles.myListingsContainer}>
        <div style={styles.body}>
          <div style={styles.headerContent}>
            <div>
              <Typography style={styles.titleName}>
                Received Requests
              </Typography>
              <Typography style={styles.subTitle}>
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
                    <Typography style={styles.contentTitleName}>
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
                      <Typography style={styles.lable}>Reserved</Typography>
                      <Typography style={styles.lable}>
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
      <Footer />
    </>
  );
};
