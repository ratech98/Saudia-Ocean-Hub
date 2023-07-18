import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { HeaderContent } from "../Common/map/HeaderContent";
import Footer from "../../Component/Footer/Footer";
import IMAGES from "../Images";
import { Edit, Room } from "@material-ui/icons";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import { withStyles } from "@mui/styles";

const start_space_Validation = new RegExp(/^(?!\s).*/);

const CustomTextField = withStyles({
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
  select: {
    position: "absolute",
    top: "50%",
    right: "8px",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
})(TextField);

export const BoatBookingRequest = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedStartTime, setSelectedStartTime] = useState(0);
  const [selecteHowLongSpendTime, setSelecteHowLongSpendTime] = useState(0);
  const [selecteNoOfAdultes, setSelecteNoOfAdultes] = useState(1);
  const [selecteNoOfSeniors, setSelecteNoOfSeniors] = useState(1);
  const [selecteNoOfChildren, setSelecteNoOfChildren] = useState(1);
  const [selecteNoOfInfants, setSelecteNoOfInfants] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  const handleCallBack = (name) => {
    if (name === "Home") {
      navigate("/home");
    } else if (name === "Boat Offers") {
    } else if (name === "My Listings") {
    } else if (name === "List a Boat Offer") {
    }
  };

  const renderDateSelection = (date, index) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 27px",
          borderRadius: "20px",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "24px",
          marginTop: "32px",
          border: "solid 1px rgba(66, 70, 81, 0.36)",
          backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          SAT
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div>
    );
  };

  const renderStartTime = (time, index) => {
    return (
      <div
        style={{
          display: "flex",
          padding: "11px 37px",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "24px",
          marginTop: "32px",
          border: "solid 1px rgba(66, 70, 81, 0.36)",
          backgroundColor: selectedStartTime === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          setSelectedStartTime(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            color: selectedStartTime === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          8 PM
        </Typography>
      </div>
    );
  };

  const renderHowLongSpendTime = (time, index) => {
    return (
      <div
        style={{
          display: "flex",
          padding: "11px 37px",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginRight: "24px",
          marginTop: "32px",
          border: "solid 1px rgba(66, 70, 81, 0.36)",
          backgroundColor:
            selecteHowLongSpendTime === index ? "#4f82af" : "white",
          width: "30%",
        }}
        onClick={() => {
          setSelecteHowLongSpendTime(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            color: selecteHowLongSpendTime === index ? "white" : "#424651",
            width: "100%",
            textAlign: "center",
          }}
        >
          {time?.data}
        </Typography>
      </div>
    );
  };

  return (
    <>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Boat Offers"}
        contentname3={"My Listings"}
        contentname4={"List a Boat Offer"}
        handleBack={handleCallBack}
      />
      <div style={styles.container}>
        <Typography style={styles.titleTxt}>
          You're close to booking your most enjoyable experience ever!
        </Typography>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "row",
            // backgroundColor: "green",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Container
            style={{
              margin: "0px",
              width: "65%",
              padding: "56px 57px",
              backgroundColor: "white",
            }}
          >
            <div style={{ ...styles.rowStyle, marginTop: "0px" }}>
              <Typography style={styles.contentTitleTxt}>
                Personal Information
              </Typography>
              <IconButton style={{ marginLeft: "64px" }}>
                <Edit />
              </IconButton>
            </div>
            <div style={{ ...styles.rowStyle, marginTop: "40px" }}>
              <Typography style={styles.lableTxt}>Name</Typography>
              <Typography style={styles.personInfoTxt}>
                Omar Abdallah
              </Typography>
            </div>
            <div style={styles.rowStyle}>
              <Typography style={styles.lableTxt}>City</Typography>
              <Typography style={styles.personInfoTxt}>Riyadh, KSA</Typography>
            </div>
            <div style={styles.rowStyle}>
              <Typography style={styles.lableTxt}>Phone</Typography>
              <Typography style={styles.personInfoTxt}>62 188 7922</Typography>
            </div>
            <div style={styles.rowStyle}>
              <Typography style={styles.lableTxt}>E-mail</Typography>
              <Typography style={styles.personInfoTxt}>
                OmarAbdallah@gmail.com
              </Typography>
            </div>
            <div style={{ ...styles.rowStyle, marginTop: "116px" }}>
              <Typography style={styles.contentTitleTxt}>
                Select Date -
              </Typography>
              <Typography style={{ ...styles.lableTxt, marginLeft: "71px" }}>
                {moment().format("MMMM YYYY")}
              </Typography>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {dateList?.map((item, index) => {
                return renderDateSelection(item, index);
              })}
            </div>
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "48px" }}
            >
              <Typography style={styles.contentTitleTxt}>
                Select Time To Start Your Endless Fun
              </Typography>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {dateList?.map((item, index) => {
                  return renderStartTime(item, index);
                })}
              </div>
            </div>

            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "48px" }}
            >
              <Typography style={styles.contentTitleTxt}>
                How Long Do You Want To Have Fun On This Boat
              </Typography>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {howLongList?.map((item, index) => {
                  return renderHowLongSpendTime(item, index);
                })}
              </div>
            </div>
          </Container>

          <Container
            style={{
              margin: "0px",
              width: "34%",
              padding: "56px 57px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "5%",
                // backgroundColor: "red"
              }}
            >
              <Typography style={styles.contentTitleTxt}>youtube</Typography>
            </div>
          </Container>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "100%",
            padding: "50px 30px",
          }}
        >
          <Typography style={styles.contentTitleTxt}>
            How many of you want to make this day memorable day?
          </Typography>

          <div
            style={{
              marginTop: "61px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "10%", marginRight: "80px" }}
            >
              <InputLabel
                htmlFor="boatType"
                style={{
                  ...styles.personInfoTxt,
                  textAlign: "center",
                  // width: "50%",
                }}
              >
                Adults
              </InputLabel>
              <CustomTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Adults"
                name="Adults"
                placeholder="Adults"
                value={selecteNoOfAdultes}
                select
                InputProps={{ style: styles.dropDownBoxStyle }}
              >
                {Adults_options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                    onClick={() => setSelecteNoOfAdultes(item.id)}
                  >
                    {index + 1}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "10%", marginRight: "80px" }}
            >
              <InputLabel
                htmlFor="boatType"
                style={{
                  ...styles.personInfoTxt,
                  textAlign: "center",
                }}
              >
                Seniors
              </InputLabel>
              <CustomTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Seniors"
                name="Seniors"
                placeholder="Seniors"
                value={selecteNoOfSeniors}
                select
                InputProps={{ style: styles.dropDownBoxStyle }}
              >
                {Adults_options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                    onClick={() => setSelecteNoOfSeniors(item.id)}
                  >
                    {index + 1}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "10%", marginRight: "80px" }}
            >
              <InputLabel
                htmlFor="boatType"
                style={{
                  ...styles.personInfoTxt,
                  textAlign: "center",
                }}
              >
                Children
              </InputLabel>
              <CustomTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Children"
                name="Children"
                placeholder="Children"
                value={selecteNoOfChildren}
                select
                InputProps={{ style: styles.dropDownBoxStyle }}
              >
                {Adults_options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                    onClick={() => setSelecteNoOfChildren(item.id)}
                  >
                    {index + 1}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "10%", marginRight: "80px" }}
            >
              <InputLabel
                htmlFor="boatType"
                style={{
                  ...styles.personInfoTxt,
                  textAlign: "center",
                }}
              >
                Infants
              </InputLabel>
              <CustomTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="Infants"
                name="Infants"
                placeholder="Infants"
                value={selecteNoOfInfants}
                select
                InputProps={{ style: styles.dropDownBoxStyle }}
              >
                {Adults_options?.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={index + 1}
                    onClick={() => setSelecteNoOfInfants(item.id)}
                  >
                    {index + 1}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </div>
        </div>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            width: "100%",
            padding: "50px 30px",
          }}
        >
          <Typography style={styles.contentTitleTxt}>
            Special Requests
          </Typography>
          <CustomTextField
            margin="normal"
            fullWidth
            id="SpecialRequests"
            name="SpecialRequests"
            placeholder="Let the boat owner know anything you want him to pay an attention for to take care of you."
            value={specialRequests}
            multiline
            // maxRows={5}
            rows={7}
            onChange={(event) => {
              if (start_space_Validation.test(event.target.value)) {
                setSpecialRequests(event.target.value);
              }
            }}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 20,
                border: "solid 1px rgba(66, 70, 81, 0.36)",
                marginTop: "33px",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              fontSize: 16,
              fontFamily: "Poppins",
              color: "#424651",
              borderBottom: "none",

              backgroundColor: "#fff",
              border: "solid 1px rgba(66, 70, 81, 0.36)",
              // width: "50%",

              borderRadius: "10px",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    backgroundColor: "#f6f6f6",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "141px",
    paddingRight: "141px",
    paddingBottom: "160px",
    width: "100%",
    // height: "100vh",
  },
  titleTxt: {
    marginTop: "98px",
    fontFamily: "Poppins",
    fontSize: "30px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.77,
    letterSpacing: "normal",
    // textAlign: "center",
    color: "#424651",
  },
  contentTitleTxt: {
    // marginTop: "98px",
    fontFamily: "Poppins",
    fontSize: "22px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.05,
    letterSpacing: "normal",
    // textAlign: "center",
    color: "#424651",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: "center",
    alignItems: "center",
    marginTop: "24px",
  },
  lableTxt: {
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.15,
    letterSpacing: "normal",
    // textAlign: "center",
    color: "rgba(66, 70, 81, 0.6)",
    width: "50%",
    // backgroundColor: "red",
  },
  personInfoTxt: {
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.15,
    letterSpacing: "normal",
    // textAlign: "center",
    color: "#424651",
  },
  dropDownBoxStyle: {
    border: "solid 1px rgba(66, 70, 81, 0.36)",
    // width: "50%",
    marginTop: "25px",
    borderRadius: "10px",
  },
};

const dateList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

const howLongList = [
  { id: 1, data: "Less than 2 h" },
  { id: 2, data: "2 - 4 h" },
  { id: 3, data: "5 - 7 h" },
  { id: 4, data: "8 - 10 h" },
  { id: 5, data: "more than 10 h" },
];

const Adults_options = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];
