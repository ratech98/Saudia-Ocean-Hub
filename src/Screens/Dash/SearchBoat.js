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
import React, { useState } from "react";
import IMAGES from "../Images";
import Footer from "../../Component/Footer/Footer";
import Imagebox from "../../Component/ImageBox/Imagebox";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { Cancel } from "@material-ui/icons";

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
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedRate, setSelectedRate] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const class_program = [
    {
      name: "C++",
    },
    {
      name: "Java",
    },
    {
      name: "React",
    },
    {
      name: "HTML",
    },
  ];

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelection = (event, type) => {
    if (type === "course") {
      setSelectedCourse(event.target.value);
    } else if (type === "duration") {
      setSelectedDuration(event.target.value);
    } else if (type === "price") {
      setSelectedPrice(event.target.value);
    } else if (type === "rate") {
      setSelectedRate(event.target.value);
    }
  };
  return (
    <div style={styles.container}>
      <Container style={styles.headerContainer} maxWidth="100%">
        <div style={styles.contentContainer}>
          <div style={styles.headerLeftSide}>
            <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIcon} />
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              Home
            </Typography>
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              For Boat Owners
            </Typography>
            <Typography onClick={() => {}} style={styles.titleOptionTxt}>
              For Boat Rentals
            </Typography>
            <Typography
              onClick={() => {
                navigate("/myListings");
              }}
              style={styles.titleOptionTxt}
            >
              My Listings
            </Typography>
          </div>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",

              flex: 0.1,
            }}
          >
            <Typography
              onClick={() => {
                navigate("/logIn");
              }}
              style={styles.titleOptionTxt}
            >
              Log In
            </Typography>
            <Typography
              onClick={() => {
                navigate("/signUp");
              }}
              style={styles.titleOptionTxt}
            >
              Sign Up
            </Typography>
          </div>
        </div>
      </Container>

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
              variant="outlined"
              margin="normal"
              fullWidth
              id="course"
              name="course"
              placeholder="Course"
              value={selectedCourse || ""}
              onChange={(e) => {
                handleSelection(e, "course");
              }}
              select
              style={{ width: "100%" }}
              InputProps={{ style: textFieldStyles }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {class_program?.length > 0 ? (
                class_program?.map((item, index) => (
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
              variant="outlined"
              margin="normal"
              fullWidth
              id="duration"
              name="duration"
              placeholder="duration"
              value={selectedDuration}
              onChange={(e) => {
                handleSelection(e, "duration");
              }}
              select
              InputProps={{ style: textFieldStyles }}
              style={{ width: "60%" }}
            >
              {class_program?.length > 0 ? (
                class_program?.map((item, index) => (
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
              {class_program?.length > 0 ? (
                class_program?.map((item, index) => (
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
              variant="outlined"
              margin="normal"
              fullWidth
              id="rate"
              name="rate"
              placeholder="Rate"
              value={selectedRate}
              onChange={(e) => {
                handleSelection(e, "rate");
              }}
              select
              InputProps={{ style: textFieldStyles }}
              style={{ width: "90%" }}
            >
              {class_program?.length > 0 ? (
                class_program?.map((item, index) => (
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
        {false ? (
          <>
            <Imagebox />
            <Imagebox />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "50px 0px",
              }}
            >
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
              >
                Load more
              </Button>
            </div>
            <Footer />
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
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f6f6f6",
    width: "100%",
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
