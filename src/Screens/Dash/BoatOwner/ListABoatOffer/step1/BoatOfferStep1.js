import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../../../Images";
import { boatRegisterStep1 } from "../../../../../redux/slices";
import { HeaderContent } from "../../../../Common/map/HeaderContent";
import Footer from "../../../../../Component/Footer/Footer";
import { toast } from "react-toastify";
import { PageHeader } from "../../../page-header/PageHeader";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";

export const BoatOfferStep1 = () => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const auth = useSelector((state) => state?.auth);
  const dashboard = useSelector((state) => state?.dashboard);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [ministryOfTransDoc, setMinistryOfTransDoc] = useState("");
  const [generalDireOfBorderGuardDoc, setGeneralDireOfBorderGuardDoc] =
    useState("");
  const [
    boatDocumentationsAndLicensesDoc,
    setBoatDocumentationsAndLicensesDoc,
  ] = useState("");
  const [ministryOfTransDoc_API, setMinistryOfTransDoc_API] = useState("");
  const [generalDireOfBorderGuardDoc_API, setGeneralDireOfBorderGuardDoc_API] =
    useState("");
  const [
    boatDocumentationsAndLicensesDoc_API,
    setBoatDocumentationsAndLicensesDoc_API,
  ] = useState("");

  // console.log("dashboard", dashboard?.single_boat_details);
  // console.log("ministryOfTransDoc", ministryOfTransDoc);
  console.log(
    "9090909090909",
    auth.ministryOfTransportDoc && Object.keys(auth.ministryOfTransportDoc),
    auth.ministryOfTransportDoc
      ? Object?.keys(auth?.ministryOfTransportDoc)?.length <= 0
      : null
    // auth.ministryOfTransportDoc,
    // auth.ministryOfTransportDoc?.length > 0
  );

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  console.log(
    "isEmptyObject(auth.ministryOfTransportDoc)"
    // isEmptyObject(auth.ministryOfTransportDoc)
  );
  useEffect(() => {
    if (dashboard?.single_boat_details) {
      setMinistryOfTransDoc_API(
        dashboard?.single_boat_details?.ministry_transport_document
      );
      setMinistryOfTransDoc(
        dashboard?.single_boat_details?.ministry_transport_document
      );

      setGeneralDireOfBorderGuardDoc_API(
        dashboard?.single_boat_details?.border_guard_document
      );
      setGeneralDireOfBorderGuardDoc(
        dashboard?.single_boat_details?.border_guard_document
      );

      setBoatDocumentationsAndLicensesDoc_API(
        dashboard?.single_boat_details?.boat_license_document
      );
      setBoatDocumentationsAndLicensesDoc(
        dashboard?.single_boat_details?.boat_license_document
      );
    } else {
      if (auth.ministryOfTransportDoc) {
        if (!isEmptyObject(auth.ministryOfTransportDoc)) {
          Object.keys(auth.ministryOfTransportDoc)?.length <= 0
            ? setMinistryOfTransDoc(auth?.ministryOfTransportDoc)
            : setMinistryOfTransDoc("");
        }
      }
      if (auth.generalDirectorateOfBorderGuardDoc) {
        if (!isEmptyObject(auth.generalDirectorateOfBorderGuardDoc)) {
          Object.keys(auth.generalDirectorateOfBorderGuardDoc)?.length <= 0
            ? setGeneralDireOfBorderGuardDoc(
                auth?.generalDirectorateOfBorderGuardDoc
              )
            : setGeneralDireOfBorderGuardDoc("");
        }
      }
      if (auth.boatDocumentationsAndLicenses) {
        if (!isEmptyObject(auth.boatDocumentationsAndLicenses)) {
          Object.keys(auth.boatDocumentationsAndLicenses)?.length <= 0
            ? setBoatDocumentationsAndLicensesDoc(
                auth?.boatDocumentationsAndLicenses
              )
            : setBoatDocumentationsAndLicensesDoc("");
        }
      }
    }
  }, [
    auth.boatDocumentationsAndLicenses,
    auth.generalDirectorateOfBorderGuardDoc,
    auth.ministryOfTransportDoc,
    dashboard?.single_boat_details,
  ]);

  //
  //
  //
  //
  //
  //
  const handleFileSelect = (files, fileType) => {
    if (files && files[0]) {
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const selectedFile = files[0];
      const fileName = files[0]?.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      console.log("selectedFile", selectedFile);
      if (allowedExtensions.includes(fileExtension)) {
        switch (fileType) {
          case "ministryOfTrans":
            setMinistryOfTransDoc(selectedFile);
            break;
          case "generalDireOfBorderGuard":
            setGeneralDireOfBorderGuardDoc(selectedFile);
            break;
          case "boatDocumentationsAndLicenses":
            setBoatDocumentationsAndLicensesDoc(selectedFile);
            break;
          default:
            break;
        }
        // };
        // reader.readAsDataURL(selectedFile);
      } else {
        console.log(
          "Invalid file extension. Please select a file with extensions: jpg, jpeg, png, pdf"
        );
        toast.error(
          "Invalid file extension. Please select a file with extensions: jpg, jpeg, png, pdf",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 20000,
          }
        );
      }
    }
  };

  function handleDrop(event, handlebyName) {
    event.preventDefault();
    console.log("handleDrop", event.target.files[0]);
    const files = event.dataTransfer.files;
    switch (handlebyName) {
      case "ministryOfTrans":
        handleFileSelect(files, "ministryOfTrans");
        break;
      case "generalDireOfBorderGuard":
        handleFileSelect(files, "generalDireOfBorderGuard");
        break;
      case "boatDocumentationsAndLicenses":
        handleFileSelect(files, "boatDocumentationsAndLicenses");
        break;
      default:
        break;
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  const removeFile = (fileName) => {
    if (fileName === "ministry") {
      setMinistryOfTransDoc("");
      setMinistryOfTransDoc_API("");
    }
    if (fileName === "general") {
      setGeneralDireOfBorderGuardDoc("");
      setGeneralDireOfBorderGuardDoc_API("");
    }
    if (fileName === "boat") {
      setBoatDocumentationsAndLicensesDoc("");
      setBoatDocumentationsAndLicensesDoc_API("");
    }
  };

  const handleDoubleClick = (fileInputId) => {
    const fileInput = document.getElementById(fileInputId);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleButtonClick = () => {
    setErrorMsg("");
    if (
      ministryOfTransDoc !== "" &&
      generalDireOfBorderGuardDoc !== "" &&
      boatDocumentationsAndLicensesDoc !== ""
    ) {
      dispatch(
        boatRegisterStep1({
          ministryOfTransportDoc: ministryOfTransDoc,
          generalDirectorateOfBorderGuardDoc: generalDireOfBorderGuardDoc,
          boatDocumentationsAndLicenses: boatDocumentationsAndLicensesDoc,
        })
      );
      navigate("/BoatOfferStep2");
    } else {
      setErrorMsg("Please select an image");
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

  // console.log("auth?.ministryOfTransportDoc", auth);
  // console.log(
  //   "========auth?.ministr",
  //   auth.ministryOfTransportDoc && Object.keys(auth.ministryOfTransportDoc)
  // );
  // console.log("dashboard?.single_boat_details", dashboard?.single_boat_details);
  // console.log(
  //   "ministryOfTransDoc======>",
  //   ministryOfTransDoc,
  //   "ministryOfTransDoc_API======>",
  //   ministryOfTransDoc_API
  // );

  // console.log(
  //   "iebvfywevf",
  //   auth.ministryOfTransportDoc,
  //   Object.keys(auth.ministryOfTransportDoc),
  //   auth.ministryOfTransportDoc && Object.keys(auth.ministryOfTransportDoc)
  // );

  return (
    <>
      <div className="show-header-outSide-banner">
        <PageHeader
          showLoginSignUp={true}
          handle_navigation={handleHeaderCallBack}
          presentPage={"Register Your Boat"}
          link1={"Register Your Boat"}
          link2={"For Boat Rentals"}
          link3={"My Listings"}
        />
      </div>
      <div
        className="show-header-inside-banner"
        style={{ backgroundColor: "#f6f6f6" }}
      >
        <PageHeader
          showLoginSignUp={auth?.AuthToken ? false : true}
          handle_navigation={handleHeaderCallBack}
          presentPage={"Register Your Boat"}
          link1={"Register Your Boat"}
          link2={"For Boat Rentals"}
          link3={"My Listings"}
        />
      </div>
      {/* <HeaderContent
        contentname1={"Home"}
        contentname2={"Register Your Boat"}
        contentname3={"For Boat Rentals"}
        contentname4={"My Listings"}
        handleBack={handleHeaderCallBack}
        search={"/searchBoat"}
        showLoginSignUp={auth?.AuthToken ? false : true}
        presentPage={"Register Your Boat"}
      /> */}
      <div style={containerStyle}>
        <div style={headingStyle}>
          <Typography className={class_name.Show_off_your_boat_in_few_clicks}>
            Show off your boat in few clicks!
          </Typography>
        </div>
        <div
          // style={{ ...formContainerStyle, backgroundColor: "red" }}
          className={class_name.form_container_box}
        >
          <div style={stepContainerStyle}>
            <Typography className={class_name.step_1_txt}>Step 1</Typography>
            <div style={dividerStyle} />
            {/* Ministry of Transport Documentations */}
            <div className={class_name.doc_content}>
              <Typography className={class_name.Doc_title_txt}>
                Ministry of Transport Documentations
              </Typography>
              <Typography className={class_name.Doc_info_txt}>
                Please upload all official documentations issued/licensed by The
                Ministry of Transport.
              </Typography>
              <div
                style={{
                  border:
                    ministryOfTransDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
                className={class_name.choose_file_box}
              >
                {ministryOfTransDoc ? (
                  <div className={class_name.uploadedFile_box}>
                    <div className={class_name.img_ImgName}>
                      {ministryOfTransDoc?.type === "application/pdf" ? (
                        <img
                          alt="pdf"
                          src={IMAGES.PDF}
                          className={class_name.selectedImg}
                        />
                      ) : (
                        <>
                          <img
                            src={
                              ministryOfTransDoc_API
                                ? `http://localhost:3000/${ministryOfTransDoc_API}`
                                : URL.createObjectURL(ministryOfTransDoc)
                            }
                            alt="img"
                            className={class_name.selectedImg}
                          />
                        </>
                      )}
                      <Typography className={class_name?.imgName_txt}>
                        {ministryOfTransDoc?.name ??
                          "ministry transport document"}
                      </Typography>
                    </div>

                    <img
                      onClick={() => removeFile("ministry")}
                      src={IMAGES.DELETE_ICON}
                      alt="up-arrow"
                      className={class_name.up_arrow_style}
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="ministryOfTransInput"
                      onDoubleClick={() =>
                        handleDoubleClick("ministryOfTransInput")
                      }
                      className={class_name.lable_content}
                    >
                      <div
                        id="dropArea"
                        className={class_name.inside_label_content}
                        onDrop={(e) => handleDrop(e, "ministryOfTrans")}
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          className={class_name.up_arrow_style}
                        />
                        <Typography className={class_name?.Drag_file_to_upload}>
                          Drag file to upload, or
                        </Typography>
                        <Typography className={class_name?.chooseFileBtn}>
                          Choose File
                        </Typography>
                        <input
                          type="file"
                          id="ministryOfTransInput"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            handleFileSelect(e.target.files, "ministryOfTrans");
                          }}
                        />
                      </div>
                    </label>
                  </>
                )}
              </div>
              {ministryOfTransDoc === "" ? (
                <Typography style={ErrMsgTxt}>{errorMsg}</Typography>
              ) : null}
            </div>

            {/* General Directorate of Border Guard */}
            <div className={class_name.doc_content}>
              <Typography className={class_name.Doc_title_txt}>
                General Directorate of Border Guard
              </Typography>
              <Typography className={class_name.Doc_info_txt}>
                Please upload all official documentations issued/licensed by The
                General Directorate of Border Guard
              </Typography>
              <div
                style={{
                  border:
                    generalDireOfBorderGuardDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
                className={class_name.choose_file_box}
              >
                {generalDireOfBorderGuardDoc ? (
                  <div className={class_name.uploadedFile_box}>
                    <div className={class_name.img_ImgName}>
                      {generalDireOfBorderGuardDoc?.type ===
                      "application/pdf" ? (
                        <img
                          alt="pdf"
                          src={IMAGES.PDF}
                          className={class_name.selectedImg}
                        />
                      ) : (
                        <>
                          <img
                            alt="img"
                            src={
                              generalDireOfBorderGuardDoc_API
                                ? `http://localhost:3000/${generalDireOfBorderGuardDoc_API}`
                                : URL.createObjectURL(
                                    generalDireOfBorderGuardDoc
                                  )
                            }
                            className={class_name.selectedImg}
                          />
                        </>
                      )}
                      <Typography className={class_name?.imgName_txt}>
                        {"border guard document" ??
                          generalDireOfBorderGuardDoc?.name}
                      </Typography>
                    </div>

                    <img
                      onClick={() => removeFile("general")}
                      src={IMAGES.DELETE_ICON}
                      alt="up-arrow"
                      className={class_name.up_arrow_style}
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="generalDireOfBorderGuardInput"
                      onDoubleClick={() =>
                        handleDoubleClick("generalDireOfBorderGuardInput")
                      }
                      className={class_name.lable_content}
                    >
                      <div
                        id="dropArea"
                        className={class_name.inside_label_content}
                        onDrop={(e) =>
                          handleDrop(e, "generalDireOfBorderGuard")
                        }
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          className={class_name.up_arrow_style}
                        />
                        <Typography className={class_name?.Drag_file_to_upload}>
                          Drag file to upload, or
                        </Typography>
                        <Typography className={class_name?.chooseFileBtn}>
                          Choose File
                        </Typography>
                        <input
                          type="file"
                          id="generalDireOfBorderGuardInput"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileSelect(
                              e.target.files,
                              "generalDireOfBorderGuard"
                            )
                          }
                        />
                      </div>
                    </label>
                  </>
                )}
              </div>
              {generalDireOfBorderGuardDoc === "" ? (
                <Typography style={ErrMsgTxt}>{errorMsg}</Typography>
              ) : null}
            </div>

            {/* Boat Documentations and licenses */}
            <div className={class_name.doc_content}>
              <Typography className={class_name.Doc_title_txt}>
                Boat Documentations and licenses
              </Typography>
              <Typography className={class_name.Doc_info_txt}>
                Please upload the boat's documentations, licenses, and
                permission to sail
              </Typography>
              <div
                style={{
                  border:
                    boatDocumentationsAndLicensesDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
                className={class_name.choose_file_box}
              >
                {boatDocumentationsAndLicensesDoc ? (
                  <div className={class_name.uploadedFile_box}>
                    <div className={class_name.img_ImgName}>
                      {boatDocumentationsAndLicensesDoc?.type ===
                      "application/pdf" ? (
                        <img
                          alt="pdf"
                          src={IMAGES.PDF}
                          className={class_name.selectedImg}
                        />
                      ) : (
                        <>
                          <img
                            alt="img"
                            src={
                              boatDocumentationsAndLicensesDoc_API
                                ? `http://localhost:3000/${boatDocumentationsAndLicensesDoc_API}`
                                : URL.createObjectURL(
                                    boatDocumentationsAndLicensesDoc
                                  )
                            }
                            className={class_name.selectedImg}
                          />
                        </>
                      )}
                      <Typography className={class_name?.imgName_txt}>
                        {"boat license document" ??
                          boatDocumentationsAndLicensesDoc?.name}
                      </Typography>
                    </div>

                    <img
                      onClick={() => removeFile("boat")}
                      src={IMAGES.DELETE_ICON}
                      alt="up-arrow"
                      className={class_name.up_arrow_style}
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="boatDocumentationsAndLicensesInput"
                      onDoubleClick={() =>
                        handleDoubleClick("boatDocumentationsAndLicensesInput")
                      }
                      className={class_name.lable_content}
                    >
                      <div
                        id="dropArea"
                        className={class_name.inside_label_content}
                        onDrop={(e) =>
                          handleDrop(e, "boatDocumentationsAndLicenses")
                        }
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          className={class_name.up_arrow_style}
                        />
                        <Typography className={class_name?.Drag_file_to_upload}>
                          Drag file to upload, or
                        </Typography>
                        <Typography className={class_name?.chooseFileBtn}>
                          Choose File
                        </Typography>
                        <input
                          type="file"
                          id="boatDocumentationsAndLicensesInput"
                          style={{ display: "none" }}
                          onChange={(e) =>
                            handleFileSelect(
                              e.target.files,
                              "boatDocumentationsAndLicenses"
                            )
                          }
                        />
                      </div>
                    </label>
                  </>
                )}
              </div>
              {boatDocumentationsAndLicensesDoc === "" ? (
                <Typography style={ErrMsgTxt}>{errorMsg}</Typography>
              ) : null}
            </div>

            {/* Save & Continue */}
            <div className={class_name.btnDiv}>
              <div className={class_name?.save_and_continue_btn}>
                <Typography
                  onClick={() => handleButtonClick()}
                  className={`${class_name.save_and_continue_txt} hoverEffect`}
                >
                  Save & Continue
                </Typography>
              </div>
            </div>
            {/* <div style={saveContinueButtonStyle}>
              <Button
                variant="contained"
                color="primary"
               
                style={{
                  ...saveContinueButtonTextStyle,
                }}
              >
               
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="footer-style-hide">
        <Footer />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  form_container_box: {
    backgroundColor: "#fff",
    alignSelf: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    border: "solid 0.5px rgba(66, 70, 81, 0.1)",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: "2px",
    width: "90%",
    marginTop: "15px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "30px",
      width: "90%",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "30px",
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "40px",
      width: "70%",
    },
  },
  Show_off_your_boat_in_few_clicks: {
    fontSize: "clamp(26px, 4vw, 45px)",
    fontFamily: "Poppins",
    fontWeight: "bolder",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.51,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
  },
  step_1_txt: {
    fontSize: "clamp(16px, 4vw, 35px)",
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.51,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
    padding: "20px 0px",
  },
  doc_content: {
    display: "flex",
    flexDirection: "column",
    // marginTop: "15px",
    marginTop: "24px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "40px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "107px",
    },
  },
  Doc_title_txt: {
    fontSize: "clamp(14px, 3.5vw, 30px)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.53,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
    // backgroundColor: "lightgreen",
  },
  Doc_info_txt: {
    fontSize: "clamp(10px, 2.5vw, 20px)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#424651",
    // backgroundColor: "orange",
    marginTop: "5px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "10px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "15px",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
    },
  },
  up_arrow_style: {
    width: "clamp(20px, 5vw, 62.8px)",
    height: "clamp(20px, 5vw, 62.8px)",
  },

  choose_file_box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "rgba(66, 70, 81, 0.3)",
    borderRadius: "10px",
    borderWidth: 1,
    cursor: "pointer",
    padding: "20px 0px",
    marginTop: "10px",
    marginBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      padding: "20px 10px",
      marginTop: "20px",
      marginBottom: "15px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "30px 10px",
      marginTop: "30px",
      marginBottom: "15px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "40px 20px",
      marginTop: "50px",
    },
  },

  lable_content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    // backgroundColor: "yellow",
  },

  inside_label_content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
  },

  Drag_file_to_upload: {
    // padding: "0% 5%",
    fontSize: "clamp(10px, 2vw, 20px)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
    // backgroundColor: "red",
  },

  chooseFileBtn: {
    // marginLeft: "70px",
    fontSize: "clamp(8px, .9vw, 18px)",
    color: "white",
    textAlign: "center",
    backgroundColor: "#3973A5",
    fontFamily: "Poppins",
    borderRadius: "15px",
    padding: "4px 12px",
    [theme.breakpoints.up("sm")]: {
      padding: "6px 14px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "8px 16px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "12px 20px",
    },
  },

  btnDiv: {
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "flex-end",
    margin: "60px 0px",
    // alignSelf: "flex-end",
    // marginBottom: "70px",
  },

  save_and_continue_btn: {
    borderRadius: "30px",
    border: "solid 1px #026b93",
    padding: "2% 7%",
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    transition: "background-color 0.3s",
    backgroundColor: "#026b93", // Add a smooth transition for the background color
    "&:hover": {
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.24)",
      // Change the background color on hover
      "& $save_and_continue_txt": {},
    },
  },
  save_and_continue_txt: {
    fontFamily: "Poppins",
    fontSize: "clamp(8px, 2vw, 24px)", // Adjust the range as needed
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 0.96,
    letterSpacing: "normal",
    textAlign: "center",

    color: "white",
  },

  uploadedFile_box: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  img_ImgName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  selectedImg: {
    width: "clamp(24px, 5vw, 100px)",
    height: "clamp(24px, 5vw, 100px)",
  },

  imgName_txt: {
    fontSize: "clamp(10px, 2vw, 20px)",
    fontFamily: "Poppins",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651",
    marginLeft: "10px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "30px",
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: "50px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "70px",
    },
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
    form_container_box: {
      backgroundColor: "#fff",
      alignSelf: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      paddingLeft: "5%",
      paddingRight: "5%",
      borderRadius: "15px",
      width: "90%",
      marginTop: "15px",
      border: "solid 1px rgba(66, 70, 81, 0.1)",
      [theme.breakpoints.up("sm")]: {
        marginTop: "30px",
        width: "90%",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "30px",
        width: "80%",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "40px",
        width: "70%",
      },
    },
  },
}));

//Styling CSS

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f6f6f6",
  paddingBottom: "100px",
};

const headingStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "40px",
};

const stepContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

const dividerStyle = {
  height: 0.5,
  backgroundColor: "rgba(66, 70, 81, 0.2)",
  marginLeft: "-7%",
  marginRight: "-7%",
};

const uploadedFileContainerStyle = {};

const removeFileButtonStyle = {
  // marginLeft: "20px",
};

const ErrMsgTxt = {
  fontSize: "18px",
  fontFamily: "Poppins",
  color: "red",
  textAlign: "center",
};
const saveContinueButtonStyle = {
  marginTop: "60px",
  alignSelf: "flex-end",
  marginBottom: "70px",
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
  borderRadius: "15px",
};

const showSelectedImg = {};
