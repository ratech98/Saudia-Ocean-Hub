import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { AccessTime, Add, RemoveCircle } from "@material-ui/icons";
import IMAGES from "../../../../Images";
import CalendarComponent from "../../../../Common/Calendar/CalendarComponent";
import { boat_register, update_boat } from "../../../../../Service/api";
import { toast } from "react-toastify";
import {
  boatRegisterStep1,
  boatRegisterStep2,
  boatServiceList,
  boatTypeList,
  single_boat_details_store,
} from "../../../../../redux/slices";
import Loader from "../../../../Loader";
import { HeaderContent } from "../../../../Common/map/HeaderContent";
import "./BoatOfferStep3.css";
const youtubePattern = /^(https?:\/\/)?(www\.)?youtu(be\.com|\.be)\/.+$/;

const CustomTextField = withStyles({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
  },
})(TextField);

const start_space_Validation = new RegExp(/^(?!\s).*/);
const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minute = Array.from({ length: 60 }, (_, index) => index + 1);
const period = Array.from({ length: 2 }, (_, index) => index + 1);

export const BoatOfferStep3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const divRef = useRef(null);
  const classes = useStyles();
  const dash = useSelector((state) => state?.auth);
  const dashboard = useSelector((state) => state?.dashboard);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [youTubeLink, setYouTubeLink] = useState("");
  const [youTubeLinkError, setYouTubeLinkError] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState([]);
  const [currentlySelectedDate, setCurrentlySelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenIndex, setModalOpenIndex] = useState(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [greetingMessageError, setGreetingMessageError] = useState(false);
  const [selectedDateTimeError, setSelectedDateTimeError] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoveredTimeItem, setHoveredTimeItem] = useState(null);
  const [errorDublicateTime, setErrorDublicateTime] = useState("");
  // const [datePositionIndex, setDatePositionIndex] = useState("");
  const [datePositionIndex, setDatePositionIndex] = useState(null);
  const [loader, setLoader] = useState(false);
  const [cancellationPolicy, setCancellationPolicy] = useState([
    {
      id: 1,
      policy:
        "Cancellations made 7 days or more in advance of the event date, will receive a 100% refund.",
    },
    {
      id: 2,
      policy: "Cancellations made within 3 - 6 days will incur a 20% fee.",
    },
    {
      id: 3,
      policy:
        "Cancellations made within 48 hours to the event will incur a 30% fee.",
    },
  ]);

  useEffect(() => {
    if (divRef.current) {
      const divHeight = divRef.current.offsetHeight;
      // console.log("Div height:", divHeight);
    }
  }, [divRef]);

  // console.log("datePositionIndex", datePositionIndex);
  // console.log("selectedDateTime==========", selectedDateTime);
  console.log("dash boats_timeslot", dashboard?.single_boat_details);

  useEffect(() => {
    if (dashboard?.single_boat_details?.greeting_message) {
      setGreetingMessage(dashboard?.single_boat_details?.greeting_message);
    }
    if (dashboard?.single_boat_details?.boats_timeslot) {
      // Simulate API call or data processing
      const fetchData = async () => {
        // Simulate data transformation
        const selectedDateTime =
          dashboard?.single_boat_details?.boats_timeslot.map((item) => ({
            date: moment(item.date, "DD/MM/YYYY").toDate(),
            time: [convertTime(item.start_time)],
          }));

        console.log("fun selectedDateTime", selectedDateTime);
        // Update the state with the transformed data
        setSelectedDateTime(selectedDateTime);
        setCurrentlySelectedDate(selectedDateTime[0]?.date);
      };

      fetchData(); // Call the fetch function
    }
    if (dashboard?.single_boat_details?.youtybe_link) {
      setYouTubeLink(dashboard?.single_boat_details?.youtybe_link);
    }
  }, [
    dashboard?.single_boat_details?.boats_timeslot,
    dashboard?.single_boat_details?.greeting_message,
    dashboard?.single_boat_details?.youtybe_link,
  ]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (selectedDateTime.length > 0) {
      const index = selectedDateTime.findIndex((item) =>
        isSameDay(item.date, currentlySelectedDate)
      );
      setDatePositionIndex(index !== -1 ? index : null);
    } else {
      setDatePositionIndex(null);
    }
  }, [currentlySelectedDate, selectedDateTime]);

  const isSameDay = (dateA, dateB) => {
    return (
      dateA?.getDate() === dateB?.getDate() &&
      dateA?.getMonth() === dateB?.getMonth() &&
      dateA?.getFullYear() === dateB?.getFullYear()
    );
  };

  const handleDateSelect = (date) => {
    setCurrentlySelectedDate(date);
  };

  const copyTimeData = (copy_index) => {
    const firstTimeData = selectedDateTime[copy_index].time;
    const updatedData = selectedDateTime.map((entry, index) => {
      // if (index !== 0) {
      return { ...entry, time: [...firstTimeData] };
      // }
      // return entry;
    });

    setSelectedDateTime(updatedData);
  };

  const handleRemoveDate = (targetDate) => {
    var indexToRemove = -1;
    for (var i = 0; i < selectedDateTime.length; i++) {
      if (selectedDateTime[i].date.getTime() === targetDate.getTime()) {
        indexToRemove = i;
        break;
      }
    }
    if (indexToRemove !== -1) {
      setSelectedDateTime((prevState) => {
        const updatedSelectedDateTime = [...prevState];
        updatedSelectedDateTime.splice(indexToRemove, 1);

        if (updatedSelectedDateTime.length) {
          setCurrentlySelectedDate(
            updatedSelectedDateTime[updatedSelectedDateTime.length - 1].date
          );
        } else {
          setCurrentlySelectedDate(null);
        }
        return updatedSelectedDateTime;
      });
    }
  };

  const addExtraTime = (targetDate) => {
    setSelectedDateTime((prevState) => {
      return prevState.map((item) => {
        if (item.date.getTime() === targetDate.getTime()) {
          return {
            ...item,
            time: ["00:00 AM", ...item.time],
          };
        }
        return item;
      });
    });
  };

  const removeTimeField = (dateToRemove, timeIndexToRemove) => {
    const updatedSelectedDateTime = [...selectedDateTime];

    for (let i = 0; i < updatedSelectedDateTime.length; i++) {
      const entry = updatedSelectedDateTime[i];

      if (entry.date.toString() === dateToRemove.toString()) {
        const updatedTime = [...entry.time];

        if (timeIndexToRemove >= 0 && timeIndexToRemove < updatedTime.length) {
          updatedTime.splice(timeIndexToRemove, 1);
          entry.time = updatedTime;
        }

        break;
      }
    }

    return updatedSelectedDateTime;
  };

  const handleRemoveTimeField = (dateToRemove, timeIndexToRemove) => {
    const updatedSelectedDateTime = removeTimeField(
      dateToRemove,
      timeIndexToRemove
    );
    setSelectedDateTime(updatedSelectedDateTime);
    setModalOpen(false);
    setModalOpenIndex("");
  };

  const addCancellationPolicyField = () => {
    setCancellationPolicy((prevPolicy) => [
      ...prevPolicy,
      { id: prevPolicy.length + 1, policy: "" },
    ]);
  };

  const removeCancellationPolicyField = (index) => {
    setCancellationPolicy((prevPolicy) => {
      const updatedPolicies = [...prevPolicy];
      updatedPolicies.splice(index, 1);
      return updatedPolicies;
    });
  };

  const handleHourChange = (index, timeIndex, value, timeInput) => {
    handleTimeChange(index, timeIndex, value, timeInput);
  };

  // Define the common hover function
  const handleHover = (e) => {
    e.target.style.color = "#FFFFFF"; // Change text color on hover
    e.target.style.backgroundColor = "#424651"; // Change background color on hover
  };

  // Define the common hover exit function
  const handleHoverExit = (e) => {
    e.target.style.color = "#424651"; // Revert text color on hover exit
    e.target.style.backgroundColor = "transparent"; // Revert background color on hover exit
  };

  const handleTimeChange = (index, timeIndex, value, timeInput) => {
    setSelectedDateTime((prevSelectedDateTime) => {
      const updatedSelectedDateTime = [...prevSelectedDateTime];

      if (
        updatedSelectedDateTime[index] &&
        updatedSelectedDateTime[index].time
      ) {
        updatedSelectedDateTime[index] = {
          ...updatedSelectedDateTime[index],
          time: [...updatedSelectedDateTime[index].time],
        };

        const [time, period] =
          updatedSelectedDateTime[index].time[timeIndex].split(" "); // Split the time value into time and period

        const [hourString, minuteString] = time.split(":"); // Split the time into hours and minutes
        const hours = parseInt(hourString, 10).toString().padStart(2, "0"); // Convert hours string to an integer
        const minutes = parseInt(minuteString, 10).toString().padStart(2, "0");

        // console.log("Hours:", hours);
        // console.log("Minutes:", minutes);
        // console.log("Period:", period);
        if (timeInput === "hour") {
          updatedSelectedDateTime[index].time[timeIndex] = `${value
            .toString()
            .padStart(2, "0")}:${minutes ? minutes : "00"} ${
            period ? period : "AM"
          }`;
        } else if (timeInput === "minutes") {
          updatedSelectedDateTime[index].time[timeIndex] = `${
            hours ? hours : "00"
          }:${value.toString().padStart(2, "0")} ${period ? period : "AM"}`;
        } else {
          updatedSelectedDateTime[index].time[timeIndex] = `${
            hours ? hours : "00"
          }:${minutes ? minutes : "00"} ${value}`;
        }
      }

      return updatedSelectedDateTime;
    });
  };

  console.log("ministryOfTransportDoc 3", dash?.ministryOfTransportDoc);

  // console.log("dash?.Boat_services_selected", dash?.Boat_services_selected);

  const handleSubmit = () => {
    if (!greetingMessage) {
      setGreetingMessageError(true);
      toast.error("Please enter greeting message.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (
      selectedDateTime.length === 0 ||
      selectedDateTime.some((item) => item.time.length === 0)
    ) {
      setSelectedDateTimeError(true);
      toast.error("Please selecte Date & Time.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      setSelectedDateTimeError(false);
      setLoader(true);
      let payload = new FormData();
      if (dash) {
        payload.append("boat_name", dash?.Boat_name ?? "");
        payload.append("boat_type", dash?.Boat_type ?? "");
        payload.append("boat_year", dash?.Boat_year ?? "");
        payload.append("boat_length", dash?.Boat_length ?? "");
        payload.append("boat_max_capacity", dash?.Boat_max_capacity ?? "");
        payload.append("marine_name", dash?.Marine_name ?? "");
        payload.append(
          "marine_address",
          "no1, test street dummy address" ?? dash?.Marine_address
        );
        payload.append("latitude", dash?.Marine_address?.lat ?? "");
        payload.append("longtitude", dash?.Marine_address?.lng ?? "");
        payload.append("greeting_mesage", greetingMessage || "");
        payload.append("is_active", "1");
        payload.append("available_hours", "10");
        selectedDateTime?.map((dateItem, dateIndex) => {
          dateItem?.time?.map((timeItem, timeIndex) => {
            payload.append(
              `timeslot[]`,
              `${moment(dateItem?.date).format("DD.MM.YYYY")},${timeItem}`
            );
          });
        });
        // dash?.Boat_services_selected?.map((serviceItem, serviceIndex) => {
        //   if (serviceItem?.value) {
        //     payload.append(`boat_service[]`, serviceItem?.value);
        //   } else {
        //     console.log("serviceItem", serviceItem);
        //     payload.append(`boat_service[]`, serviceItem?.label);
        //   }
        // });
        dash?.Boat_services_selected?.map((serviceItem, serviceIndex) => {
          console.log("serviceItem", serviceItem);
          if (serviceItem?.value) {
            payload.append(`boat_service[]`, serviceItem?.value);
          } else {
            payload.append(`boat_service[]`, serviceItem?.service_id);
          }
        });
        payload.append("marine_pincode", "12211");
        payload.append("marine_state", "riyadh");
        payload.append("marine_city", "riyadh");
        payload.append(
          "ministry_transport_document",
          dash?.ministryOfTransportDoc
        );
        payload.append(
          "border_guard_document",
          dash?.generalDirectorateOfBorderGuardDoc
        );
        payload.append(
          "boat_license_document",
          dash?.boatDocumentationsAndLicenses
        );
        payload.append("price_per_hour", dash?.Boat_price_per_hour);
        payload.append("price_currency", "SAR");
        cancellationPolicy?.map((cancelPolicyItem, cancelPolicyIndex) => {
          payload.append(`cancellationPolicy[]`, cancelPolicyItem?.policy);
        });
        payload.append(
          "background_image",
          dash?.Boat_backgroung_image ?? dash?.Upload_images_of_your_boat[0]
        );
        payload.append(
          "front_image",
          dash?.Boat_profile_image ?? dash?.Upload_images_of_your_boat[0]
        );

        dash?.Upload_images_of_your_boat?.map((boatImgItem, boatImgIndex) => {
          payload.append("image", boatImgItem);
        });

        payload.append("youtube_link", youTubeLink);
        //print console
        for (const [key, value] of payload.entries()) {
          console.log(key, ":", `'${value}'`);
        }

        //API call
        // setLoader(false);
        if (!dashboard?.single_boat_details) {
          boat_register(dash?.AuthToken, payload)
            .then((res) => {
              console.log("boat_register res=>", res?.data);
              if (res?.data?.message === "boat successfully registered") {
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
                toast.dismiss();
                toast.success("Boat successfully registered", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });

                navigate("/confirmation");
                setLoader(false);
              } else {
                toast.error(res?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 20000,
                });
                setLoader(false);
              }
            })
            .catch((err) => {
              console.log("boat_register err", err);
              toast.dismiss();
              toast.error("Something went wrong. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 20000,
              });
              setLoader(false);
            });
        } else {
          payload.append("boat_id", dashboard?.single_boat_details?.boat_id);
          update_boat(dash?.AuthToken, payload)
            .then((res) => {
              console.log("update boat res=>", res?.data);
              if (res?.data?.message === "boat successfully updated") {
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
                toast.dismiss();
                toast.success("Boat successfully updated", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });

                navigate("/confirmation");
                setLoader(false);
              } else {
                toast.dismiss();
                toast.error(res?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 20000,
                });
                setLoader(false);
              }
            })
            .catch((err) => {
              console.log("update boat err", err);
              toast.error("Something went wrong. Please try again later.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
              });
              setLoader(false);
            });
        }
      }

      setGreetingMessageError(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      "https://www.youtube.com/watch?v=M7cr9U-jtzY&t=4338s"
    );
    setIsLinkCopied(true);
    // setTimeout(() => {
    //   setIsLinkCopied(false);
    // }, 2000);
    const youtubeLink = "https://www.youtube.com/watch?v=M7cr9U-jtzY&t=4338s";

    // Open the YouTube link in a new tab without focusing on it
    const newTab = window.open(youtubeLink, "_blank");
    newTab.opener = null; // Prevent the newly opened tab from focusing on the parent tab
  };

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      if (dash?.tokenDecodeData?.user_type === "BOAT_OWNER") {
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

  const convertTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  };

  return (
    <>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Register Your Boat"}
        contentname3={"For Boat Rentals"}
        contentname4={"My Listings"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={dash?.AuthToken ? false : true}
        presentPage={"Register Your Boat"}
      />
      <div className="container-style">
        {loader ? <Loader loading={loader} /> : null}
        <div className="heading">
          <Typography className="heading-text">
            Show off your boat in few clicks!
          </Typography>
        </div>
        <div className="form-container ">
          <div className="step-container">
            <Typography className="step-number">Step 3</Typography>
            <div className="divider" />

            <div className="document-section">
              {/* Tell your customers */}
              <Typography className="document-section-heading">
                Write greeting message to your customers
              </Typography>
              <Grid item xs={12} sm={6} className="textbox-area">
                <CustomTextField
                  margin="normal"
                  fullWidth
                  id="customers"
                  name="customers"
                  placeholder="Tell your customers what makes your boat trips interesting!"
                  value={greetingMessage}
                  multiline
                  // maxRows={5}
                  rows={5}
                  onChange={(event) => {
                    if (start_space_Validation.test(event.target.value)) {
                      setGreetingMessage(event.target.value);
                    }
                  }}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      backgroundColor: "white",
                      borderRadius: "5px",
                      padding: 20,
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
                  }}
                />
              </Grid>
              {!greetingMessage && greetingMessageError ? (
                <Typography className="err-msg-text">
                  Please enter greeting message.
                </Typography>
              ) : null}

              {/* Calendar           *** &&& ***        Date Time Selection */}
              <Typography className="boat-avaliability">
                Boat Avaliability
              </Typography>

              <Grid item xs={12} sm={6} className="calendar-timeSlot-container">
                <div className="calendar-timeSlot-container-inner">
                  <div className="calendar-container">
                    <CalendarComponent
                      setSelectedDateTime={setSelectedDateTime}
                      selectedDateTime={selectedDateTime}
                      onDateSelect={handleDateSelect}
                      errorShow={errorDublicateTime[0]?.date}
                      handleShowMonth={currentlySelectedDate}
                    />
                  </div>
                  <div className="timeSlot-container">
                    <CustomTextField
                      // disabled={true}
                      type={"text"}
                      margin="normal"
                      fullWidth
                      id="selected_date"
                      name="selected_date"
                      placeholder="selected date"
                      label="Day"
                      value={
                        currentlySelectedDate
                          ? moment(currentlySelectedDate).format("DD.MM.YYYY")
                          : "None"
                      }
                      onChange={(event) => {
                        // formik.handleChange(event);
                        // setPassword(event.target.value);
                      }}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          fontFamily: "Poppins",
                          color: "#424651",
                          fontSize: 22,
                          fontWeight: "500",
                        },
                      }}
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          marginTop: "30px",
                          borderRadius: "15px",
                          paddingLeft: "25px",
                          width: "100%",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          border: "solid 1px rgba(66, 70, 81, 0.2)",
                          // backgroundColor: "red",
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton>
                              <img
                                src={IMAGES.DATE}
                                alt="lock"
                                style={{
                                  width: "15px",
                                  height: "15px",
                                }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handleRemoveDate(currentlySelectedDate)
                              }
                            >
                              <RemoveCircle />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        style: pwdStyles,
                      }}
                      style={{
                        alignItems: "center",
                      }}
                    />
                    <Typography className="start-at-text">Start at</Typography>
                    <div className="show-selected-time-list">
                      <div className="flex-style">
                        {selectedDateTime?.map((item, index) => {
                          // console.log("item", item);
                          const isCurrentlySelectedDate =
                            item.date?.getDate() ===
                            currentlySelectedDate?.getDate();
                          if (isCurrentlySelectedDate) {
                            return item?.time?.map((timeItem, timeIndex) => {
                              const timeItemId = timeIndex.toString();
                              const [time, period] = timeItem.split(" ");
                              const [hourString, minuteString] =
                                time.split(":");
                              const handleItemClick = () => {
                                const isItemSelected =
                                  modalOpen && modalOpenIndex === timeItemId;
                                setModalOpen(!isItemSelected);
                                setHoveredTimeItem(null);
                                setModalOpenIndex(timeItemId);
                              };
                              return (
                                <>
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    style={{
                                      // width: "50%",
                                      display: "flex",
                                      padding: "10px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "90%",
                                        position: "relative",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          border:
                                            "1px solid rgba(66, 70, 81, 0.2)",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            borderRadius: "10px",
                                            padding: "15px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                          }}
                                          // onMouseEnter={() =>
                                          //   setHoveredTimeItem(() => timeItemId)
                                          // }
                                          // onMouseLeave={() =>
                                          //   setHoveredTimeItem(() => null)
                                          // }
                                          onClick={() => {
                                            handleItemClick();
                                          }}
                                        >
                                          <AccessTime />
                                          <Typography
                                            style={{
                                              color: "#424651",
                                              paddingLeft: "5px",
                                              width: "100px",
                                            }}
                                          >
                                            {timeItem ? timeItem : "00:00"}
                                          </Typography>

                                          <div
                                            onClick={() => {
                                              handleRemoveTimeField(
                                                item?.date,
                                                timeIndex
                                              );

                                              // setModalOpen(false);
                                              // setModalOpenIndex(null);
                                              // handleItemClick();
                                            }}
                                          >
                                            <IconButton
                                              style={{
                                                margin: "0px",
                                                padding: "0px",
                                              }}
                                            >
                                              <RemoveCircle />
                                            </IconButton>
                                          </div>
                                        </div>
                                        {/* {hoveredTimeItem === timeItemId ? ( */}
                                        {/* ) : null} */}
                                      </div>

                                      {modalOpen &&
                                      modalOpenIndex === timeItemId ? (
                                        <>
                                          <Grid
                                            ref={modalRef}
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              width: "100%",
                                              border: "1px solid black",
                                              borderRadius: "10px",
                                              boxShadow:
                                                "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                              padding: "5px",
                                              backgroundColor: "white",
                                              zIndex: 1,
                                              // transform: "translate(-50%, -50%)",
                                              position: "absolute",
                                            }}
                                          >
                                            <Grid
                                              item
                                              xs={4}
                                              style={{
                                                borderRight: "1px solid black",
                                                width: "33%",
                                                height: "200px",
                                                overflowY: "auto",
                                              }}
                                            >
                                              {hours.map(
                                                (hourItem, hourIndex) => (
                                                  <div
                                                    key={hourIndex + "%"}
                                                    value={hourItem}
                                                    onClick={() => {
                                                      handleHourChange(
                                                        index,
                                                        timeIndex,
                                                        hourItem,
                                                        "hour"
                                                      );
                                                    }}
                                                    style={{
                                                      ...timeTxtStyle,
                                                      backgroundColor:
                                                        hourString ===
                                                        hourItem
                                                          .toString()
                                                          .padStart(2, "0")
                                                          ? "#3973A5"
                                                          : "white",
                                                    }}
                                                    onMouseEnter={
                                                      hourString ===
                                                      hourItem
                                                        .toString()
                                                        .padStart(2, "0")
                                                        ? undefined
                                                        : handleHover
                                                    }
                                                    onMouseLeave={
                                                      hourString ===
                                                      hourItem
                                                        .toString()
                                                        .padStart(2, "0")
                                                        ? undefined
                                                        : handleHoverExit
                                                    }
                                                  >
                                                    {hourItem
                                                      .toString()
                                                      .padStart(2, "0")}
                                                  </div>
                                                )
                                              )}
                                            </Grid>
                                            <Grid
                                              item
                                              xs={4}
                                              style={{
                                                borderRight: "1px solid black",
                                                width: "33%",
                                                height: "200px",
                                                overflowY: "auto",
                                              }}
                                            >
                                              {minute.map(
                                                (minutesItem, minutesIndex) => {
                                                  return (
                                                    <div
                                                      key={minutesIndex + "%"}
                                                      value={minutesItem}
                                                      onClick={() => {
                                                        handleHourChange(
                                                          index,
                                                          timeIndex,
                                                          minutesItem,
                                                          "minutes"
                                                        );
                                                      }}
                                                      style={{
                                                        ...timeTxtStyle,
                                                        backgroundColor:
                                                          minuteString ===
                                                          minutesItem
                                                            .toString()
                                                            .padStart(2, "0")
                                                            ? "#3973A5"
                                                            : "white",
                                                      }}
                                                      onMouseEnter={
                                                        minuteString ===
                                                        minutesItem
                                                          .toString()
                                                          .padStart(2, "0")
                                                          ? undefined
                                                          : handleHover
                                                      }
                                                      onMouseLeave={
                                                        minuteString ===
                                                        minutesItem
                                                          .toString()
                                                          .padStart(2, "0")
                                                          ? undefined
                                                          : handleHoverExit
                                                      }
                                                    >
                                                      {minutesItem
                                                        .toString()
                                                        .padStart(2, "0")}
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </Grid>
                                            <Grid
                                              item
                                              xs={4}
                                              style={{
                                                // borderRight: "1px solid black",
                                                width: "30%",
                                                height: "200px",
                                                overflowY: "auto",
                                              }}
                                            >
                                              <div
                                                onClick={() => {
                                                  handleHourChange(
                                                    index,
                                                    timeIndex,
                                                    "AM",
                                                    " "
                                                  );
                                                }}
                                                style={{
                                                  ...timeTxtStyle,
                                                  backgroundColor:
                                                    period ===
                                                    "AM"
                                                      .toString()
                                                      .padStart(2, "0")
                                                      ? "#3973A5"
                                                      : "white",
                                                }}
                                                onMouseEnter={
                                                  period ===
                                                  "AM"
                                                    .toString()
                                                    .padStart(2, "0")
                                                    ? undefined
                                                    : handleHover
                                                }
                                                onMouseLeave={
                                                  period ===
                                                  "AM"
                                                    .toString()
                                                    .padStart(2, "0")
                                                    ? undefined
                                                    : handleHoverExit
                                                }
                                              >
                                                {"AM"}
                                              </div>
                                              <div
                                                onClick={() => {
                                                  handleHourChange(
                                                    index,
                                                    timeIndex,
                                                    "PM",
                                                    " "
                                                  );
                                                }}
                                                style={{
                                                  ...timeTxtStyle,
                                                  backgroundColor:
                                                    period ===
                                                    "PM"
                                                      .toString()
                                                      .padStart(2, "0")
                                                      ? "#3973A5"
                                                      : "white",
                                                }}
                                                onMouseEnter={
                                                  period ===
                                                  "PM"
                                                    .toString()
                                                    .padStart(2, "0")
                                                    ? undefined
                                                    : handleHover
                                                }
                                                onMouseLeave={
                                                  period ===
                                                  "PM"
                                                    .toString()
                                                    .padStart(2, "0")
                                                    ? undefined
                                                    : handleHoverExit
                                                }
                                              >
                                                {"PM"}
                                              </div>
                                            </Grid>
                                          </Grid>
                                        </>
                                      ) : null}
                                    </div>
                                  </Grid>
                                </>
                              );
                            });
                          }

                          return null;
                        })}
                      </div>
                    </div>

                    {/* add button */}
                    {currentlySelectedDate ? (
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          // width: "100%",
                          justifyContent: "flex-end",
                          // position: "absolute",
                          // bottom: 0,
                          alignContent: "flex-end",
                          alignItems: "flex-end",
                          alignSelf: "flex-end",
                        }}
                      >
                        <IconButton
                          style={{
                            border: "solid 1px rgba(66, 70, 81, 0.2)",
                            // width: "100%",
                            display: "flex",
                          }}
                          onClick={() => addExtraTime(currentlySelectedDate)}
                        >
                          <Add />
                        </IconButton>
                      </div>
                    ) : null}

                    {/* copy time to all day */}
                    {selectedDateTime[datePositionIndex]?.time?.length > 0 ? (
                      <Typography
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          copyTimeData(datePositionIndex);
                        }}
                      >
                        Copy Time to all date
                      </Typography>
                    ) : null}

                    {/* err msg */}
                    {errorDublicateTime ? (
                      <Typography
                        style={{
                          ...ErrMsgTxt,
                        }}
                      >
                        Please remove duplicate entries
                      </Typography>
                    ) : null}
                  </div>
                </div>
                {selectedDateTime?.length <= 0 && selectedDateTimeError ? (
                  <Typography
                    style={{
                      ...ErrMsgTxt,
                    }}
                  >
                    Please selecte Date & Time.
                  </Typography>
                ) : null}
              </Grid>

              {/* Share a YouTube link  */}
              <Grid item xs={12} sm={6} style={{ marginTop: "20px" }}>
                <Typography>
                  Share a YouTube link for a short boat demo
                </Typography>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid rgba(66, 70, 81, 0.3)",
                    borderRadius: 10,
                    padding: "15px",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      alt="LINK"
                      src={IMAGES.LINK}
                      style={{ width: 31, height: 31 }}
                      onClick={handleCopyLink}
                    />

                    <CustomTextField
                      margin="normal"
                      fullWidth
                      id="YouTube"
                      name="YouTube"
                      placeholder="Share a YouTube link for a short boat demo"
                      value={youTubeLink}
                      onChange={(event) => {
                        if (start_space_Validation.test(event.target.value)) {
                          if (youtubePattern.test(event.target.value)) {
                            setYouTubeLink(event.target.value);
                            setYouTubeLinkError(false);
                          } else {
                            setYouTubeLink("");
                            setYouTubeLinkError(true);
                          }
                        }

                        // if (youtubePattern.test(event.target.value)) {
                        //   setYouTubeLink(event.target.value);
                        // } else {
                        //   setYouTubeLink(event.target.value);
                        // }
                        //
                        //
                      }}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "white",
                          borderRadius: "5px",
                          paddingLeft: 20,
                          height: "1px",
                          width: "90%",
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
                      }}
                    />
                  </div>

                  {youTubeLink && (
                    <img
                      alt="Tick"
                      src={IMAGES.TICK}
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: "center",
                      }}
                    />
                  )}
                </div>
                {youTubeLinkError ? (
                  <Typography className="err-msg-text">
                    I'm sorry, but it seems you have entered an incorrect
                    YouTube link. Please provide a valid YouTube link
                  </Typography>
                ) : null}
              </Grid>

              {/* Cancellation Policy */}
              <Grid item xs={12} sm={6} style={{ marginTop: "20px" }}>
                <Typography>Cancellation Policy</Typography>
                {cancellationPolicy?.map((item, index) => {
                  return (
                    <div
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      <CustomTextField
                        margin="normal"
                        fullWidth
                        id="CancellationPolicy"
                        name="CancellationPolicy"
                        placeholder="Cancellation Policy"
                        value={item?.policy}
                        onChange={(event) => {
                          const updatedPolicy = event.target.value;
                          setCancellationPolicy((prevPolicy) => {
                            const updatedPolicies = [...prevPolicy];
                            updatedPolicies[index] = {
                              ...updatedPolicies[index],
                              policy: updatedPolicy,
                            };
                            return updatedPolicies;
                          });
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            backgroundColor: "white",
                            borderRadius: "5px",
                          },
                          startAdornment: (
                            <>
                              <Typography>{index + 1}</Typography>
                              <div
                                style={{
                                  backgroundColor: "black",
                                  width: "1px",
                                  height: "100%",
                                }}
                              />
                            </>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  removeCancellationPolicyField(index)
                                }
                                className={`${classes.removeButton} ${
                                  hoverIndex === index ? classes.showButton : ""
                                }`}
                              >
                                <RemoveCircle />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: textFieldStyles,
                        }}
                        style={{
                          borderRadius: "15px",
                          border: "solid 1px rgba(66, 70, 81, 0.2)",
                          // backgroundColor: "red",
                          padding: "10px",
                        }}
                      />
                    </div>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    style={{
                      border: "solid 1px rgba(66, 70, 81, 0.2)",
                      // width: "100%",
                      display: "flex",
                    }}
                    onClick={addCancellationPolicyField}
                  >
                    <Add />
                  </IconButton>
                </div>
              </Grid>
            </div>

            {/* Save & Continue */}
            <div style={saveContinueButtonStyle}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
                style={{
                  ...saveContinueButtonTextStyle,
                }}
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  removeButton: {
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  showButton: {
    opacity: 1,
  },
}));

//Styling CSS

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f6f6f6",
};

const headingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "40px",
};

const headingTextStyle = {
  fontSize: 45,
  fontFamily: "Poppins",
  color: "#424651",
  fontWeight: "500",
  textAlign: "center",
};

const formContainerStyle = {
  marginTop: "40px",
  backgroundColor: "#fff",
  alignSelf: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  paddingLeft: "5%",
  paddingRight: "5%",
  borderRadius: "2px",
  marginBottom: "40px",
  width: "70%",
};

const itemContainerStyle = {
  display: "flex",
  width: "45%", // Adjust this value as needed
};

const stepContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

const stepNumberStyle = {
  fontSize: "35px",
  fontWeight: "bold",
  lineHeight: 1.51,
  fontFamily: "Poppins",
  color: "#424651",
  paddingTop: "20px",
  paddingBottom: "20px",
};

const dividerStyle = {
  height: 0.5,
  backgroundColor: "rgba(66, 70, 81, 0.2)",
  marginLeft: "-7%",
  marginRight: "-7%",
};

const documentSectionStyle = {
  marginTop: "107px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

const documentSectionHeadingStyle = {
  fontSize: "30px",
  fontWeight: "normal",
  lineHeight: 1.53,
  fontFamily: "Poppins",
  color: "#424651",
};

const saveContinueButtonStyle = {
  marginTop: "60px",
  alignSelf: "flex-end",
  marginBottom: "70px",
};

const timeTxtStyle = {
  cursor: "pointer",
  letterSpacing: 0.5,
  padding: 5,
  fontSize: 14,
};

const saveContinueButtonTextStyle = {
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#3973A5",
  fontFamily: "Poppins",

  color: "#fff",
  fontWeight: "normal",
  lineHeight: 1.5,
  paddingTop: "14px",
  paddingBottom: "14px",
  paddingLeft: "40px",
  paddingRight: "40px",
};
const pwdStyles = {
  fontSize: 16,
  fontFamily: "Poppins",
  color: "#424651",
  borderBottom: "none",
  backgroundColor: "#fff",
  //   backgroundColor: "red",
  borderRadius: "15px",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "10px",
  //   border: "solid 1px rgba(66, 70, 81, 0.2)",
};
const ErrMsgTxt = {
  fontSize: "18px",
  fontFamily: "Poppins",

  color: "red",
  textAlign: "center",
};

const textFieldStyles = {
  paddingLeft: "20px",
  // borderRadius: "15px",
  // borderWidth: ".1px",
  // borderColor: "rgba(66, 70, 81, 0.2)",
};
