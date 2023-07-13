import {
  Button,
  Container,
  Grid,
  IconButton,
  InputLabel,
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
import { Cancel } from "@material-ui/icons";
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

export const SearchBoat = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCapacity, setSelectedCapaticy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const auth = useSelector((state) => state?.auth);

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

  console.log("boatListData", boatListData);

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

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelection = (event, type) => {
    if (type === "type") {
      setSelectedType(event.target.value);
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
      navigate("/home");
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
      pageNo: boatListDataDetails?.currentpage + 1,
    };
    if (selectedType) {
      payload = {
        ...payload,
        type: selectedType,
      };
    }
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

      <div
        style={{
          marginTop: "50px",
          padding: "0% 11.5%",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CustomSearchTextField
            value={searchValue}
            // label="Search"
            variant="outlined"
            onChange={handleSearch}
            style={{ width: "70%" }}
            placeholder="Search"
          />
          {searchValue?.length > 0 ? (
            <IconButton
              onClick={() => {
                setSearchValue("");
              }}
            >
              <Cancel />
            </IconButton>
          ) : null}
          |
          <Button
            onClick={handleFilterSearch}
            variant="contained"
            style={{
              backgroundColor: "#3973a5",
              color: "white",
              width: "10%",
              height: "30px",
            }}
          >
            Find
          </Button>
        </div>
      </div>
      <div
        style={{
          marginTop: "50px",
          width: "100%",
          padding: "0% 11.5%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            // justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} sm={6} style={{ width: "100%" }}>
            <CustomTextField
              label={"Boat Type"}
              variant="outlined"
              margin="normal"
              fullWidth
              id="type"
              name="type"
              placeholder="type"
              value={selectedType}
              onChange={(e) => {
                handleSelection(e, "type");
              }}
              select
              style={{ width: "100%" }}
              InputProps={{ style: textFieldStyles }}
              InputLabelProps={{
                shrink: true,
              }}
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
              width: "100%",
              justifyContent: "center",
              display: "flex",
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
              style={{ width: "60%" }}
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
        </div>
        <div
          style={{
            // backgroundColor: "greenyellow",
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Grid item xs={12} sm={6} style={{ width: "100%" }}>
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
              style={{ width: "90%" }}
            >
              {boat_price?.length > 0 ? (
                boat_price?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key={"index"} value={"item?.label"}>
                  Diummy
                </MenuItem>
              )}
            </CustomTextField>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              width: "100%",
              display: "flex",
              // alignSelf: "flex-end",
              // alignContent: "flex-end",
              // alignItems: "flex-end",
              justifyContent: "flex-end",
              // backgroundColor: "red",
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
              style={{ width: "90%" }}
            >
              {boat_capacity?.length > 0 ? (
                boat_capacity?.map((item, index) => (
                  <MenuItem key={index} value={item?.name}>
                    {item?.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key={"index"} value={"item?.label"}>
                  Diummy
                </MenuItem>
              )}
            </CustomTextField>
          </Grid>
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        {boatListData?.length ? (
          <>
            <Imagebox imageBox={boatListData} />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px 0px",
              }}
            >
              {boatListDataDetails?.currentpage <
              boatListDataDetails?.totalPage ? (
                <Button
                  variant="outlined"
                  style={{
                    color: "#3973a5",
                    width: "10%",
                    height: "35px",
                    borderColor: "#3973a5",
                    borderWidth: "2px",
                    fontSize: 14,
                  }}
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
            <div
              style={{
                // marginTop: "100px",
                display: "flex",
                // alignSelf: "center",
                flexDirection: "column",
                // justifyContent: "center",
                // alignContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="no result"
                src={IMAGES.NO_RESULT}
                style={{ width: "139px", height: "139px" }}
              />
              <Typography
                style={{
                  marginTop: "50px",
                  fontFamily: "Poppins",
                  fontSize: "36px",
                  fontWeight: "600",
                  color: "rgba(66, 70, 81, 0.87)",
                }}
              >
                Sorry, no results found.
              </Typography>

              <Typography
                style={{
                  marginTop: "24px",
                  fontFamily: "Poppins",
                  fontSize: "36px",
                  fontWeight: "600",
                  color: "rgba(66, 70, 81, 0.45)",
                  width: "70%",
                  textAlign: "center",
                  marginBottom: "100px",
                }}
              >
                It looks like we couldn't find any boats that match your search
                Please try again.
              </Typography>
            </div>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
    // width: "100%",
    width: "100vw",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

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

    // fontWeight: "500",
    // cursor: "pointer",
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

const textFieldStyles = {
  borderRadius: "15px",
  borderWidth: ".1px",
  borderColor: "rgba(66, 70, 81, 0.2)",
};
