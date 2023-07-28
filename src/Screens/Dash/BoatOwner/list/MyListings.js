import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PersonPinSharp, Star, StarOutline } from "@material-ui/icons";
import IMAGES from "../../../Images";
import { HeaderContent } from "../../../Common/map/HeaderContent";
import { my_listing } from "../../../../Service/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../../../Component/Footer/Footer";
import { StarRating } from "../../../../UI kit/5Star/StarRating";

export const MyListings = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const [myList, setMyList] = useState([]);

  // console.log("myList", myList);

  useEffect(() => {
    my_listing(auth?.AuthToken)
      .then((res) => {
        console.log("my_listing res=>", res?.data);
        if (res?.data?.message === "success") {
          setMyList(res?.data?.parameters);
        } else {
        }
      })
      .catch((err) => {
        console.log("my_listing err", err);
      });
  }, [auth?.AuthToken]);

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
              <Typography style={styles.titleName}>My Listings</Typography>
              <Typography style={styles.subTitle}>
                You have made 4 Boat Offers
              </Typography>
            </div>
            <div>
              <Button
                style={styles.AddNewOfferBtn}
                onClick={() => {
                  navigate("/RequestList");
                }}
              >
                Add New Offer
              </Button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "156px",
            }}
          >
            {myList?.map((item, index) => (
              <>
                {console.log("item", item)}
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "20px",
                    backgroundColor: "white",
                    boxShadow: "0px 0px 1px rgba(66, 70, 81, 0.3)",
                  }}
                >
                  <img
                    alt="boat"
                    // src={{ uri: "localhost:3000/" + item?.front_image }}
                    src={IMAGES.boat3}
                    style={{ width: "276px", height: "210px" }}
                    onError={(err) => {
                      console.log("err", err);
                    }}
                    onLoad={(load) => {
                      console.log("on load", load);
                    }}
                  />
                  <div
                    style={{
                      margin: "20px 30px",
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "30",
                        fontWeight: "bolder",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.53,
                        letterSpacing: "normal",
                        textAlign: "left",
                        color: "#424651",
                        marginBottom: "10px",
                      }}
                    >
                      {item.boat_name}
                    </Typography>

                    <StarRating rating={item?.star ?? 0} />
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <img
                        src={IMAGES.MONEY_CARD}
                        style={{
                          width: "26px",
                          height: "27px",
                          marginRight: "20px",
                        }}
                        alt="money"
                      />

                      <Typography
                        style={{
                          fontSize: "20",
                          fontWeight: "normal",
                          fontStretch: "normal",
                          fontStyle: "normal",
                          lineHeight: 1.5,
                          letterSpacing: "normal",
                          textAlign: "center",
                          color: "#424651",
                        }}
                      >
                        {item.price_per_hour} {item.price_currency}
                        <span
                          style={{ marginLeft: "10px", fontWeight: "bold" }}
                        >
                          {"per hour"}
                        </span>
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "20px 30px",
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      //   backgroundColor: "burlywood",
                      //   justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    {item?.date ?? "date"}
                    <div
                      style={{
                        display: "flex",
                        width: "50%",
                        // backgroundColor: "GrayText",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: "25px",
                      }}
                    >
                      <IconButton
                        onClick={() => {}}
                        style={{
                          width: "44px",
                          height: "44px",
                          border: "1px solid #3973a5",
                          // backgroundColor: "gold",
                        }}
                      >
                        <img
                          alt="edit"
                          src={IMAGES.EDIT_ICON}
                          style={styles.editIcon}
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => {}}
                        style={{
                          width: "44px",
                          height: "44px",
                          border: "1px solid #3973a5",
                          // backgroundColor: "gold",
                        }}
                      >
                        <img
                          alt="edit"
                          src={IMAGES.USER_PROFILE}
                          style={styles.editIcon}
                        />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  myListingsContainer: {
    display: "flex",
    backgroundColor: "#f6f6f6",
    width: "100vw",
  },
  body: {
    display: "flex",
    width: "100%",
    paddingRight: "200px",
    paddingLeft: "200px",
    flexDirection: "column",
  },
  headerContent: {
    // marginTop: "97px",
    marginTop: "27px",
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "90px",
  },

  titleName: {
    fontSize: 40,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#424651",
    textAlign: "left",
  },
  subTitle: {
    fontSize: 25,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.52,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  AddNewOfferBtn: {
    padding: "10px 48px",
    objectFit: "contain",
    backgroundColor: "#3973a5",
    borderRadius: 30,
    fontSize: 21,
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.48,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#f6f6f6",
  },
  boatListBody: {
    display: "flex",
    flexDirection: "row",
  },
  starImage: {
    width: "24px",
    height: "24px",
  },
  filledStar: {
    fill: "#f9c909",
  },
  emptyStar: {
    // border: "1px solid black",
  },
  editIcon: {
    width: "20px",
    height: "20px",
  },
};

const boatList = [
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
