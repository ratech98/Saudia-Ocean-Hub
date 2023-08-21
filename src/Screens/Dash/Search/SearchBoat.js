import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IMAGES from "../../Images";
import Footer from "../../../Component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { LocationOn } from "@material-ui/icons";
import { HeaderContent } from "../../Common/map/HeaderContent";
import { useSelector } from "react-redux";
import { boat_list_filter } from "../../../Service/api";
import { BoatDetailCard } from "../Card/BoatDetailCard";
import { MiniLoader } from "../../Common/MiniLoader";
import { toast } from "react-toastify";
import CardLoader from "../../Common/CardLoader";
import { Container } from "react-bootstrap";
import "./SearchBoat.css";

const CustomTextField = withStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root": {
      borderColor: "rgba(66, 70, 81, 0.2)",
      borderWidth: ".5px",
      borderStyle: "solid",
      position: "relative",
    },
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
  },
  input: {
    padding: "10.5px 14px", // Add padding to align the placeholder correctly
  },
  select: {
    position: "absolute",
    top: "50%",
    right: "8px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
}))(TextField);

const CustomSearchTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

const boat_type = [
  {
    name: "Fishing Boats",
  },
  {
    name: "Houseboats",
  },
  {
    name: "Jet Boats",
  },
  {
    name: "Wakeboard/ Ski Boats",
  },
  {
    name: "Bowrider Boats",
  },
];

const boat_date = [
  {
    name: "July",
  },
  {
    name: "August",
  },
  {
    name: "September",
  },
  {
    name: "October",
  },
  {
    name: "November",
  },
];

const boat_price = [
  {
    name: ">=100",
  },
  {
    name: ">=300",
  },
  {
    name: ">=500",
  },
  {
    name: ">=700",
  },
  {
    name: ">=1000",
  },
];

const boat_capacity = [
  {
    name: ">=10",
  },
  {
    name: ">=50",
  },
  {
    name: ">=100",
  },
  {
    name: ">=150",
  },
  {
    name: ">=1200",
  },
];

export const SearchBoat = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [selectedBoatType, setSelectedBoatType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCapacity, setSelectedCapaticy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [boatListDataDetails, setBoatListDataDetails] = useState([]);
  const [boatListData, setBoatListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelection = (event, type) => {
    if (type === "boat_type") {
      setSelectedBoatType(event.target.value);
    } else if (type === "date") {
      setSelectedDate(event.target.value);
    } else if (type === "price") {
      setSelectedPrice(event.target.value);
    } else if (type === "capacity") {
      setSelectedCapaticy(event.target.value);
    }
  };

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

  const handleLoadMore = () => {
    let payload = {
      pageNo: boatListDataDetails?.currentpage + 1,
    };
    boat_list_filter(auth?.AuthToken, payload)
      .then((res) => {
        console.log("res", res?.data);
        if (res?.data?.message === "success") {
          setBoatListDataDetails(res?.data);
          setBoatListData(boatListData?.concat(res?.data?.parameters));
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleFilterSearch = () => {
    setIsLoading(true);
    let payload = {
      pageNo: 1,
    };
    if (selectedBoatType) {
      payload = {
        ...payload,
        boat_type: selectedBoatType,
      };
    }
    if (selectedPrice) {
      payload = {
        ...payload,
        price: selectedPrice,
      };
    }
    if (selectedCapacity) {
      payload = {
        ...payload,
        capacity: selectedCapacity,
      };
    }
    // if (selectedDate) {
    //   payload = {
    //     ...payload,
    //     type: selectedDate,
    //   };
    // }
    boat_list_filter(auth?.AuthToken, payload)
      .then((res) => {
        console.log("boat_list_filter res", res?.data);
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
        presentPage={"/searchBoat"}
      />
      <div className="full-container">
        <Container
        // style={{
        //   padding: 0,
        //   margin: 0,
        //   width: "100%",
        //   backgroundColor: "Scrollbar",
        // }}
        >
          <div className="inside-search-style">
            <div className="search-text-box">
              <LocationOn />
              <CustomSearchTextField
                value={searchValue}
                variant="outlined"
                onChange={handleSearch}
                style={{
                  width: "100%",
                }}
                placeholder="Search"
                inputProps={{
                  style: styles.searchTxt,
                }}
              />
            </div>
            <div className="search-btn">
              {searchValue?.length > 0 ? (
                <IconButton
                  onClick={() => {
                    setSearchValue("");
                  }}
                  style={{ alignSelf: "center" }}
                >
                  <img
                    alt="cancel"
                    src={IMAGES.CANCEL}
                    className="cancel-icon"
                  />
                </IconButton>
              ) : (
                <div style={{ width: "40px" }} />
              )}
              <div className="straight-line" />
              <Button
                onClick={handleFilterSearch}
                variant="contained"
                className="btn"
              >
                Find
              </Button>
            </div>
          </div>

          <div className="suggestion-box-content">
            <Grid item xs={12} sm={6} style={{ width: "40%" }}>
              <CustomTextField
                label={"Trip / Watersport Types"}
                variant="outlined"
                margin="normal"
                fullWidth
                id="boat_type"
                name="boat_type"
                placeholder="Trip / Watersport Types"
                value={selectedBoatType}
                onChange={(e) => {
                  handleSelection(e, "boat_type");
                }}
                select
                InputProps={{
                  style: {
                    ...textFieldStyles,
                  },
                }}
                style={{ width: "100%" }}
              >
                {boat_type?.length > 0 ? (
                  boat_type?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key={"index"} value={"item?.label"}>
                    Dummy
                  </MenuItem>
                )}
              </CustomTextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                width: "20%",
                marginLeft: "50px",
              }}
            >
              <CustomTextField
                label={"Date"}
                variant="outlined"
                margin="normal"
                fullWidth
                id="date"
                name="date"
                placeholder="date"
                value={selectedDate}
                onChange={(e) => {
                  handleSelection(e, "date");
                }}
                select
                InputProps={{ style: textFieldStyles }}
                style={{ width: "80%" }}
              >
                {boat_date?.length > 0 ? (
                  boat_date?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key={"index"} value={"item?.label"}>
                    Dummy
                  </MenuItem>
                )}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} style={{ width: "20%" }}>
              <CustomTextField
                label={"Price"}
                variant="outlined"
                margin="normal"
                fullWidth
                id="price"
                name="price"
                placeholder="price"
                value={selectedPrice}
                onChange={(e) => {
                  handleSelection(e, "price");
                }}
                select
                InputProps={{ style: textFieldStyles }}
                style={{ width: "85%" }}
              >
                {boat_price?.length > 0 ? (
                  boat_price?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key={"index"} value={"item?.label"}>
                    Dummy
                  </MenuItem>
                )}
              </CustomTextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                width: "20%",
              }}
            >
              <CustomTextField
                label={"Capacity"}
                variant="outlined"
                margin="normal"
                fullWidth
                id="capacity"
                name="capacity"
                placeholder="capacity"
                value={selectedCapacity}
                onChange={(e) => {
                  handleSelection(e, "capacity");
                }}
                select
                InputProps={{ style: textFieldStyles }}
                style={{ width: "100%" }}
              >
                {boat_capacity?.length > 0 ? (
                  boat_capacity?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key={"index"} value={"item?.label"}>
                    Dummy
                  </MenuItem>
                )}
              </CustomTextField>
            </Grid>
          </div>
          <div className="boat-list">
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                  height: "auto",
                }}
              >
                <CardLoader />
              </div>
            ) : (
              <>
                {boatListData?.length ? (
                  <>
                    <div className="align-card">
                      {boatListData?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="boat-card"
                            onClick={() => {
                              navigate("/boatViewDetails");
                            }}
                          >
                            <BoatDetailCard
                              profile_image={`http://localhost:3000/${item?.front_image}`}
                              boatName={item?.boat_name}
                              marine_city={item?.marine_city}
                              starRating={3}
                              priceCurrency={item?.price_currency}
                              pricePerHour={item?.price_per_hour}
                              boatMaxCapacity={item?.boat_max_capacity}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div style={styles.loadMoreStyle}>
                      {boatListDataDetails?.currentpage <
                      boatListDataDetails?.totalPage ? (
                        <Button
                          variant="outlined"
                          style={styles.loadMoreTxt}
                          onClick={() => {
                            handleLoadMore();
                          }}
                        >
                          Load more
                        </Button>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={styles.noDataContent}>
                      <img
                        alt="no result"
                        src={IMAGES.NO_RESULT}
                        style={styles.noResultImg}
                      />
                      <Typography style={styles.sryTxt}>
                        Sorry, no results found.
                      </Typography>

                      <Typography style={styles.noResultTxt}>
                        It looks like we couldn't find any boats that match your
                        search Please try again.
                      </Typography>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

const textFieldStyles = {
  borderRadius: "13px",
  borderWidth: ".1px",
  borderColor: "rgba(66, 70, 81, 0.2)",
  backgroundColor: "white",
};
const styles = {
  searchTxt: {
    fontSize: "16px",
    fontFamily: "Poppins",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.46,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
  },
  searchBtnStyle: {
    display: "flex",
    width: "30%",
    justifyContent: "space-between",
  },
  cancelIcon: {
    width: "31px",
    height: "31px",
  },
  btnStyle: {
    backgroundColor: "#3973a5",
    color: "white",
    width: "50%",
    height: "50px",
    alignSelf: "center",
  },
  suggestionBoxContent: {
    display: "flex",
    // margin: "24px 160px 0px",
    margin: "24px 140px 0px",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    width: "100%",
  },
  contentContainer: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    margin: "0px 24px",
    // backgroundColor: "green",
  },
  appIcon: {
    width: "158px",
    height: "98px",
  },
  titleOptionTxt: {
    fontSize: 16,
    color: "#424651",
    fontWeight: "500",
    cursor: "pointer",
  },
  headerLeftSide: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
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
  },

  pageTopContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
  subtitleTxt: {
    fontSize: "28px",
    color: "#424651",
    textAlign: "center",
  },
  docUploadContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    marginLeft: "10%",
  },
  uploadBoatDocTitleTxt: {
    fontSize: 30,
    color: "rgba(66, 70, 81, 0.87)",
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 1.53,
  },
  uploadBoatDocTxt: {
    marginTop: "20px",
    fontSize: 20,
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
  straightLine: {
    backgroundColor: "rgba(66, 70, 81, 0.7)",
    width: "1px",
    height: "70px",
  },
  noDataContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
    alignItems: "center",
  },
  noResultImg: {
    width: "139px",
    height: "139px",
  },
  sryTxt: {
    marginTop: "50px",
    fontFamily: "Poppins",
    fontSize: "36px",
    fontWeight: "600",
    color: "rgba(66, 70, 81, 0.87)",
  },
  noResultTxt: {
    marginTop: "24px",
    fontFamily: "Poppins",
    fontSize: "36px",
    fontWeight: "600",
    color: "rgba(66, 70, 81, 0.45)",
    width: "70%",
    textAlign: "center",
    marginBottom: "100px",
  },
  loadMoreStyle: {
    display: "flex",
    justifyContent: "center",
    margin: "50px 0px",
  },
  loadMoreTxt: {
    color: "#3973a5",
    width: "10%",
    height: "35px",
    borderColor: "#3973a5",
    borderWidth: "2px",
    fontSize: 14,
  },
};
