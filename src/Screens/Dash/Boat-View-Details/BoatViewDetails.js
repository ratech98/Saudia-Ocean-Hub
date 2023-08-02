/* eslint-disable react/jsx-pascal-case */
import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "../../../Component/Footer/Footer";
import "./BoatViewDetails.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import data from "./boatDetailsViewsJson.json";
import { FaCheck } from "react-icons/fa";
import IMAGES from "../../Images";
import Banner from "./Banner/Banner";
import Map from "../../Common/map/Map";
import { BoatView } from "./Boat_View/BoatView";
import Client_review from "./Testimonial/Client_review";
import Policy from "./CancelationPolicy/Policy";
import { BoatDetailCard } from "../../new/BoatDetailCard";
import { single_boat_data_API } from "../../../Service/api";
import { useDispatch, useSelector } from "react-redux";
import CalendarComponent from "../../Common/Calendar/CalendarComponent";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HeaderContent } from "../../Common/map/HeaderContent";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { single_boat_details_store } from "../../../redux/slices";
import ViewImage from "../../Common/View-image/ViewImage";

const BoatViewDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const dashboard = useSelector((state) => state?.dashboard);
  const [boatDetails, setBoatDetails] = useState(null);
  const [calendar_1_date, setCalendar_1_date] = useState(moment().format());
  const [calendar_2_date, setCalendar_2_date] = useState(
    moment().add(1, "month").format()
  );

  const handleCalendarMoth = useCallback((data, calender_no) => {
    // console.log("activeStartDate  ======>>>", data?.activeStartDate);
    // console.log("calender_no", calender_no);
    // console.log("action", data?.action);
    // Convert the date strings to moment objects
    const momentDate1 = moment(calendar_1_date);
    const momentDate2 = moment(calendar_2_date);

    // Get the month component from each date using getMonth()
    const month1 =
      momentDate1?._i?.activeStartDate?.getMonth() ??
      momentDate1?._d?.getMonth(); // July is represented by 6 (0-indexed)
    const month2 =
      momentDate2?._i?.activeStartDate?.getMonth() ??
      momentDate2?._d?.getMonth(); // August is represented by 7 (0-indexed)

    if (calender_no === "1") {
      if (data?.action === "next") {
        const newCalendar2Date = moment(data?.activeStartDate).add(1, "month");
        return setCalendar_2_date(newCalendar2Date);
      } else if (data?.action === "prev") {
        const newCalendar2Date = moment(data?.activeStartDate).add(1, "month");
        return setCalendar_2_date(newCalendar2Date);
      }
    }
    if (calender_no === "2") {
      if (data?.action === "next") {
        const newCalendar2Date = moment(data?.activeStartDate).subtract(
          1,
          "month"
        );
        // console.log("newCalendar2Date", newCalendar2Date?._d);
        return setCalendar_1_date(newCalendar2Date?._d);
      } else if (data?.action === "prev") {
        const newCalendar2Date = moment(data?.activeStartDate).subtract(
          1,
          "month"
        );
        return setCalendar_1_date(newCalendar2Date);
      }
    }
  }, []);

  const handleClick = () => {
    const scrollAmount = boatListContainerRef.current.offsetWidth;
    boatListContainerRef.current.scrollLeft += scrollAmount;
  };

  useEffect(() => {
    let payload = JSON.stringify({
      boat_id: dashboard?.boat_id,
      user_id: auth?.userId,
    });
    console.log("payload", payload);
    single_boat_data_API(auth?.AuthToken, payload)
      .then((res) => {
        // check api code
        console.log("single_boat_data  -=-=-=-=-=->>>>> res", res?.data);
        if (res?.data?.message === "success") {
          setBoatDetails(res?.data?.parameters);
        } else {
          toast.error(res?.data?.error ?? "error", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.log("single_boat_data -=-=-=-=-=->>>>>  err", err);
        toast.error("Something went wrong. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
  }, [auth?.AuthToken, auth?.userId, dashboard?.boat_id, dispatch]);

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

  // console.log("=====> 1", calendar_1_date);
  // console.log("calendar 2 ", calendar_2_date);

  //
  //
  //
  // console.log("boatDetails", boatDetails);
  // console.log("auth", auth);
  //
  //
  // const [selectedDateTime, setSelectedDateTime] = useState([]);
  // const [currentlySelectedDate, setCurrentlySelectedDate] = useState(null);
  // const [errorDublicateTime, setErrorDublicateTime] = useState("");
  // const handleDateSelect = (date) => {
  //   setCurrentlySelectedDate(date);
  // };

  const link1 = "Boat Offers";
  const link2 = "My Listings";
  const link3 = "List a Boat Offer";
  const href1 = "#";
  const href2 = "#";
  const href3 = "#";
  const num = "5";
  const num1 = "4";
  const showItem = true;
  const showLogin = false;
  const showProfile = true;
  const backgroundImage = IMAGES.BACK_GROUNG;
  const content = "Riyadh";
  const title = "Night Light";
  const titleStyle = {
    // width: 472,
    // height: 119,
    marginTop: 150,
    fontFamily: "Poppins",
    fontSize: 85,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.51,
    letterSpacing: "normal",
    textAlign: "-webkit-center",
    color: "#424651",
  };
  const descStyle = {
    // width: 239,
    // height: 84,
    fontFamily: "Poppins",
    fontSize: 60,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
    marginTtop: 35,
  };
  const backgroundColor = "#fff ";
  const numBorder = 10;
  const numHeight = 257;
  const numWidth = 375;
  const showPlaceName = false;
  const desc = data.parameters.greeting_message;
  const className = "text";
  const backgroundColors = "#ff";
  const clientPadding = 0;
  const Client_Title_Show = false;
  const scrollingTop = 50;
  const reviewCard_color = "rgba(102, 155, 195, 0.1)";
  const reviewCard_height = 299;
  const reviewCard_width = 425;
  const reviewCard_center = "center";
  const boatListContainerRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(false);

  const handleImageClick = (imageUrl) => {
    setShowModal(true);
    setSelectedImageUrl(imageUrl);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  console.log("showModal", showModal);

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
        // presentPage={"/searchBoat"}
      />
      {/* <Typography
        onClick={() => {
          navigate("/boatOfferStep1");
          dispatch(single_boat_details_store(boatDetails));
        }}
      >
        Edit
      </Typography> */}

      <div className="boatViewDetails">
        <Banner
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
          backgroundImage={backgroundImage}
          titleStyle={titleStyle}
          descStyle={descStyle}
          content={content}
          title={title}
          backgroundColor={backgroundColor}
          className={className}
          showHeader={false}
        />

        <div>
          <Container style={{ backgroundColor: "#fff", padding: "0px 60px" }}>
            <div>
              <BoatView
                boatData={boatDetails}
                handleImageClick={handleImageClick}
              />
              <ViewImage
                show={showModal}
                onClose={handleModalClose}
                imageUrl={selectedImageUrl}
              />
            </div>
            <div className="line">
              <hr
                style={{
                  color: "rgba(66, 70, 81, 1)",
                  width: "100%",
                  justifyContent: "center",
                  margin: "auto",
                }}
              ></hr>
            </div>
            <div className="">
              <Row>
                <Col xs={1}>
                  <img
                    src={IMAGES.BACK_GROUNG}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                    alt="background"
                  />
                </Col>
                <Col xs={11} className="boatOwner">
                  <h5>
                    {/* {data.parameters.owner_name}*/}
                    {boatDetails?.boat_name}
                  </h5>
                  <h6>Boat Owner</h6>
                  <div>
                    <h3 className="greetingMsg">
                      {boatDetails?.greeting_message}
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="line">
              <hr
                style={{
                  color: "rgba(66, 70, 81, 1)",
                  width: "100%",
                  justifyContent: "center",
                  margin: "auto",
                }}
              ></hr>
            </div>
            <div style={{ marginTop: 70, marginBottom: 70 }}>
              <Row>
                <Col>
                  <h5 className="boat_details">Boat Details</h5>
                  {boatDetails?.boat_type ? (
                    <div>
                      <Row>
                        <Col>
                          <h5 className="boat_label">{"Type"}</h5>
                        </Col>
                        <Col>
                          <h5 className="boat_Value">
                            {boatDetails?.boat_type}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  {boatDetails?.boat_length ? (
                    <div>
                      <Row>
                        <Col>
                          <h5 className="boat_label">{"Length"}</h5>
                        </Col>
                        <Col>
                          <h5 className="boat_Value">
                            {boatDetails?.boat_length}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  {boatDetails?.boat_year ? (
                    <div>
                      <Row>
                        <Col>
                          <h5 className="boat_label">{"Year"}</h5>
                        </Col>
                        <Col>
                          <h5 className="boat_Value">
                            {boatDetails?.boat_year}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  {boatDetails?.boat_year ? (
                    <div>
                      <Row>
                        <Col>
                          <h5 className="boat_label">{"Max Capacity"}</h5>
                        </Col>
                        <Col>
                          <h5 className="boat_Value">
                            {boatDetails?.boat_max_capacity}
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                </Col>
                <Col>
                  <h5 className="boat_services">Services</h5>
                  {boatDetails?.boats_servic ? (
                    <>
                      {boatDetails?.boats_service?.map((item) => (
                        <Row
                          style={{
                            display: "flex",
                            alignSelf: "center",
                            // backgroundColor: "goldenrod",
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <Col xs={1}>
                            <FaCheck className="icons" />
                          </Col>
                          <Col xs={11}>
                            <h6
                              style={{ marginLeft: -10 }}
                              className="service_label"
                            >
                              {item.service_label ?? "boats_service"}
                            </h6>
                          </Col>
                        </Row>
                      ))}
                    </>
                  ) : null}
                </Col>
              </Row>
            </div>

            {/* ==========================       Calendar       ========================== */}
            <div>
              <div>
                <h4 className="avalibility">Check Avaliability</h4>
              </div>
              <div>
                <Row>
                  <Col>
                    <CalendarComponent
                      showFixedDates={boatDetails?.boats_timeslot}
                      setDay={calendar_1_date}
                      setCalendar_date={setCalendar_1_date}
                      handleCalendarMoth={handleCalendarMoth}
                      calender_no={"1"}
                      hideSelectedDayColor={true}
                    />
                  </Col>
                  <Col>
                    <CalendarComponent
                      showFixedDates={boatDetails?.boats_timeslot}
                      setDay={calendar_2_date}
                      setCalendar_date={setCalendar_2_date}
                      handleCalendarMoth={handleCalendarMoth}
                      calender_no={"2"}
                      hideSelectedDayColor={true}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* ==========================       map Location       ========================== */}
            <div>
              <div>
                <h4 className="bestlocation">Best Location</h4>
              </div>
              <div className="map">
                <Map
                  selectedMarker={boatDetails?.latitude}
                  onSelectMarker={boatDetails?.longtitude}
                />
              </div>
              <div>
                <Row style={{ alignItems: "center" }}>
                  <Col xs={1}>
                    <img
                      src={IMAGES.LOCATION}
                      alt="location_img"
                      style={{ width: "33px", height: "55px" }}
                    />
                  </Col>
                  <Col xs={11} style={{ marginLeft: -10 }}>
                    <h4 className="latitude">{boatDetails?.marine_city}</h4>
                    <h6 className="longtitude">
                      {boatDetails?.marine_address}
                    </h6>
                  </Col>
                </Row>
              </div>
            </div>

            {/* ==========================       customers       ========================== */}
            <div>
              <div className="client_review_title">
                <h3 className="client_review_title_text">
                  What customers say about this boat
                </h3>
              </div>
              <div
                style={{
                  width: "95%",
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: "red",
                  overflowX: "auto",
                }}
              >
                {client_review?.map((item, index) => {
                  return (
                    <div style={{ marginLeft: "10px" }}>
                      <Client_review
                        id={1}
                        image={IMAGES?.boat2 ?? IMAGES.PROFILE_ICON}
                        name={"Jagadeesh"}
                        place={"Riyath"}
                        review={"Luxurious! We enjoyed it So much! Thank You"}
                      />
                    </div>
                  );
                })}

                {/* <Col xs={1} style={{ width: "5%" }} className="text-end">
                <FaAngleRight size={35} onClick={handleScroll} />
              </Col> */}
              </div>
            </div>
            {/* ==========================       Policy       ========================== */}
            <div>
              <div className="policy_title">
                <h3 className="policy_title_text">Cancellation Policy</h3>
              </div>
              {boatDetails?.boats_cancellation_policy ? (
                <>
                  {boatDetails?.boats_cancellation_policy?.map(
                    (item, index) => {
                      console.log("item", item);
                      return (
                        <Policy
                          id={item?.id}
                          policy_statement={item?.policy_statement}
                        />
                      );
                    }
                  )}
                </>
              ) : null}
            </div>

            {/* ==========================       boatListData       ========================== */}
            <div className="imageBoxViews">
              <h3 className="imageBoxTitle">
                Other Boats for {data.parameters.owner_name}
              </h3>
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                  margin: `0px 0px 0px 0px`,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  ref={boatListContainerRef}
                  style={{
                    width: "95%",
                    overflowX: "auto",
                    margin: `0px 0px 0px 0px`,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Row>
                    <Col xs={11}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {boatListData?.length ? (
                          <>
                            {boatListData?.map((item, index) => {
                              return (
                                <div
                                  style={{
                                    margin: "27.5px",
                                  }}
                                  onClick={() => {
                                    navigate("/boatViewDetails");
                                  }}
                                >
                                  <BoatDetailCard
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
                          </>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </div>

                <Col
                  xs={1}
                  style={{
                    width: "5%",
                    display: "flex",
                    alignSelf: "center",
                    // alignItems: "flex-end",
                    // alignContent: "flex-end",
                    justifyContent: "center",
                  }}
                  // className="text-end"
                >
                  <img
                    alt="next >>"
                    style={{ width: "50px", height: "51px" }}
                    src={IMAGES.RIGHT_ARROW}
                    onClick={handleClick}
                  />
                </Col>
              </div>
            </div>
          </Container>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BoatViewDetails;

const boatListData = [
  {
    id: 1,
    boat_name: "Jagadeesh",
    marine_city: "Durrat Al Arus",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  {
    id: 2,
    boat_name: "Bhadur",
    marine_city: "Al Fanateer Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  {
    id: 3,
    boat_name: "Farasan",
    marine_city: "Umluj Beach",
    price_per_hour: "8",
    price_currency: "SAR",
    boat_max_capacity: "100",
  },
  // {
  //   id: 4,
  //   boat_name: "Al Saif",
  //   marine_city: "Indigo Beach",
  //   price_per_hour: "8",
  //   price_currency: "SAR",
  //   boat_max_capacity: "100",
  // },
];

const client_review = [
  {
    id: 1,
    image: require("../../../assets/Images/boat_carousal_1.png"),
    name: "Jagadeesh",
    place: "Riyath",
    review: "Luxurious! We enjoyed it So much! Thank You",
  },
  {
    id: 2,
    image: require("../../../assets/Images/Boating_Experience.png"),
    name: "Kholi",
    place: "Riyath",
    review:
      "Luxurious! We enjoyed it So much! Thank You, Luxurious! We enjoyed it So much! Thank You,Luxurious! We enjoyed it So much! Thank You, Luxurious! We enjoyed it So much! Thank You",
  },
  {
    id: 3,
    image: require("../../../assets/Images/boat_carousal_2.png"),
    name: "Dhoni",
    place: "Riyath",
    review: "Luxurious! We enjoyed it So much! Thank You",
  },
  {
    id: 4,
    image: require("../../../assets/Images/boat_carousal_2.png"),
    name: "Mike",
    place: "Riyath",
    review: "Luxurious! We enjoyed it So much! Thank You",
  },
];
