import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";
import { StarRating } from "../../UI kit/5Star/StarRating";
import Imagebox from "../../Component/ImageBox/Imagebox";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderContent } from "../Common/map/HeaderContent";
import { useDispatch, useSelector } from "react-redux";
import { BoatDetailCard } from "../new/BoatDetailCard";
import { boat_list_filter } from "../../Service/api";
import { search_boat_id, single_boat_details_store } from "../../redux/slices";
import { toast } from "react-toastify";
import "./BoatOwnerDashBoard.css";
import { ArrowRight, ArrowRightAlt } from "@material-ui/icons";

const boatServices = [
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
  {
    service: "Toilet",
  },
  {
    service: "Wi-Fi",
  },
  {
    service: "Fishing Gear",
  },
  {
    service: "BBQ",
  },
  {
    service: "Hot Drinks",
  },
  {
    service: "Watersport Activities",
  },
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
];

export const BoatOwnerDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const [isLoading, setIsLoading] = useState("");
  const [boatListDataDetails, setBoatListDataDetails] = useState("");
  const [boatListData, setBoatListData] = useState([]);
  const dispatch = useDispatch();

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

  return (
    <>
      <div className="containerBody">
        <HeaderContent
          contentname1={"Home"}
          contentname2={"For Boat Owners"}
          contentname3={"For Boat Rentals"}
          contentname4={"My Listings"}
          handleBack={handleHeaderCallBack}
          search={"/searchBoat"}
          showLoginSignUp={auth?.AuthToken ? false : true}
          presentPage={"Home"}
        />

        <div className="TypographyContainer">
          <Typography className="subtitleTxt">
            List Your Boat and Earn Money{" "}
          </Typography>
          <Typography className="subtitleTxt subtitleTxt2">
            in 2 Steps
          </Typography>
        </div>
        <div className="docUploadContainer">
          <div className="doc_img">
            <img
              alt="add_file"
              src={IMAGES.ADD_FILES}
              className="addFilesIcon"
            />
          </div>
          <div className="docTextArea">
            <Typography className="uploadBoatDocTitleTxt">
              Upload your boat documentations
            </Typography>
            <Typography className="uploadBoatDocTxt">
              To ensure authenticity and build trust, we kindly request boat
              owners to upload their boat documents during the listing process.
            </Typography>
          </div>
        </div>
        <div className="boatDetailContainer">
          <div className="doc_img">
            <img
              alt="add_file"
              src={IMAGES.ADD_BOATE_DETAILS}
              className="addBoatDetial"
            />
          </div>
          <div className="docTextArea">
            <Typography className="uploadBoatDocTitleTxt">
              Add your boat's details
            </Typography>
            <Typography className="uploadBoatDocTxt">
              To attract potential guests, we suggest you to showcase your boat,
              its features, amenities, and unique qualities.
            </Typography>
          </div>
        </div>
        <div className="contentContainer">
          <Typography
            onClick={() => {
              navigate("/BoatOfferStep1");
              dispatch(single_boat_details_store(null));
            }}
            // style={styles.actionButton}
            className="actionButton"
          >
            List Your Boat Now
          </Typography>

          <ArrowRightAlt />
        </div>
        <Typography className="boatOfferTitle">
          Best Boat Offers This Week
        </Typography>
        <div
          style={{
            margin: `0px 100px 0px 100px`,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "center",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {boatListData?.map((item, index) => {
            // console.log("item", item?.boat_name);
            return (
              <div
                style={{
                  margin: "27.5px",
                }}
                onClick={() => {
                  navigate("/boatViewDetails");
                  // item?.boat_id

                  dispatch(search_boat_id(item?.boat_id));
                }}
              >
                <BoatDetailCard
                  boatName={item?.boat_name}
                  marine_city={item?.marine_city}
                  starRating={3}
                  pricePerHour={item?.price_per_hour}
                  priceCurrency={item?.price_currency}
                  boatMaxCapacity={item?.boat_max_capacity}
                />
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "100px" }}></div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: "100%",
  },
  appIcon: {
    width: "158px",
    height: "98px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    //
    // backgroundColor: "#f6f6f6",
    alignSelf: "flex-start",
    width: "100%",
    // backgroundColor: "yellow",
  },
  actionButton: {
    fontSize: 24,
    color: "#026b93",
    fontWeight: "600",
    borderColor: "#026b93",
    borderWidth: 2,
    borderRadius: "30px",
    borderStyle: "solid",
    padding: "10px 50px",
    cursor: "pointer",
    marginLeft: "65%",
    alignItems: "center",
    width: "25%",
    alignSelf: "center,",
    textAlign: "center",
  },
  titleOptionTxt: {
    fontSize: 16,
    color: "#424651",
    fontWeight: "500",
    cursor: "pointer",
  },
  pageTopContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  subtitleTxt: {
    fontSize: "38px",
    color: "#424651",

    // fontWeight: "500",
    // cursor: "pointer",
    textAlign: "center",
  },
  docUploadContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    // marginLeft: "10%",
  },
  uploadBoatDocTitleTxt: {
    fontSize: 25,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.53,
  },
  uploadBoatDocTxt: {
    marginTop: "20px",
    fontSize: 17,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "300",
    lineHeight: 1.53,
  },
  boatOfferTitle: {
    marginTop: "193px",
    fontSize: 48,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "center",
  },
  boatName: {
    fontSize: 20,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "left",
    // marginTop: "24px",
  },
  boatDrierName: {
    fontSize: 20,
    color: "rgba(66, 70, 81, 0.6)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    lineHeight: 1.5,
    textAlign: "left",
    marginTop: "8px",
  },
  boatprice: {
    fontSize: 18,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.5,
    textAlign: "left",
    marginLeft: "10px",
  },
  moneyIcon: {
    width: "28px",
    height: "30px",
  },
  groupIcon: {
    width: "33px",
    height: "25px",
    marginRight: "10px",
  },
};
