import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Clear, MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { boat_service, boat_type } from "../../../../Service/api";
import {
  boatRegisterStep2,
  boatServiceList,
  boatTypeList,
} from "../../../../redux/slices";
import IMAGES from "../../../Images";
import Map from "../../../Common/map/Map";
import { toast } from "react-toastify";

const start_space_Validation = new RegExp(/^(?!\s).*/);

const boat_type_options = [
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

export const BoatOfferStep2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const dash = useSelector((state) => state?.auth);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showCut, setShowCut] = useState();
  const [selectedBoatServices, setSelectedBoatServices] = useState([]);
  const [customService, setCustomService] = useState("");
  const [showCustomService, setShowCustomService] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [backgroungImage, setBackgroungImage] = useState(false);
  const [profileImg, setProfileImg] = useState(false);
  const [imgUploadError, setImgUploadError] = useState(false);
  const [boatServiceError, setBoatServiceError] = useState(false);
  const [mapLocError, setMapLocError] = useState(false);
  const [modalOpenIndex, setModalOpenIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const handleMapClick = async ({ lat, lng }) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
      );
      console.log("res", response);
      const { results } = response.data;
      if (results.length > 0) {
        const address = results[0].formatted_address;
        setSelectedAddress({ lat, lng, address });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setSelectedAddress({ lat, lng });
  };

  console.log("selectedFiles", selectedFiles);

  useEffect(() => {
    boat_type(auth?.AuthToken)
      .then((res) => {
        console.log("boat_type res", res?.data);
        if (res?.data?.success) {
          dispatch(boatTypeList(res?.data?.parameters));
        } else {
        }
      })
      .catch((err) => {
        console.log("boat_type err", err);
      });
    boat_service(auth?.AuthToken)
      .then((res) => {
        console.log("boat_service res", res?.data);
        if (res?.data?.success) {
          dispatch(boatServiceList(res?.data?.parameters));
        } else {
        }
      })
      .catch((err) => {
        console.log("boat_service err", err);
      });
  }, [auth?.AuthToken, dispatch]);

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

  const handleBoatServiceToggle = (service) => {
    const isSelected = selectedBoatServices.includes(service);
    if (isSelected) {
      setSelectedBoatServices(
        selectedBoatServices.filter((s) => s !== service)
      );
    } else {
      setSelectedBoatServices([...selectedBoatServices, service]);
    }
  };

  const handleCustomServiceToggle = () => {
    setShowCustomService(!showCustomService);
    if (customService.trim() !== "") {
      const existingIndex = selectedBoatServices.findIndex(
        (service) => service.key === "CustomService"
      );
      if (existingIndex !== -1) {
        // Update the existing entry
        const updatedServices = [...selectedBoatServices];
        updatedServices[existingIndex] = {
          key: "CustomService",
          value: customService.trim(),
        };
        setSelectedBoatServices(updatedServices);
      } else {
        // Add a new entry
        setSelectedBoatServices([
          ...selectedBoatServices,
          { key: "CustomService", value: customService.trim() },
        ]);
      }
    }
  };

  const handleAddCustomService = (e) => {
    setCustomService(e.target.value);
  };

  const handleFileSelect = (files) => {
    const selectedImages = Array.from(files).filter((file) => {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return allowedExtensions.includes(fileExtension);
    });
    if (selectedImages.length !== files.length) {
      toast.error(
        "Invalid file extension. Please select a file with extensions: jpg, jpeg, png",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 20000,
        }
      );
    }
    setSelectedFiles([...selectedFiles, ...selectedImages]);
  };

  // if (file) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const dataUrl = reader.result;
  //     setImageData(dataUrl);
  //     // Call your API function here, passing the image data
  //     // For example:
  //     // sendImageDataToServer(dataUrl);
  //   };
  //   reader.readAsDataURL(file);
  // }

  const removeImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const formik = useFormik({
    initialValues: {
      boatName: "",
      boatType: "",
      boatYear: "",
      boatLength: "",
      maxCapacity: "",
      pricePerHour: "",
      Marine_Name: "",
      Marine_Address: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
    },
    validate: (values) => {
      const errors = {};

      if (!values.boatName) {
        errors.boatName = "Please enter boat name";
      }
      if (!values.boatType) {
        errors.boatType = "Please select boat type";
      }
      if (values.boatYear === "") {
        errors.boatYear = "Please enter boat year";
      }
      if (!values.boatLength) {
        errors.boatLength = "Please enter boat length";
      }
      if (values.maxCapacity === "") {
        errors.maxCapacity = "Please enter Max Capacity";
      }

      if (!values.pricePerHour) {
        errors.pricePerHour = "Please enter Price Per Hour";
      }
      if (!selectedAddress) {
        errors.Marine_Address = "Please enter your Marine Address";
      }
      if (!values.Marine_Name) {
        errors.Marine_Name = "Please enter your Marine Name";
      }

      return errors;
    },
  });

  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    handleFileSelect(files);

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const selectedFile = files[0];
    const fileName = files[0]?.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileData = e.target.result;
      };
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function CommonModal({ open, onClose, title, content, actions }) {
    return (
      <Dialog open={open} onClose={onClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && <DialogContent>{content}</DialogContent>}
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    );
  }

  const [markers, setMarkers] = useState([
    { id: 1, lat: 20.146220361679458, lng: 40.2568970541965 },
    { id: 2, lat: 20.146220361679458, lng: 42.2568970541965 },
    { id: 3, lat: 20.146220361679458, lng: 41.2568970541965 },
  ]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Handle marker selection
  const handleSelectMarker = (marker) => {
    setSelectedMarker(marker);
    setSelectedAddress(marker);
  };

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <span style={headingTextStyle}>
          Show off your boat in a few clicks!
        </span>
      </div>
      <div style={formContainerStyle}>
        <div style={stepContainerStyle}>
          <span style={stepNumberStyle}>Step 2</span>
          <div style={dividerStyle} />
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} style={{ marginTop: "50px" }}>
              {/* Boat Name */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatName" style={inputLabelStyles}>
                  Boat Name
                </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="boatName"
                  name="boatName"
                  placeholder="Boat Name"
                  value={formik.values.boatName}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("boatName", inputValue);
                    }
                  }}
                  error={
                    formik.touched.boatName && Boolean(formik.errors.boatName)
                  }
                  helperText={formik.touched.boatName && formik.errors.boatName}
                  InputProps={{
                    style: textFieldStyles,
                  }}
                />
              </Grid>

              {/* Boat Type */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatType" style={{ ...inputLabelStyles }}>
                  Boat Type
                </InputLabel>
                <CustomTextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="boatType"
                  name="boatType"
                  placeholder="Boat Type"
                  value={formik.values.boatType}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.boatType && Boolean(formik.errors.boatType)
                  }
                  helperText={formik.touched.boatType && formik.errors.boatType}
                  select
                  InputProps={{ style: textFieldStyles }}
                >
                  {/* {dash?.boatType?.length > 0 ? (
                    dash.boatType.map((item, index) => (
                      <MenuItem key={index} value={item?.label}>
                        {item?.label}
                      </MenuItem>
                    ))
                  ) : (
                    <> */}
                  {boat_type_options?.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      selected={formik.values.boatType === item.name}
                    >
                      {item?.name}
                    </MenuItem>
                  ))}
                  {/* </>
                  )} */}
                </CustomTextField>
              </Grid>

              {/* Boat Year */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatName" style={inputLabelStyles}>
                  Boat Year
                </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="boatYear"
                  name="boatYear"
                  placeholder="Boat Year"
                  value={formik.values.boatYear}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("boatYear", inputValue);
                    }
                  }}
                  error={
                    formik.touched.boatYear && Boolean(formik.errors.boatYear)
                  }
                  helperText={formik.touched.boatYear && formik.errors.boatYear}
                  InputProps={{
                    style: textFieldStyles,
                  }}
                />
              </Grid>

              {/*   Boat Length */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatName" style={inputLabelStyles}>
                  Boat Length
                </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="boatLength"
                  name="boatLength"
                  placeholder="Boat Length"
                  value={formik.values.boatLength}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("boatLength", inputValue);
                    }
                  }}
                  error={
                    formik.touched.boatLength &&
                    Boolean(formik.errors.boatLength)
                  }
                  helperText={
                    formik.touched.boatLength && formik.errors.boatLength
                  }
                  InputProps={{
                    style: textFieldStyles,
                  }}
                />
              </Grid>

              {/* Max Capacity */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatName" style={inputLabelStyles}>
                  Max Capacity
                </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="maxCapacity"
                  name="maxCapacity"
                  placeholder="Max Capacity"
                  value={formik.values.maxCapacity}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("maxCapacity", inputValue);
                    }
                  }}
                  error={
                    formik.touched.maxCapacity &&
                    Boolean(formik.errors.maxCapacity)
                  }
                  helperText={
                    formik.touched.maxCapacity && formik.errors.maxCapacity
                  }
                  InputProps={{
                    style: textFieldStyles,
                  }}
                />
              </Grid>

              {/* Price Per Hour */}
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="boatName" style={inputLabelStyles}>
                  Price Per Hour
                </InputLabel>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="pricePerHour"
                  name="pricePerHour"
                  placeholder="Price Per Hour"
                  value={formik.values.pricePerHour}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("pricePerHour", inputValue);
                    }
                  }}
                  error={
                    formik.touched.pricePerHour &&
                    Boolean(formik.errors.pricePerHour)
                  }
                  helperText={
                    formik.touched.pricePerHour && formik.errors.pricePerHour
                  }
                  InputProps={{
                    style: textFieldStyles,
                  }}
                />
              </Grid>

              {/* Upload images of your boat */}
              <Grid
                style={{
                  width: "100%",
                  marginLeft: 15,
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontFamily: "Poppins",
                    color: "#424651",
                    fontWeight: "500",
                    // textAlign: "center",
                  }}
                >
                  Upload images of your boat
                </span>

                <label htmlFor="fileInput">
                  <div
                    id="dropArea"
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={handleDragOver}
                  >
                    <div
                      style={{
                        marginTop: "10px",
                        border:
                          selectedFiles.length <= 0 && imgUploadError
                            ? "1px dashed red"
                            : "1px dashed gray",
                        // border: "1px dashed gray",
                        borderRadius: "20px",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        display: "flex",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="file"
                        id="fileInput"
                        multiple
                        onChange={(event) =>
                          handleFileSelect(event.target.files)
                        }
                        style={{ display: "none" }}
                      />
                      <img
                        alt="cloud"
                        src={IMAGES.CLOUD_UPLOAD_SIGNAL}
                        style={{ width: 100, height: 70 }}
                      />

                      <span
                        style={{
                          fontSize: 18,
                          fontFamily: "Poppins",
                          color: "#424651",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        Drop your images here, or
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          fontFamily: "Poppins",
                          color: "#f6f6f6",
                          backgroundColor: "#3973a5",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                      >
                        Choose File
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins",
                          color: "#424651",
                          marginTop: "30px",
                        }}
                      >
                        supports JPG, PNG,JPEG
                      </span>
                    </div>
                  </div>
                </label>
                {selectedFiles.length <= 0 && imgUploadError ? (
                  <Typography style={ErrMsgTxt}>
                    Please upload your Images
                  </Typography>
                ) : null}
              </Grid>

              {/* slected boat images */}
              <div
                style={{
                  marginLeft: 15,
                  // height: "200px",
                  // overflow: "auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {selectedFiles.length ? (
                    <>
                      {selectedFiles?.map((item, index) => {
                        let trackIndex = index;
                        return (
                          <div
                            style={{
                              width: "45%",
                              justifyContent: "space-evenly",
                              margin: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                padding: "15px",
                                borderStyle: "solid",
                                borderRadius: "10px",
                                borderColor: "gray",
                                borderWidth: ".5px",
                                alignItems: "center",
                              }}
                              onMouseOver={(e) => {
                                setShowCut(index);
                              }}
                              // onMouseOut={(e) => {
                              //   setShowCut("");
                              // }}
                            >
                              <img
                                alt="user selected img"
                                src={URL.createObjectURL(item)}
                                style={{
                                  width: "70px",
                                  height: "60px",
                                  backgroundColor: "rgba(66, 70, 81, 0.3)",
                                  borderStyle: "solid",
                                  borderRadius: "10px",
                                  borderColor: "gray",
                                  borderWidth: ".5px",
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  flex: 1,
                                }}
                              >
                                <div style={{ flexDirection: "column" }}>
                                  <Typography
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Poppins",
                                      color: "#424651",
                                      marginLeft: "10px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item?.name}
                                  </Typography>
                                  {backgroungImage === index ? (
                                    <Typography
                                      style={{
                                        fontSize: 14,
                                        fontFamily: "Poppins",
                                        color: "#424651",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {"selected as BackgroungImage"}
                                    </Typography>
                                  ) : null}
                                  {profileImg === index ? (
                                    <Typography
                                      style={{
                                        fontSize: 14,
                                        fontFamily: "Poppins",
                                        color: "#424651",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {"selected as Profile Image"}
                                    </Typography>
                                  ) : null}
                                </div>
                                {showCut === index ? (
                                  <div
                                    style={{
                                      flex: 0.3,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignSelf: "center",
                                      // padding: 10,
                                    }}
                                  >
                                    <Clear
                                      onClick={() => {
                                        removeImage(index);
                                      }}
                                    />

                                    <MoreVert
                                      onClick={() => {
                                        setOpenModal(true);
                                        setModalOpen(true);
                                        setModalOpenIndex(trackIndex);
                                      }}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {modalOpen && modalOpenIndex === trackIndex ? (
                                <>
                                  <Grid
                                    ref={modalRef}
                                    style={{
                                      width: "15%",
                                      display: "flex",
                                      flexDirection: "column",
                                      position: "absolute",
                                      // width: "10%",
                                      border: "1px solid black",
                                      borderRadius: "10px",
                                      boxShadow:
                                        "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                      padding: "25px",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: 16,
                                        fontFamily: "Poppins",
                                        color: "#424651",
                                        cursor: "pointer",
                                        textAlign: "center",
                                      }}
                                      onClick={() => {
                                        console.log("item", item);
                                        setOpenModal(false);
                                        setBackgroungImage(index);
                                        dispatch(
                                          boatRegisterStep2({
                                            Boat_name: auth?.Boat_name,
                                            Boat_type: auth?.Boat_type,
                                            Boat_year: auth?.Boat_year,
                                            Boat_length: auth?.Boat_length,
                                            Boat_max_capacity:
                                              auth?.Boat_max_capacity,
                                            Boat_price_per_hour:
                                              auth?.Boat_price_per_hour,
                                            Upload_images_of_your_boat:
                                              auth?.Upload_images_of_your_boat,
                                            Boat_services_selected:
                                              auth?.Boat_services_selected,
                                            Marine_name: auth?.Marine_name,
                                            Marine_address:
                                              auth?.Marine_address,
                                            Boat_backgroung_image: item,
                                            Boat_profile_image:
                                              auth?.Boat_profile_image,
                                          })
                                        );
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.color = "blue";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                      }}
                                    >
                                      Background Image
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontSize: 16,
                                        fontFamily: "Poppins",
                                        color: "#424651",
                                        cursor: "pointer",
                                        textAlign: "center",
                                      }}
                                      onClick={() => {
                                        setOpenModal(false);
                                        setProfileImg(index);
                                        console.log("auth", auth);
                                        dispatch(
                                          boatRegisterStep2({
                                            Boat_name: auth?.Boat_name,
                                            Boat_type: auth?.Boat_type,
                                            Boat_year: auth?.Boat_year,
                                            Boat_length: auth?.Boat_length,
                                            Boat_max_capacity:
                                              auth?.Boat_max_capacity,
                                            Boat_price_per_hour:
                                              auth?.Boat_price_per_hour,
                                            Upload_images_of_your_boat:
                                              auth?.Upload_images_of_your_boat,
                                            Boat_services_selected:
                                              auth?.Boat_services_selected,
                                            Marine_name: auth?.Marine_name,
                                            Marine_address:
                                              auth?.Marine_address,
                                            Boat_backgroung_image:
                                              auth?.Boat_backgroung_image,
                                            Boat_profile_image: item,
                                          })
                                        );
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.color = "blue";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.color = "black";
                                      }}
                                    >
                                      Profile Image
                                    </Typography>
                                  </Grid>
                                </>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
              {/* Boat Services List  */}
              <Grid
                container
                spacing={2}
                style={{ marginTop: "100px", marginLeft: 0 }}
              >
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      color: "#424651",
                    }}
                  >
                    Boat Services
                  </span>

                  {boatServiceError && selectedBoatServices?.length === 0 ? (
                    <Typography
                      style={{
                        ...ErrMsgTxt,
                      }}
                    >
                      Please select Services
                    </Typography>
                  ) : null}
                </Grid>

                {boatServices.map((boatService, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={index}
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={selectedBoatServices.includes(
                        boatService.service
                      )}
                      onChange={() =>
                        handleBoatServiceToggle(boatService.service)
                      }
                    />

                    <label
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins",
                        color: "#424651",
                        display: "inline-block",
                      }}
                    >
                      {boatService.service}
                    </label>
                  </Grid>
                ))}

                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={showCustomService}
                    onChange={handleCustomServiceToggle}
                  />
                  <span style={{ marginRight: "5px" }}>Other</span>

                  <Input
                    value={customService}
                    onChange={handleAddCustomService}
                  />
                </Grid>
              </Grid>

              {/* ===== map =====  */}
              <Grid
                container
                spacing={2}
                style={{ marginTop: "100px", marginLeft: 0 }}
              >
                <Grid item xs={12}>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      color: "#424651",
                    }}
                  >
                    Boat Location
                  </span>
                  <Grid container spacing={2} style={{ marginTop: "50px" }}>
                    {/* Marine Name */}
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="Marine_Name"
                        style={inputLabelStyles}
                      >
                        Marine Name
                      </InputLabel>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="Marine_Name"
                        name="Marine_Name"
                        placeholder="Marine Name"
                        value={formik.values.Marine_Name}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (start_space_Validation.test(inputValue)) {
                            formik.setFieldValue("Marine_Name", inputValue);
                          }
                        }}
                        error={
                          formik.touched.Marine_Name &&
                          Boolean(formik.errors.Marine_Name)
                        }
                        helperText={
                          formik.touched.Marine_Name &&
                          formik.errors.Marine_Name
                        }
                        InputProps={{
                          style: textFieldStyles,
                        }}
                      />
                    </Grid>

                    {/* Marine Address */}
                    <Grid item xs={12} sm={6}>
                      <InputLabel
                        htmlFor="boatType"
                        style={{ ...inputLabelStyles }}
                      >
                        Marine Address
                      </InputLabel>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="Marine_Address"
                        name="Marine_Address"
                        placeholder="Marine Address"
                        disabled={true}
                        value={
                          selectedAddress
                            ? `lat: ${selectedAddress?.lat} lng: ${selectedAddress?.lng}`
                            : null
                        }
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (start_space_Validation.test(inputValue)) {
                            formik.setFieldValue("Marine_Address", inputValue);
                          }
                        }}
                        error={
                          formik.touched.Marine_Address &&
                          Boolean(formik.errors.Marine_Address)
                        }
                        helperText={
                          !selectedMarker
                            ? formik.touched.Marine_Address &&
                              formik.errors.Marine_Address
                            : null
                        }
                        InputProps={{
                          style: textFieldStyles,
                        }}
                      />
                    </Grid>
                  </Grid>

                  <div style={{ height: "500px", width: "100%" }}>
                    <Map
                      markers={markers}
                      selectedMarker={selectedMarker}
                      onSelectMarker={handleSelectMarker}
                    />
                  </div>

                  {!selectedMarker && mapLocError ? (
                    <Typography
                      style={{
                        ...ErrMsgTxt,
                      }}
                    >
                      Please select Location
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>

              {/* Save & Continue */}
              <Grid
                container
                spacing={2}
                style={{
                  ...saveContinueButtonStyle,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => {
                      if (
                        selectedFiles.length <= 0 ||
                        selectedBoatServices?.length <= 0 ||
                        selectedAddress === null ||
                        Object.keys(formik.errors).length > 0
                      ) {
                        if (selectedFiles.length) {
                          setImgUploadError(false);
                        } else {
                          setImgUploadError(true);
                        }
                        if (selectedBoatServices?.length) {
                          setBoatServiceError(false);
                        } else {
                          setBoatServiceError(true);
                        }
                        if (selectedAddress) {
                          setMapLocError(false);
                        } else {
                          setMapLocError(true);
                        }
                      } else {
                        dispatch(
                          boatRegisterStep2({
                            Boat_name: formik.values.boatName,
                            Boat_type: formik.values.boatType,
                            Boat_year: formik.values.boatYear,
                            Boat_length: formik.values.boatLength,
                            Boat_max_capacity: formik.values.maxCapacity,
                            Boat_price_per_hour: formik.values.pricePerHour,
                            Upload_images_of_your_boat: selectedFiles,
                            Boat_services_selected: selectedBoatServices,
                            Marine_name: formik.values.Marine_Name,
                            Marine_address: selectedAddress,
                            Boat_backgroung_image: auth?.Boat_backgroung_image,
                            Boat_profile_image: auth?.Boat_profile_image,
                          })
                        );
                        navigate("/BoatOfferStep3");
                      }
                    }}
                    style={{
                      ...saveContinueButtonTextStyle,
                      // backgroundColor:
                      //   ministryOfTransDoc !== "" &&
                      //   generalDireOfBorderGuardDoc !== "" &&
                      //   boatDocumentationsAndLicensesDoc !== ""
                      //     ? "#3973A5"
                      //     : "lightgray",
                    }}
                  >
                    Save & Continue
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

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

const boatServices = [
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
  {
    service: "Toilet",
  },
  {
    service: "Wi-Fi",
  },
  {
    service: "Fishing Gear",
  },
  {
    service: "BBQ",
  },
  {
    service: "Hot Drinks",
  },
  {
    service: "Watersport Activities",
  },
  {
    service: "Life Jackets",
  },
  {
    service: "Air Conditioning",
  },
];

// Styling CSS

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f6f6f6",
  // display: "grid",
  // placeItems: "center",
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

const stepContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

const stepNumberStyle = {
  fontSize: "35px",
  fontWeight: "bold",
  lineHeight: 1.51,
  // color: "#424651",
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

const NextButtonStyle = {
  marginTop: "102px",
  marginBottom: "70px",
  alignSelf: "flex-end",
};

const NextButtonTextStyle = {
  borderRadius: "10px",
  fontSize: "18px",
  fontFamily: "Poppins",
  color: "white",
  textAlign: "center",
  backgroundColor: "#3973A5",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "80px",
  paddingRight: "80px",
};

const inputLabelStyles = {
  fontSize: 16,
  fontWeight: 530,
  fontFamily: "Poppins",
  color: "#424651",
  marginBottom: "-15px",
  textAlign: "left",
};

const textFieldStyles = {
  borderRadius: "15px",
  borderWidth: ".1px",
  borderColor: "rgba(66, 70, 81, 0.2)",
};

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px",
      borderRadius: "50%",
    }}
  >
    {text}
  </div>
);

const mapOptions = {
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ],
};

const saveContinueButtonStyle = {
  marginTop: "60px",
  // alignSelf: "flex-end",
  marginBottom: "70px",
  alignSelf: "center",
  justifyContent: "center",
  display: "flex",
};
const saveContinueButtonTextStyle = {
  fontSize: "20px",
  fontFamily: "Poppins",
  textTransform: "none",
  backgroundColor: "#3973A5",
  color: "#fff",
  fontWeight: "normal",
  lineHeight: 1.5,
  paddingTop: "14px",
  paddingBottom: "14px",
  paddingLeft: "40px",
  paddingRight: "40px",
};
const ErrMsgTxt = {
  fontSize: "18px",
  fontFamily: "Poppins",

  color: "red",
  textAlign: "center",
};
