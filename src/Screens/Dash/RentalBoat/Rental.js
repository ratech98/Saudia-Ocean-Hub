import React, { useEffect, useState } from "react";

import { Search } from "@material-ui/icons";
import { toast } from "react-toastify";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IconButton, Typography } from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

import Boat_Experience from "../../../assets/Images/removeable/Boating_Experience.png";
import Footer from "../../../Component/Footer/Footer";
import { BoatDetailCard } from "../Card/BoatDetailCard";
import { boat_list_filter } from "../../../Service/api";
import { search_boat_id } from "../../../redux/slices";
import { PageHeader } from "../page-header/PageHeader";
// import "./Rental.css";
import IMAGES from "../../Images";

const boatListData = [
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

const styles = (theme) => ({
  root: {
    "& input::placeholder": {
      fontSize: "clamp(10px, 3vw, 24px)",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
    [theme.breakpoints.down("767")]: {
      "& input::placeholder": {
        fontSize: "18px",
      },
    },
    [theme.breakpoints.down("424")]: {
      "& input::placeholder": {
        fontSize: "10px",
      },
    },
  },
});

const CustomTextField = withStyles(styles)(TextField);

export const Rental = () => {
  // const class_name = useStyles();
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const link1 = "Boat Offers";
  const link2 = "Scuba Courses/Programs";
  const link3 = "Scuba Diving Trips";
  const [boatListDataDetails, setBoatListDataDetails] = useState("");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [extraInputValue, setExtraInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleExtraInputChange = (event) => {
    setExtraInputValue(event.target.value);
  };

  // API call
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
          // setBoatListData(res?.data?.parameters);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  }, []);

  // calculate window dimensions  && block back btn
  useEffect(() => {
    if (auth?.AuthToken) {
      const blockBackButton = (e) => {
        e.preventDefault();
        navigate(location.pathname);
      };
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener("popstate", blockBackButton);
      return () => {
        window.removeEventListener("popstate", blockBackButton);
      };
    }

    // Function to update the window dimensions
    function handleResize() {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
    // Attach the event listener
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [auth?.AuthToken, location.pathname, navigate]);

  // all click naviagtion
  const handle_navigation = (selected_page) => {
    toast.dismiss();
    console.log("handle_navigation pageName", selected_page);
    if (selected_page === "Home") {
      // if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
      //   navigate("/boatOwnerDashBoard");
      // } else {
      //   navigate("/rental");
      // }
    } else if (selected_page === "rental") {
      navigate("/rental");
    } else if (selected_page === "SignUp") {
      navigate("/userChoice");
    } else if (selected_page === "Login") {
      navigate("/login");
    } else {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className={class_name.rental_page}>
      {/* outSide header */}
      <div className={class_name.show_rental_header_outSide_banner}>
        <PageHeader
          showLoginSignUp={!auth?.AuthToken}
          handle_navigation={handle_navigation}
          presentPage={"Home"}
          link1={link1}
          link2={link2}
          link3={link3}
        />
      </div>

      {/* ================================================== banner ================================================== */}

      {/* header & content */}

      <div
        fluid
        className={class_name?.rental_banner}
        style={{
          height: windowWidth >= 768 ? windowHeight : "auto",
        }}
      >
        <div className={class_name.banner_inner_box} style={{}}>
          {/* inside header */}
          <div className={class_name.show_rental_header_inside_banner}>
            <PageHeader
              showLoginSignUp={!auth?.AuthToken}
              handle_navigation={handle_navigation}
              presentPage={"Home"}
              link1={link1}
              link2={link2}
              link3={link3}
            />
          </div>

          {/* banner txt content */}
          <div className={class_name.banner_inside_content}>
            <Container className={class_name.banner_txt_search_content}>
              <Container
                className="container-sm"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography className={class_name.welcome_txt}>
                  {"Best Boating Experience in Saudi Arabia"}
                </Typography>
                <div className={class_name.search}>
                  <CustomTextField
                    className={class_name.text_fileds}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="email"
                    placeholder="Search for a city"
                    // value={searchText}
                    // onChange={}

                    InputProps={{
                      disableUnderline: true,
                      style: {
                        margin: "0",
                        padding: "0",
                        width: "100%",
                      },
                      endAdornment: (
                        <>
                          <IconButton>
                            <Search
                              style={{}}
                              className={class_name.search_img_font}
                            />
                          </IconButton>
                        </>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      className: class_name.text_field_inputs,
                      style: {},
                    }}
                  />
                </div>
              </Container>
            </Container>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#f6f6f6" }}>
        {/* ================================================== boat card ================================================== */}
        <Container
          // fluid
          className={class_name.boat_list_container}
        >
          <div className={class_name.boat_Offers_title}>
            <Typography className={class_name.boat_Offers_txt}>
              Discover Some Boat Offers
            </Typography>
            <Typography className={class_name.show_more_txt}>
              show more
            </Typography>
          </div>

          <div className={class_name.show_boat_cards_container}>
            <div className={class_name.show_boar_cards} style={{}}>
              {boatListData?.map((item, index) => {
                return (
                  <div
                    className={class_name.boat_card_space}
                    onClick={() => {
                      navigate("/boatViewDetails");
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
                      profile_image={item?.profile_image}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Container>

        {/* ================================================== circle design ================================================== */}
        <Container className={class_name.circle_design_container}>
          <div className={class_name.seperate_container_box1} style={{}}>
            <div style={{}} className={class_name.circle_box}>
              <div className={class_name.bigCircle}>
                <Typography className={class_name.bigCircleInsideTxt}>
                  Over 900 boat
                  <Typography className={class_name.bigCircleInsideTxt}>
                    trips done
                  </Typography>
                  <Typography className={class_name.bigCircleInsideTxt}>
                    through us
                  </Typography>
                </Typography>
              </div>
            </div>
            <div className={class_name.reviews_info_box} style={{}}>
              <Typography className={class_name.reviews_info_title}>
                Real reviews from happy customers!
              </Typography>
              <Typography className={class_name.marketing_label}>
                Join Our Trusted Community. Our satisfied customers have
                embarked on more than 900 incredible boat trips with us.
                Experience the joy of smooth sailing, breathtaking views, and
                unforgettable moments on the water. Book your dream boat trip
                today and become a part of our growing community of happy
                adventurers.
              </Typography>
            </div>
          </div>

          <div style={{}} className={class_name.seperate_container_box2}>
            <div style={{}} className={class_name.circle_content_box}>
              <div style={{}} className={class_name.circle_row}>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.PROFILE_ICON}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat1}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat3}
                    className={class_name.picture_style}
                  />
                </Col>
              </div>
              <div className={class_name.middle_circle_row}>
                <Col xs={4} className="p-0">
                  <img
                    alt="ellipse"
                    src={IMAGES?.subaDiving}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col xs={4} className="p-0">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat1}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col xs={4} className="p-0">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat2}
                    className={class_name.picture_style}
                  />
                </Col>
              </div>
              <div style={{}} className={class_name.circle_row}>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat4}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat2}
                    className={class_name.picture_style}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <img
                    alt="ellipse"
                    src={IMAGES?.boat3}
                    className={class_name.picture_style}
                  />
                </Col>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  rental_page: {
    backgroundColor: "#f6f6f6",
    height: "100%",
    flexGrow: 1,
  },
  show_rental_header_outSide_banner: {
    display: "none",
  },
  rental_banner: {
    width: "100%",
    height: "auto",
    minHeight: "300px",
    position: "sticky",
    backgroundImage: `url(${Boat_Experience})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    /* Flex properties to center content */
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  banner_inner_box: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },

  banner_txt_search_content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // width: "50%",
    // backgroundColor: "green",
  },

  welcome_txt: {
    // fontFamily: "Poppins",
    fontSize: "clamp(16px, 4vw, 48px)",
    fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    width: "70%",
    height: "auto",
    color: "rgba(66, 70, 81, 1)",
    // backgroundColor: "red",
  },
  search: {
    padding: "52px 0px 0px 0px",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "rebeccapurple",
  },

  text_fileds: {
    margin: "0px",
    borderRadius: "5px",
    /* width: 45%; */
    backgroundColor: "white",
    border: "none",
    padding: "0px 60px 0px 0px",
    paddingRight: ({ min, max, unit }) =>
      `clamp(${min}${unit}, calc(${min}${unit} + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300))), ${max}${unit})`,
  },

  search_img_font: {
    fontSize: "clamp(26px, 4vw, 42px)",
  },

  text_field_inputs: {
    fontSize: "clamp(12px, 3vw, 24px)",
    fontFamily: "Poppins",
    color: "#424651",
    // margin: "30px 0px 30px 60px",
    padding: ({ min, max, unit }) =>
      `clamp(${min}${unit}, calc(${min}${unit} + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300))), ${max}${unit})`,
    border: "none",
    borderRadius: "5px",
    height: "25px",
    // backgroundColor: "red",
  },
  show_rental_header_inside_banner: {
    width: "100%",
    display: "flex",
  },
  banner_inside_content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: "static",
    width: "100%",
    height: "100%",
  },

  boat_list_container: {
    padding: "80px 0px",
    // backgroundColor: "lightgreen",
  },
  boat_Offers_title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "32px 0px",
    // backgroundColor: "lightyellow",
  },
  boat_Offers_txt: {
    fonFamily: "Poppins",

    fontSize: "clamp(16px, 4vw, 38px)",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.74,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.87)",
  },

  show_more_txt: {
    fonFamily: "Poppins",
    fontSize: "clamp(12px, 3vw, 24px)",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.74,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.6)",
  },

  show_boat_cards_container: {
    width: "100%",
    overflowX: "auto",
    padding: "0px",
    /* background-color: black; */
    margin: "0px",
  },

  boat_card_space: {
    margin: "27.5px",
    [theme.breakpoints.up("sm")]: {
      margin: "10px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "27.5px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "27.5px",
    },
  },

  show_boar_cards: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "0px",
    padding: "0px",
  },

  circle_design_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: "150px 0px",
    height: "100%",
    // backgroundColor: "pink",
    // margin: "10% 0",
  },
  seperate_container_box1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "70%",
    // margin: "1%",
    height: "100%",
    // backgroundColor: "black",
    // backgroundColor: "pink",
  },

  circle_box: {
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "lightgreen",
  },

  bigCircle: {
    display: "flex",
    width: "fit-content",
    padding: "20% 15%",
    objectFit: "contain",
    backgroundImage: `linear-gradient(
      132deg,
      rgba(57, 115, 165, 0.1) 29%,
      rgba(57, 115, 165, 0.2) 53%,
      rgba(57, 115, 165, 0.3) 66%,
      rgba(57, 115, 165, 0.4) 77%
    )`,
    borderRadius: "50%",
    // backgroundColor: "red",
  },

  bigCircleInsideTxt: {
    // fontFamily: "Poppins",
    fontSize: "clamp(14px, 2.5vw, 38px)", //  600px,750px,1000px Adjust the range as needed
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.87)",
  },

  reviews_info_box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  reviews_info_title: {
    // fontFamily: "Poppins",
    fontSize: "clamp(12px, 3vw, 28px)", // Adjust the range as needed
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.53,
    letterSpacing: "normal",
    textAlign: "center",
    color: "var(--charcoal-grey-87)",
    width: "100%",
    // backgroundColor: "red",
  },

  marketing_label: {
    fontFamily: "Poppins",
    fontSize: "clamp(10px, 1.2vw, 20px)", // Adjust the range as needed
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "rgba(66, 70, 81, 0.6)",
  },

  seperate_container_box2: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // backgroundColor: "lightsalmon",
    padding: "10px",
  },
  circle_content_box: {
    // backgroundColor: "gainsboro",
    display: "flex",
    flexDirection: "column",
  },
  circle_row: {
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // borderRadius: "30%",
    padding: "28px 0px",
  },
  middle_circle_row: {
    display: "flex",
    flexDirection: "row",
    // backgroundImage: "green",
  },
  picture_style: {
    width: "clamp(80px, 13vw, 180px)", // Adjust the range as needed
    height: "clamp(80px, 13vw, 180px)", // Adjust the range as needed
    border: "solid 0.5px rgba(112, 112, 112, 0.3)",
    borderRadius: "150px",
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
    rental_page: {
      // backgroundColor: "#f6f6f6",
      // backgroundColor: "red",
      height: "100%",
      // flexGrow: 1,
    },
    show_rental_header_outSide_banner: {
      display: "flex",
    },
    rental_banner: {
      width: "100%",
      height: "100%",
      minHeight: "300px",
      position: "sticky",
      backgroundImage: `url(${require("../../../assets/Images/Boating_Experience.png")})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      /* Flex properties to center content */
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      // justifyContent: "space-between",
      alignItems: "center",
      // backgroundColor: "red",
    },

    show_rental_header_inside_banner: {
      width: "100%",
      display: "none",
    },
    banner_inner_box: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",

      // margin: "0px",
      // padding: "9% 0px",
      // backgroundColor: "yellow",
    },
    banner_inside_content: {
      // display: "flex",
      // justifyContent: "center",
      // flexDirection: "column",
      // position: "static",
      // width: "100%",
      // height: "100%",
      // maxHeight: "10%",
      // padding: "10% 0",
      // backgroundColor: "red",
    },

    show_boat_cards_container: {
      width: "100%",
      overflowX: "auto",
      padding: "0px",
      // backgroundColor: "black",
      margin: "0px",
      padding: "30px",
    },

    show_boar_cards: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexWrap: "nowrap",
      margin: "0px",
      padding: "0px",
    },

    boat_card_space: {
      margin: "10px",
      [theme.breakpoints.up("sm")]: {
        margin: "20px",
      },
      [theme.breakpoints.up("md")]: {
        margin: "27.5px",
      },
      [theme.breakpoints.up("lg")]: {
        margin: "27.5px",
      },
    },

    circle_design_container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "0px",
      height: "auto",
      // backgroundColor: "lightblue",
    },
    seperate_container_box1: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
      margin: "0px",
      // height: "100%",
      height: "auto",
      // height: "fit-content",
      // backgroundColor: "lightblue",
      // margin: "1%",
    },

    seperate_container_box2: {
      display: "flex",
      flexDirection: "column",
      // alignItems: "center",
      justifyContent: "center",
      width: "100%",
      // backgroundColor: "lightsalmon",
      padding: "10px",
    },

    marketing_label: {
      display: "none",
    },
    circle_content_box: {
      // backgroundColor: "gainsboro",
      display: "flex",
      flexDirection: "column",
    },
    circle_row: {
      // backgroundColor: "red",
      display: "flex",
      flexDirection: "row",
      padding: "5%",
    },
    picture_style: {
      width: "clamp(80px, 20vw, 140px)", // Adjust the range as needed
      height: "clamp(80px, 20vw, 140px)", // Adjust the range as needed
      border: "solid 0.5px rgba(112, 112, 112, 0.3)",
      borderRadius: "150px",
      // backgroundColor: "red",
    },
  },
}));
