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
  // console.log("width", width);
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

        <div style={{}} className={class_name.page_top_container}>
          <div
            // className="header-title"
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "green",
              // width: "100%",.
              marginTop: "30px",
            }}
          >
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
            <div className={class_name.doc_img_div}>
              <img
                alt="add_file"
                src={IMAGES.ADD_FILES}
                className={class_name.add_boat_deatils1}
              />
            </div>
            <div
              // className="boat-doc"
              className={class_name.boat_doc}
              // style={{

              // }}
            >
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
            <div className={class_name.doc_img_div}>
              <img
                alt="add_file"
                src={IMAGES.ADD_BOATE_DETAILS}
                className={class_name.add_boat_deatils2}
              />
            </div>
            <div
              // className="boat-doc"
              className={class_name.boat_doc}
            >
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
            <div className={class_name?.get_action_btn}>
              <Typography
                className={`${class_name.get_action_txt} hoverEffect`}
                // className="action-button"
                onClick={() => {
                  navigate("/BoatOfferStep1");
                  dispatch(single_boat_details_store(null));
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

              <img
                alt="left-arr.png"
                src={require("../../../assets/Images/left-arr.png")}
                className={class_name.left_arr}
              />
            </div>
          </div>
        </div>
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
  page_top_container: {
    display: "flex",
    flexDirection: "column",
    // padding: "97px 280px 193px 280px",
    padding: "5% 10% 0%",
    // backgroundColor: "white",
    // [theme.breakpoints.up("md")]: {
    //   padding: "57px 250px 193px 280px", // Large screens
    //   backgroundColor: "red",
    // },
    // [theme.breakpoints.between("sm", "md")]: {
    //   padding: "50px 150px 150px 185px", // Medium screens
    //   backgroundColor: "lightblue",
    // },
    // [theme.breakpoints.down("sm")]: {
    //   padding: "32px 16px 16px 37px", // Small screens
    //   backgroundColor: "blue",
    // },
  },
  ListYourBoatandEarnMoney: {
    // fontFamily: "Poppins",
    fontSize: "clamp(14px, 4vw, 38px)",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
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
      "& $left_arr": {
        filter: "brightness(0) invert(1)", // Change image color on hover
      },
    },
    // backgroundColor: "red",
  },
  get_action_txt: {
    // fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#026b93",
  },

  boat_doc: {
    // backgroundColor: "red",
    width: "100%",
    minWidth: "50%",
    paddingLeft: "16px",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "30px",
      width: "100%",
      // backgroundColor: "yellow",
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: "50px",
      width: "80%",
      minWidth: "50%",
      // backgroundColor: "red",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "60px",
      width: "70%",
      // backgroundColor: "green",
    },
  },

  doc_title_txt: {
    // fontFamily: "Poppins",
    fontSize: "clamp(10px, 2.7vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.53,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },
  doc_sub_title_txt: {
    // fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 16px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    // lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.6)",
  },
  doc_img_div: {
    padding: "2.5% 1.5%",
    [theme.breakpoints.up("sm")]: {
      padding: "2.5% 1.5%",
    },
    [theme.breakpoints.up("md")]: {
      padding: "2.5% 1.5%",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "2.5% 1.5%",
    },
    borderRadius: "500px",
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "white",
    // backgroundColor: "red",
  },
  //
  add_boat_deatils1: {
    width: "clamp(63px, 15vw, 116px)", // Adjust the range as needed
    height: "clamp(56.5px, 11vh, 113px)", // Adjust the range as needed
  },
  //
  add_boat_deatils2: {
    width: "clamp(55px, 15vw, 115px)",
    height: "clamp(35px, 11vh, 106px)",
  },
  left_arr: {
    width: "22px",
    height: "15px",
    alignSelf: "center",
    marginLeft: "15px",
  },
  BestBoatOffers: {
    // fontFamily: "Poppins",
    fontSize: "clamp(14px, 5vw, 48px)",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
  },

  // leftArrContainer: {
  //   display: "inline-block",
  //   position: "relative",
  // },
  // normalImage: {
  //   width: 24, // Adjust the image size as needed
  //   height: 24, // Adjust the image size as needed
  //   transition: "opacity 0.3s",
  //   opacity: 1,
  // },
  // hoverImage: {
  //   opacity: 0,
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  // },
  // card: {
  //   maxWidth: 200, // Adjust the card width as needed
  // },
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
    add_boat_deatils1: {
      width: "clamp(21px, 15vw, 42px)", // Adjust the range as needed
      height: "clamp(19px, 8vh, 38px)", // Adjust the range as needed
      // backgroundColor: "yellow",

      [theme.breakpoints.up("sm")]: {
        width: "clamp(63px, 13vw, 76px)",
        height: "clamp(56.5px, 8vh, 113px)",
        // backgroundColor: "green",
      },
      [theme.breakpoints.up("md")]: {
        //
      },
      [theme.breakpoints.up("lg")]: {
        width: "clamp(63px, 15vw, 116px)",
        height: "clamp(56.5px, 11vh, 113px)",
        backgroundColor: "yellow",
      },
    },
    //

    add_boat_deatils2: {
      width: "clamp(27.5px, 15vw, 42px)",
      height: "clamp(17.5px, 8vh, 35px)",

      [theme.breakpoints.up("sm")]: {
        width: "clamp(63px, 13vw, 76px)",
        height: "clamp(56.5px, 8vh, 113px)",
        // backgroundColor: "green",
      },
      [theme.breakpoints.up("md")]: {
        // backgroundColor: "green",
      },
      [theme.breakpoints.up("lg")]: {
        width: "clamp(55px, 15vw, 115px)",
        height: "clamp(35px, 11vh, 106px)",
        backgroundColor: "yellow",
      },
    },
    left_arr: {
      width: "9px",
      height: "6px",
      alignSelf: "center",
      marginLeft: "10px",
    },
  },
}));
