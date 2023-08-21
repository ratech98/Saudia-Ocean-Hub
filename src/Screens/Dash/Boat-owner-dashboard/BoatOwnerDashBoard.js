import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import IMAGES from "../../Images";
import Footer from "../../../Component/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderContent } from "../../Common/map/HeaderContent";
import { useDispatch, useSelector } from "react-redux";
import { BoatDetailCard } from "../Card/BoatDetailCard";
import { boat_list_filter } from "../../../Service/api";
import {
  boatRegisterStep1,
  boatRegisterStep2,
  boatServiceList,
  boatTypeList,
  search_boat_id,
  single_boat_details_store,
} from "../../../redux/slices";
import { toast } from "react-toastify";
import "./BoatOwnerDashBoard.css";
import { ArrowRightAlt } from "@material-ui/icons";
import { Container } from "react-bootstrap";
import { PageHeader } from "../page-header/PageHeader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../../../UI kit/useWindowDimensions";

export const BoatOwnerDashBoard = () => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const [isLoading, setIsLoading] = useState("");
  const [boatListDataDetails, setBoatListDataDetails] = useState("");
  const [boatListData, setBoatListData] = useState([]);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  console.log("auth", auth?.AuthToken);
  useEffect(() => {
    const blockBackButton = (e) => {
      e.preventDefault();
      // navigate.push("/");
      navigate(location.pathname);
    };
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", blockBackButton);
    return () => {
      window.removeEventListener("popstate", blockBackButton);
    };
  }, [location.pathname, navigate]);

  const handle_navigation = (name) => {
    console.log("name", name);
    if (name === "Home") {
      //   if (auth?.AuthToken) {
      //     if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
      navigate("/boatOwnerDashBoard");
      //     } else {
      // navigate("/rental");
      //     }
      //   } else {
      //     navigate("/");
      //   }
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "SignUp") {
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

  useEffect(() => {
    setIsLoading(true);
    let payload = {
      pageNo: 1,
    };
    boat_list_filter(auth?.AuthToken, payload)
      .then((res) => {
        console.log("res", res?.data);
        if (res?.data?.message === "success") {
          setBoatListDataDetails(res?.data);
          setBoatListData(res?.data?.parameters);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  }, [auth?.AuthToken]);
  console.log("width", width);
  return (
    <>
      <div style={{ backgroundColor: "#f6f6f6" }}>
        <div className="show-header-outSide-banner">
          <PageHeader
            showLoginSignUp={auth?.AuthToken ? false : true}
            handle_navigation={handle_navigation}
            presentPage={"Home"}
            link1={"For Boat Owners"}
            link2={"For Boat Rentals"}
          />
        </div>
        <div className="show-header-inside-banner">
          <PageHeader
            showLoginSignUp={auth?.AuthToken ? false : true}
            handle_navigation={handle_navigation}
            presentPage={"Home"}
            link1={"For Boat Owners"}
            link2={"For Boat Rentals"}
          />
        </div>

        <Container>
          <div className="header-title">
            <Typography
              // className="subtitleTxt"
              className={class_name?.ListYourBoatandEarnMoney}
            >
              List Your Boat and Earn Money{" "}
            </Typography>
            <Typography
              // className="subtitleTxt subtitleTxt2"
              className={class_name?.ListYourBoatandEarnMoney}
              style={{ fontWeight: "bold" }}
            >
              in 2 Steps
            </Typography>
          </div>
          <div className="upload-boat-doc">
            <div className="doc-img">
              <img
                alt="add_file"
                src={IMAGES.ADD_FILES}
                // className="add-file-icon"
                className={class_name.add_boat_deatils}
              />
            </div>
            <div className="boat-doc">
              <Typography
                // className="upload-boat-doc-title"
                className={class_name?.doc_title_txt}
              >
                Upload your boat documentations
              </Typography>
              <Typography
                // className="upload-boat-doc-info"
                className={class_name.doc_sub_title_txt}
              >
                To ensure authenticity and build trust, we kindly request boat
                owners to upload their boat documents during the listing
                process.
              </Typography>
            </div>
          </div>
          <div className="upload-boat-detail">
            <div className="doc-img">
              <img
                alt="add_file"
                src={IMAGES.ADD_BOATE_DETAILS}
                // className="add-boat-detial"
                className={class_name.add_boat_deatils}
              />
            </div>
            <div className="boat-doc">
              <Typography
                // className="upload-boat-doc-title"
                className={class_name.doc_title_txt}
              >
                Add your boat's details
              </Typography>
              <Typography
                // className="upload-boat-doc-info"
                className={class_name.doc_sub_title_txt}
              >
                To attract potential guests, we suggest you to showcase your
                boat, its features, amenities, and unique qualities.
              </Typography>
            </div>
          </div>
          {/* BUTTON */}
          <div className="botton-align-right">
            {/* <div className="boat-list-button"> */}
            <div className={class_name?.get_action_btn}>
              <Typography
                className={`${class_name.get_action_txt} hoverEffect`}
                // className="action-button"
                onClick={() => {
                  navigate("/BoatOfferStep1");
                  dispatch(single_boat_details_store(null));
                  navigate("/BoatOfferStep1");
                  dispatch(
                    boatRegisterStep1({
                      ministryOfTransportDoc: null,
                      generalDirectorateOfBorderGuardDoc: null,
                      boatDocumentationsAndLicenses: null,
                    })
                  );
                  dispatch(boatTypeList(null));
                  dispatch(boatServiceList(null));
                  dispatch(
                    boatRegisterStep2({
                      Boat_name: null,
                      Boat_type: null,
                      Boat_year: null,
                      Boat_length: null,
                      Boat_max_capacity: null,
                      Boat_price_per_hour: null,
                      Upload_images_of_your_boat: null,
                      Boat_services_selected: null,
                      Marine_name: null,
                      Marine_address: null,
                      Boat_backgroung_image: null,
                      Boat_profile_image: null,
                    })
                  );

                  dispatch(single_boat_details_store(null));
                }}
              >
                List Your Boat Now
              </Typography>

              {/* <ArrowRightAlt /> */}
              <img
                alt="left-arr.png"
                src={require("../../../assets/Images/left-arr.png")}
                className={class_name.left_arr}
              />
            </div>
          </div>
        </Container>
        <div
          className="boat-offers"
          style={
            width <= 768
              ? { marginTop: 37, marginLeft: 10, marginRight: 6 }
              : width <= 1024
              ? { marginTop: 193, marginLeft: 100, marginRight: 44 }
              : width <= 1500
              ? {
                  marginTop: 193,
                  marginLeft: 150 - width / 20,
                  marginRight: 96 - width / 20,
                }
              : {
                  marginTop: 193,
                  marginLeft: 150,
                  marginRight: 96,
                }
          }
        >
          <Typography
            // className="boat-offer-title"

            className={class_name.BestBoatOffers}
            style={{ marginBottom: width <= 768 ? 36 : 96 }}
          >
            Best Boat Offers This Week
          </Typography>
          <div
            className="align-card"
            style={
              width <= 768
                ? {
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",

                    //   marginLeft: 16,
                    //   marginRight: 16,
                  }
                : width <= 1140
                ? {
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: 16,
                    marginRight: 16,
                    justifyContent: "center",
                  }
                : {
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginLeft: 16,
                    marginRight: 16,
                    // justifyContent: "center",
                  }
            }
          >
            {boatListDatas?.map((item, index) => {
              // console.log(
              //   "boatListData item",
              //   `http://localhost:3000/${item?.front_image}`
              // );
              return (
                <div
                  style={
                    width <= 768
                      ? {
                          marginBottom: 12,
                          marginRight: (index + 1) % 2 === 0 ? 0 : 4,
                        }
                      : width <= 1223
                      ? {
                          marginBottom: 20,
                          marginRight: 26,
                        }
                      : {
                          marginBottom: 20,
                          marginRight: 56,
                        }
                  }
                  // className="card-margin"
                  onClick={() => {
                    navigate("/boatViewDetails");
                    // item?.boat_id

                    dispatch(search_boat_id(item?.boat_id));
                  }}
                >
                  <BoatDetailCard
                    // profile_image={`http://localhost:3000/${item?.front_image}`}
                    boatName={item?.boat_name}
                    marine_city={item?.marine_city}
                    starRating={3}
                    pricePerHour={item?.price_per_hour}
                    priceCurrency={item?.price_currency}
                    boatMaxCapacity={item?.boat_max_capacity}
                    profile_image={item?.profile_image}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="footer-style-hide">
          <Footer />
        </div>
      </div>
    </>
  );
};

const boatListDatas = [
  {
    id: 1,
    boat_name: "Jagadeesh",
    marine_city: "Durrat Al Arus",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
    profile_image: IMAGES.boat1,
  },
  {
    id: 2,
    boat_name: "Bhadur",
    marine_city: "Al Fanateer Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
    profile_image: IMAGES.boat3,
  },
  {
    id: 3,
    boat_name: "Farasan",
    marine_city: "Umluj Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
    profile_image: IMAGES.boat4,
  },
  {
    id: 4,
    boat_name: "Al Saif",
    marine_city: "Indigo Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
    profile_image: IMAGES.boat1,
  },
];

const useStyles = makeStyles((theme) => ({
  ListYourBoatandEarnMoney: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 38px)",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
    // backgroundColor: "red",
  },
  //
  get_action_btn: {
    marginTop: "16px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "20px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "55px",
    },
    borderRadius: "30px",
    border: "solid 1.5px #026b93",
    padding: "2% 5%",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    transition: "background-color 0.3s", // Add a smooth transition for the background color
    "&:hover": {
      backgroundColor: "#026b93", // Change the background color on hover
      "& $get_action_txt": {
        color: "white", // Change text color on hover
      },
    },
    // backgroundColor: "red",
  },
  get_action_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#026b93",
  },
  doc_title_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(10px, 3vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    // lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },
  doc_sub_title_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 16px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    // lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.6)",
  },
  add_boat_deatils: {
    width: "clamp(55px, 15vw, 95px)", // Adjust the range as needed
    height: "clamp(35px, 10vh, 84px)", // Adjust the range as needed
  },
  left_arr: {
    width: "22px", // Adjust the range as needed
    height: "15px", // Adjust the range as needed
    alignSelf: "center",
    marginLeft: "15px",
  },
  BestBoatOffers: {
    fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 48px)",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  "@media (max-width: 767px)": {
    left_arr: {
      width: "9px", // Adjust the range as needed
      height: "6px", // Adjust the range as needed
      alignSelf: "center",
      marginLeft: "10px",
    },
  },
}));
