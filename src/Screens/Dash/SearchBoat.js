import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";
import Imagebox from "../../Component/ImageBox/Imagebox";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { LocationOn } from "@material-ui/icons";
import { HeaderContent } from "../Common/map/HeaderContent";
import { useSelector } from "react-redux";
import { boat_list_filter } from "../../Service/api";

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

  useEffect(() => {
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
      })
      .catch((err) => {
        console.log("error", err);
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
      navigate("/boatOwnerDashBoard");
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "Boat Offers") {
      //   navigate("/home");
    } else if (name === "My Listings") {
      navigate("/myListings");
    } else if (name === "List a Boat Offer") {
      // navigate("/home");
    } else {
      navigate(name);
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
        console.log("res", res?.data);
        if (res?.data?.message === "success") {
          setBoatListDataDetails(res?.data);
          setBoatListData(res?.data?.parameters);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div style={styles.container}>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Boat Owners"}
        contentname3={"My Listings"}
        contentname4={"List a Boat Offer"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={auth?.AuthToken ? false : true}
      />

      <div style={styles.searchBarStyle}>
        <div style={styles.insideSearchStyle}>
          <div style={styles.locationAndTxtStyle}>
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
          <div style={styles.searchBtnStyle}>
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
                  style={styles.cancelIcon}
                />
              </IconButton>
            ) : (
              <div style={{ width: "40px" }} />
            )}
            <div style={styles.straightLine} />
            <Button
              onClick={handleFilterSearch}
              variant="contained"
              style={styles.btnStyle}
            >
              Find
            </Button>
          </div>
        </div>
      </div>
      <div style={{ ...styles.suggestionBoxContent }}>
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
      <div
        style={{
          margin: "0px",
          // backgroundColor: "red",
          // display: "flex",
          // flexDirection: "column",
          // alignSelf: "center",
          // alignItems: "center",
          // justifyContent: "center",
          // alignContent: "center",
          // display: "flex",
          // width: "100%",
        }}
      >
        {boatListData?.length ? (
          <>
            <Imagebox imageBox={boatListData} />

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
                It looks like we couldn't find any boats that match your search
                Please try again.
              </Typography>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

const textFieldStyles = {
  borderRadius: "13px",
  borderWidth: ".1px",
  borderColor: "rgba(66, 70, 81, 0.2)",
  backgroundColor: "white",
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
    // width: "100%",
    width: "100vw",
  },
  searchBarStyle: {
    display: "flex",
    margin: "0px 140px 0px",
  },
  insideSearchStyle: {
    display: "flex",
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    padding: "17.5px 100px 17.5px 97px",
    borderRadius: "5px",
  },
  locationAndTxtStyle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
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
