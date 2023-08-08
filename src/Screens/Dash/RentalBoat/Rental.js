import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Boat_Experience from "../../../assets/Images/removeable/Boating_Experience.png";
import Rentel_Ellipse from "../../../assets/Images/Rental_Ellipse.svg";
import Ellipse from "../../../assets/Images/Ellipse.svg";
import Banner from "../../../Component/Banner/Banner";
import Footer from "../../../Component/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BoatDetailCard } from "../Card/BoatDetailCard";
import { boat_list_filter } from "../../../Service/api";
import { search_boat_id } from "../../../redux/slices";

const link1 = "Boat Offers";
const link2 = "Scuba Courses/Programs";
const link3 = "Scuba Diving Trips";
const href1 = "#";
const href2 = "#";
const href3 = "#";
const num = "7";
const num1 = "2";
const showItem = false;
const showLogin = true;
const showProfile = false;

export const Rental = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state?.auth);
  const [extraInputValue, setExtraInputValue] = useState("");
  const [boatListData, setBoatListData] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [boatListDataDetails, setBoatListDataDetails] = useState("");

  const handleExtraInputChange = (event) => {
    setExtraInputValue(event.target.value);
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
  }, []);

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
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        backgroundColor: "#f6f6f6",
        // backgroundColor: "yellow",
      }}
    >
      <Banner
        backgroundImage={backgroundImage}
        title={title}
        showButton={showButton}
        titleStyle={titleStyle}
        className={className}
        backgroundColor={backgroundColor}
        opacity={opacity}
        inputStyle={inputStyle}
        showInput={showInput}
        extraInputValue={extraInputValue}
        handleExtraInputChange={handleExtraInputChange}
        presentPage={"Home"}
        homeBtn={"Home"}
        homeBtnHref={auth?.AuthToken ? "/rental" : "/"}
        link1={link1}
        link2={link2}
        link3={link3}
        showItem={showItem}
        href1={href1}
        href2={href2}
        href3={href3}
        showLogin={showLogin}
        showProfile={showProfile}
        num={num}
        num1={num1}
      />
      {/* <Container
        style={{
          paddingTop: 80,
          margin: 0,
          display: "flex",
          flex: 1,
          backgroundColor: "blue",
          width: "100%",
        }}
      > */}
      <div
        //   className="d-flex-1 justify-content-between"
        style={{
          //   backgroundColor: "red",
          display: "flex",
          flex: 1,
          paddingTop: 80,
          // width: window.innerWidth,
          paddingRight: 30,
          paddingLeft: 30,

          justifyContent: "space-between",
        }}
      >
        <h5
          style={{
            fontFamily: "Poppins",
            fontSize: 38,
            fontWeight: 600,
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 1.74,
            letterSpacing: "normal",
            textAlign: "left",
            color: "rgba(66, 70, 81, 0.87)",
          }}
        >
          Discover Some Boat Offers{" "}
        </h5>
        <h6
          style={{
            fontFamily: "Poppins",
            fontSize: 24,
            fontWeight: 500,
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: 2.75,
            letterSpacing: "normal",
            textAlign: "center",
            color: "rgba(66, 70, 81, 0.6)",
          }}
        >
          show more
        </h6>
      </div>
      {/* </Container> */}

      <div
        style={{
          // display: "flex",
          margin: "0px 0px",
          // backgroundColor: "red",
          // alignSelf: "center",
          // alignItems: "center",
          // justifyContent: "center",
          // alignContent: "center",
        }}
      >
        {/* <Imagebox imageBox={boatListData} /> */}
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
            return (
              <div
                style={{
                  margin: "27.5px",
                }}
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
                />
              </div>
            );
          })}
        </div>
      </div>
      <Container style={{}}>
        <Row style={{ marginTop: 150 }}>
          <Col>
            <div
              className="d-flex align-items-center"
              style={{
                backgroundImage: `url(${Rentel_Ellipse})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: 450,
                width: 450,
              }}
            >
              <h4
                style={{
                  fontFamily: "Poppins",
                  fontSize: 38,
                  fontWeight: 600,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.5,
                  letterSpacing: "normal",
                  textAlign: "center",
                  color: "rgba(66, 70, 81, 0.87)",
                }}
              >
                Over 900 boat trips done through us
              </h4>
            </div>
            <div style={{ marginTop: 120, marginBottom: 120 }}>
              <h4
                style={{
                  fontFamily: "Poppins",
                  fontSize: 30,
                  fontWeight: 500,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.53,
                  letterSpacing: "normal",
                  color: "rgba(66, 70, 81, 0.87)",
                }}
              >
                Real reviews from happy customers!
              </h4>
              <p
                style={{
                  marginTop: 30,
                  fontFamily: "Poppins",
                  fontSize: 20,
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.5,
                  letterSpacing: "normal",
                  textAlign: "start",
                  color: "rgba(66, 70, 81, 0.6)",
                }}
              >
                Join Our Trusted Community. Our satisfied customers have
                embarked on more than 900 incredible boat trips with us.
                Experience the joy of smooth sailing, breathtaking views, and
                unforgettable moments on the water. Book your dream boat trip
                today and become a part of our growing community of happy
                adventurers.
              </p>
            </div>
          </Col>
          <Col style={{ marginLeft: -120 }}>
            <Row className=" mb-2">
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
            <Row className="mb-2" style={{ marginLeft: -90 }}>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

// const boatListData = [
//   {
//     id: 1,
//     boat_name: "Jagadeesh",
//     marine_city: "Durrat Al Arus",
//     price_per_hour: "8",
//     price_currency: "SAR",
//     boat_max_capacity: "100",
//   },
//   {
//     id: 2,
//     boat_name: "Bhadur",
//     marine_city: "Al Fanateer Beach",
//     price_per_hour: "8",
//     price_currency: "SAR",
//     boat_max_capacity: "100",
//   },
//   {
//     id: 3,
//     boat_name: "Farasan",
//     marine_city: "Umluj Beach",
//     price_per_hour: "8",
//     price_currency: "SAR",
//     boat_max_capacity: "100",
//   },
//   {
//     id: 4,
//     boat_name: "Al Saif",
//     marine_city: "Indigo Beach",
//     price_per_hour: "8",
//     price_currency: "SAR",
//     boat_max_capacity: "100",
//   },
// ];

const backgroundImage = Boat_Experience;
const title = "Best Boating Experience in Saudi Arabia";
const showButton = false;
const titleStyle = {
  width: 660,
  height: 133,
  fontFamily: "Poppins",
  fontSize: 48,
  fontWeight: "bold",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 1.38,
  letterSpacing: "normal",
  textAlign: "center",
  // color: 'rgba(66, 70, 81, 0.87)',
};

const className = "d-flex justify-content-center";
const backgroundColor = "#fff";
const opacity = 0.9;
const showInput = true;
const inputStyle = {
  width: 1037,
  height: 70,
  marginTop: 50,
  paddingLeft: 27,
  // paddingTop: 27,
  // paddingBottom: 27,
  borderRadius: 10,
  backgroundColor: "#fff",
  border: "none",
  backgroundImage: "url(${FaSearch})",
  fontFamily: "Poppins",
  fontSize: 24,
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 2.75,
  letterSpacing: "normal",
  textAlign: "left",
  color: "rgba(66, 70, 81, 0.4)",
};

// useEffect(() => {
//   console.log("location.pathname", location.pathname);
//   const handleBackButton = (event) => {
//     event.preventDefault();
//     navigate(location.pathname);
//     //   navigate(-1);
//   };
//   window.addEventListener("popstate", handleBackButton);
//   return () => {
//     window.removeEventListener("popstate", handleBackButton);
//   };
// }, [location.pathname, navigate]);

// useEffect(() => {
//   const blockBackButton = (e) => {
//     e.preventDefault();
//     // navigate.push("/");
//     navigate(location.pathname);
//   };
//   window.history.pushState(null, null, window.location.pathname);
//   window.addEventListener("popstate", blockBackButton);
//   return () => {
//     window.removeEventListener("popstate", blockBackButton);
//   };
// }, [location.pathname, navigate]);
