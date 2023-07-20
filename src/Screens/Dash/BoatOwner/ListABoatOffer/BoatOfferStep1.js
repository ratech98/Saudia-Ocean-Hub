import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../../Images";
import { boatRegisterStep1 } from "../../../../redux/slices";
import { HeaderContent } from "../../../Common/map/HeaderContent";
import Footer from "../../../../Component/Footer/Footer";
import { toast } from "react-toastify";

export const BoatOfferStep1 = () => {
  const dash = useSelector((state) => state?.auth);
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
        // const reader = new FileReader();
        // reader.onload = function (e) {
        // const fileData = e.target.result;

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
    }
    if (fileName === "general") {
      setGeneralDireOfBorderGuardDoc("");
    }
    if (fileName === "boat") {
      setBoatDocumentationsAndLicensesDoc("");
    }
  };

  const handleDoubleClick = (fileInputId) => {
    const fileInput = document.getElementById(fileInputId);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleButtonClick = () => {
    // Clear error message
    setErrorMsg("");

    if (ministryOfTransDoc !== "") {
      if (generalDireOfBorderGuardDoc !== "") {
        if (boatDocumentationsAndLicensesDoc !== "") {
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
      } else {
        setErrorMsg("Please select an image");
      }
    } else {
      setErrorMsg("Please select an image");
    }
  };

  const handleCallBack = (name) => {
    if (name === "Home") {
      navigate(-1);
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "Boat Offers") {
      //   navigate("/home");
    } else if (name === "My Listings") {
      //   navigate("/myListings");
    } else if (name === "List a Boat Offer") {
      //   navigate("/home");
    }
  };

  return (
    <>
      <HeaderContent
        contentname1={"Home"}
        contentname2={"Boat Offers"}
        contentname3={"My Listings"}
        contentname4={"List a Boat Offer"}
        handleBack={handleCallBack}
        // showLoginSignUp={true}
      />
      <div style={containerStyle}>
        <div style={headingStyle}>
          <Typography style={headingTextStyle}>
            Show off your boat in few clicks!
          </Typography>
        </div>
        <div style={formContainerStyle}>
          <div style={stepContainerStyle}>
            <Typography style={stepNumberStyle}>Step 1</Typography>
            <div style={dividerStyle} />
            {/* Ministry of Transport Documentations */}
            <div style={documentSectionStyle}>
              <Typography style={documentSectionHeadingStyle}>
                Ministry of Transport Documentations
              </Typography>
              <Typography style={documentSectionDescriptionStyle}>
                Please upload all official documentations issued/licensed by The
                Ministry of Transport.
              </Typography>
              <div
                style={{
                  ...fileInputContainerStyle,
                  border:
                    ministryOfTransDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
              >
                {ministryOfTransDoc ? (
                  <div style={uploadedFileContainerStyle}>
                    {ministryOfTransDoc?.type === "application/pdf" ? (
                      <img alt="pdf" src={IMAGES.PDF} style={showSelectedImg} />
                    ) : (
                      <img
                        alt="img"
                        src={URL.createObjectURL(ministryOfTransDoc)}
                        style={showSelectedImg}
                      />
                    )}
                    <Typography>{ministryOfTransDoc?.name}</Typography>
                    <Button
                      onClick={() => removeFile("ministry")}
                      style={removeFileButtonStyle}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="ministryOfTransInput"
                      onDoubleClick={() =>
                        handleDoubleClick("ministryOfTransInput")
                      }
                    >
                      <div
                        id="dropArea"
                        style={fileUploadLabelStyle}
                        onDrop={(e) => handleDrop(e, "ministryOfTrans")}
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          style={fileUploadIconStyle}
                        />
                        <Typography style={fileUploadTextContainerStyle}>
                          Drag file to upload, or
                        </Typography>
                        <Typography style={fileUploadButtonStyle}>
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
            <div style={documentSectionStyle}>
              <Typography style={documentSectionHeadingStyle}>
                General Directorate of Border Guard
              </Typography>
              <Typography style={documentSectionDescriptionStyle}>
                Please upload all official documentations issued/licensed by The
                General Directorate of Border Guard
              </Typography>
              <div
                style={{
                  ...fileInputContainerStyle,
                  border:
                    generalDireOfBorderGuardDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
              >
                {generalDireOfBorderGuardDoc ? (
                  <div style={uploadedFileContainerStyle}>
                    {generalDireOfBorderGuardDoc?.type === "application/pdf" ? (
                      <img alt="pdf" src={IMAGES.PDF} style={showSelectedImg} />
                    ) : (
                      <img
                        alt="img"
                        src={URL.createObjectURL(generalDireOfBorderGuardDoc)}
                        style={showSelectedImg}
                      />
                    )}
                    <Typography>{generalDireOfBorderGuardDoc?.name}</Typography>
                    <Button
                      onClick={() => removeFile("general")}
                      style={removeFileButtonStyle}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="generalDireOfBorderGuardInput"
                      onDoubleClick={() =>
                        handleDoubleClick("generalDireOfBorderGuardInput")
                      }
                    >
                      <div
                        id="dropArea"
                        style={fileUploadLabelStyle}
                        onDrop={(e) =>
                          handleDrop(e, "generalDireOfBorderGuard")
                        }
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          style={fileUploadIconStyle}
                        />
                        <Typography style={fileUploadTextContainerStyle}>
                          Drag file to upload, or
                        </Typography>
                        <Typography style={fileUploadButtonStyle}>
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
            <div style={documentSectionStyle}>
              <Typography style={documentSectionHeadingStyle}>
                Boat Documentations and licenses
              </Typography>
              <Typography style={documentSectionDescriptionStyle}>
                Please upload the boat's documentations, licenses, and
                permission to sail
              </Typography>
              <div
                style={{
                  ...fileInputContainerStyle,
                  border:
                    boatDocumentationsAndLicensesDoc === "" && errorMsg
                      ? "2px dashed red"
                      : "1px dashed rgba(66, 70, 81, 0.3)",
                }}
              >
                {boatDocumentationsAndLicensesDoc ? (
                  <div style={uploadedFileContainerStyle}>
                    {boatDocumentationsAndLicensesDoc?.type ===
                    "application/pdf" ? (
                      <img alt="pdf" src={IMAGES.PDF} style={showSelectedImg} />
                    ) : (
                      <img
                        alt="img"
                        src={URL.createObjectURL(
                          boatDocumentationsAndLicensesDoc
                        )}
                        style={showSelectedImg}
                      />
                    )}
                    <Typography>
                      {boatDocumentationsAndLicensesDoc?.name}
                    </Typography>
                    <Button
                      onClick={() => removeFile("boat")}
                      style={removeFileButtonStyle}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="boatDocumentationsAndLicensesInput"
                      onDoubleClick={() =>
                        handleDoubleClick("boatDocumentationsAndLicensesInput")
                      }
                    >
                      <div
                        id="dropArea"
                        style={fileUploadLabelStyle}
                        onDrop={(e) =>
                          handleDrop(e, "boatDocumentationsAndLicenses")
                        }
                        onDragOver={handleDragOver}
                      >
                        <img
                          src={IMAGES.UP_ARROW_IMG}
                          alt="up-arrow"
                          style={fileUploadIconStyle}
                        />
                        <Typography style={fileUploadTextContainerStyle}>
                          Drag file to upload, or
                        </Typography>
                        <Typography style={fileUploadButtonStyle}>
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
            <div style={saveContinueButtonStyle}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
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
      <Footer />
    </>
  );
};

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
  width: "70%",
};

const stepContainerStyle = {
  display: "flex",
  flexDirection: "column",
};

const stepNumberStyle = {
  fontSize: "35px",
  fontFamily: "Poppins",
  color: "#424651",
  fontWeight: "bold",
  lineHeight: 1.51,
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
};

const documentSectionHeadingStyle = {
  fontSize: "30px",
  fontFamily: "Poppins",
  color: "#424651",
  fontWeight: "normal",
  lineHeight: 1.53,
};

const documentSectionDescriptionStyle = {
  marginTop: "20px",
  fontSize: "20px",
  fontFamily: "Poppins",
  color: "#424651",
  fontWeight: "normal",
  lineHeight: 1.5,
};

const fileInputContainerStyle = {
  marginTop: "70px",
  alignItems: "center",
  display: "flex",
  borderStyle: "dashed",
  borderColor: "rgba(66, 70, 81, 0.3)",
  borderRadius: "10px",
  borderWidth: 1,
  cursor: "pointer",
  paddingTop: "30px",
  paddingBottom: "30px",
  paddingLeft: "40px",
  paddingRight: "40px",
  justifyContent: "center",
  height: "193px",
};

const uploadedFileContainerStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const removeFileButtonStyle = {
  marginLeft: "20px",
};

const fileUploadLabelStyle = {
  display: "flex",
  flex: 1,
  // alignSelf: "center",
  alignItems: "center",
  // justifyContent: "center",
  // alignContent: "center",
  // backgroundColor: "red",
};

const fileUploadIconStyle = {
  width: 70,
  height: 70,
  // borderWidth: 3,
  // borderColor: "#3973A5",
  // borderStyle: "solid",
  // borderRadius: 30,
  // padding: "8px",
};

const fileUploadTextContainerStyle = {
  marginLeft: "70px",
  fontSize: "20px",
  fontFamily: "Poppins",
  color: "#424651",
  textAlign: "center",
};

const fileUploadButtonStyle = {
  marginLeft: "70px",
  fontSize: "18px",
  color: "white",
  textAlign: "center",
  backgroundColor: "#3973A5",
  paddingTop: "12px",
  paddingBottom: "12px",
  paddingLeft: "20px",
  paddingRight: "20px",
  fontFamily: "Poppins",
  borderRadius: "15px",
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

const showSelectedImg = {
  width: "100px",
  height: "100px",
  marginRight: "100px",
};
