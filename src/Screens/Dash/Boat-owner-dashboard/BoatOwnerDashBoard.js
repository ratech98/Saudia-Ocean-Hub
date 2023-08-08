import { Grid, Typography } from "@mui/material";
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

export const BoatOwnerDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const [isLoading, setIsLoading] = useState("");
  const [boatListDataDetails, setBoatListDataDetails] = useState("");
  const [boatListData, setBoatListData] = useState([]);
  const dispatch = useDispatch();

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

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      if (auth?.AuthToken) {
        if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
          navigate("/boatOwnerDashBoard");
        } else {
          navigate("/rental");
        }
      } else {
        navigate("/");
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
      <div style={{ backgroundColor: "#f6f6f6" }}>
        <HeaderContent
          contentname1={"Home"}
          contentname2={"For Boat Owners"}
          contentname3={"For Boat Rentals"}
          contentname4={"My Listings"}
          handleBack={handleHeaderCallBack}
          search={"/searchBoat"}
          showLoginSignUp={auth?.AuthToken ? false : true}
          presentPage={"Home"}
          showline={false}
        />

        <Container>
          <div className="header-title">
            <Typography className="subtitleTxt">
              List Your Boat and Earn Money{" "}
            </Typography>
            <Typography className="subtitleTxt subtitleTxt2">
              in 2 Steps
            </Typography>
          </div>
          <div className="upload-boat-doc">
            <div className="doc-img">
              <img
                alt="add_file"
                src={IMAGES.ADD_FILES}
                className="add-file-icon"
              />
            </div>
            <div className="boat-doc">
              <Typography className="upload-boat-doc-title">
                Upload your boat documentations
              </Typography>
              <Typography className="upload-boat-doc-info">
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
                className="add-boat-detial"
              />
            </div>
            <div className="boat-doc">
              <Typography className="upload-boat-doc-title">
                Add your boat's details
              </Typography>
              <Typography className="upload-boat-doc-info">
                To attract potential guests, we suggest you to showcase your
                boat, its features, amenities, and unique qualities.
              </Typography>
            </div>
          </div>
          <div className="botton-align-right">
            <div className="boat-list-button">
              <Typography
                className="action-button"
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

              <ArrowRightAlt />
            </div>
          </div>
          <div className="boat-offers">
            <Typography className="boat-offer-title">
              Best Boat Offers This Week
            </Typography>
            <div className="align-card">
              {boatListData?.map((item, index) => {
                // console.log(
                //   "boatListData item",
                //   `http://localhost:3000/${item?.front_image}`
                // );
                return (
                  <div
                    // style={{
                    //   margin: "27.5px",
                    // }}
                    className="card-margin"
                    onClick={() => {
                      navigate("/boatViewDetails");
                      // item?.boat_id

                      dispatch(search_boat_id(item?.boat_id));
                    }}
                  >
                    <BoatDetailCard
                      profile_image={`http://localhost:3000/${item?.front_image}`}
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
          </div>
        </Container>

        <Footer />
      </div>
    </>
  );
};
