import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../../Images";
import { boatRegisterStep1 } from "../../../../redux/slices";

export const BoatOfferStep1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dash = useSelector((state) => state?.auth);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgShowIn, setErrorMsgShowIn] = useState("");
  const [ministryOfTransDoc, setMinistryOfTransDoc] = useState("");
  const [ministryOfTransName, setMinistryOfTransName] = useState("");
  const [generalDireOfBorderGuardDoc, setGeneralDireOfBorderGuardDoc] =
    useState("");
  const [generalDireOfBorderGuardName, setGeneralDireOfBorderGuardName] =
    useState("");
  const [
    boatDocumentationsAndLicensesDoc,
    setBoatDocumentationsAndLicensesDoc,
  ] = useState("");
  const [
    boatDocumentationsAndLicensesName,
    setBoatDocumentationsAndLicensesName,
  ] = useState("");

  //
  //
  //
  //
  //
  //
  const handleFileSelect = (files, fileType) => {
    if (files && files[0]) {
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf", "docx"];
      const selectedFile = files[0];
      const fileName = files[0]?.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      console.log("selectedFile", selectedFile);

      if (allowedExtensions.includes(fileExtension)) {
        const reader = new FileReader();
        reader.onload = function (e) {
          console.log("e", e);
          const fileData = e.target.result;
          switch (fileType) {
            case "ministryOfTrans":
              setMinistryOfTransName(fileName);
              setMinistryOfTransDoc(selectedFile);
              break;
            case "generalDireOfBorderGuard":
              setGeneralDireOfBorderGuardName(fileName);
              setGeneralDireOfBorderGuardDoc(fileData);
              break;
            case "boatDocumentationsAndLicenses":
              setBoatDocumentationsAndLicensesName(fileName);
              setBoatDocumentationsAndLicensesDoc(fileData);
              break;
            default:
              break;
          }
        };
        reader.readAsDataURL(selectedFile);
      } else {
        console.log(
          "Invalid file extension. Please select a file with extensions: jpg, jpeg, png"
        );
      }
    }
  };

  function handleDrop(event, handlebyName) {
    event.preventDefault();
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

  const removeFile = () => {
    setMinistryOfTransDoc("");
  };

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#3973A5"),
      backgroundColor: "#3973A5",
      "&:hover": {
        backgroundColor: "#205682",
      },
    },
  }))(Button);

  const handleDoubleClick = (fileInputId) => {
    const fileInput = document.getElementById(fileInputId);
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
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
            <div style={fileInputContainerStyle}>
              {ministryOfTransDoc ? (
                <div style={uploadedFileContainerStyle}>
                  <Typography>{ministryOfTransName}</Typography>
                  <Button onClick={removeFile} style={removeFileButtonStyle}>
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
                        src={IMAGES.UP_ARROW}
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
                        onChange={(e) =>
                          handleFileSelect(e.target.files, "ministryOfTrans")
                        }
                      />
                    </div>
                  </label>
                </>
              )}
            </div>
            {errorMsgShowIn === "Ministry" ? (
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
            <div style={fileInputContainerStyle}>
              {generalDireOfBorderGuardDoc ? (
                <div style={uploadedFileContainerStyle}>
                  <Typography>{generalDireOfBorderGuardName}</Typography>
                  <Button onClick={removeFile} style={removeFileButtonStyle}>
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
                      onDrop={(e) => handleDrop(e, "generalDireOfBorderGuard")}
                      onDragOver={handleDragOver}
                    >
                      <img
                        src={IMAGES.UP_ARROW}
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
            {errorMsgShowIn === "General" ? (
              <Typography style={ErrMsgTxt}>{errorMsg}</Typography>
            ) : null}
          </div>

          {/* Boat Documentations and licenses */}
          <div style={documentSectionStyle}>
            <Typography style={documentSectionHeadingStyle}>
              Boat Documentations and licenses
            </Typography>
            <Typography style={documentSectionDescriptionStyle}>
              Please upload the boat's documentations, licenses, and permission
              to sail
            </Typography>
            <div style={fileInputContainerStyle}>
              {boatDocumentationsAndLicensesDoc ? (
                <div style={uploadedFileContainerStyle}>
                  <Typography>{boatDocumentationsAndLicensesName}</Typography>
                  <Button onClick={removeFile} style={removeFileButtonStyle}>
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
                        src={IMAGES.UP_ARROW}
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
            {errorMsgShowIn === "BoatLicense" ? (
              <Typography style={ErrMsgTxt}>{errorMsg}</Typography>
            ) : null}
          </div>

          {/* Save & Continue */}
          <div style={saveContinueButtonStyle}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (ministryOfTransDoc !== "") {
                  if (generalDireOfBorderGuardDoc !== "") {
                    if (boatDocumentationsAndLicensesDoc !== "") {
                      dispatch(
                        boatRegisterStep1({
                          ministryOfTransportDoc: ministryOfTransDoc,
                          generalDirectorateOfBorderGuardDoc:
                            generalDireOfBorderGuardDoc,
                          boatDocumentationsAndLicenses:
                            boatDocumentationsAndLicensesDoc,
                        })
                      );

                      navigate("/BoatOfferStep2");
                    } else {
                      setErrorMsgShowIn("BoatLicense");
                      setErrorMsg("Please select dec");
                    }
                  } else {
                    setErrorMsgShowIn("General");
                    setErrorMsg("Please select dec");
                  }
                } else {
                  setErrorMsgShowIn("Ministry");
                  setErrorMsg("Please select dec");
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
          <div
            onClick={() => {
              navigate("/BoatOfferStep3");
            }}
          >
            skip
          </div>
        </div>
      </div>
    </div>
  );
};

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
};

const uploadedFileContainerStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
};

const removeFileButtonStyle = {
  marginLeft: "20px",
};

const fileUploadLabelStyle = {
  display: "flex",
  flex: 1,
  alignSelf: "center",
  alignItems: "center",
};

const fileUploadIconStyle = {
  width: 20,
  height: 20,
  borderWidth: 3,
  borderColor: "#3973A5",
  borderStyle: "solid",
  borderRadius: 30,
  padding: "8px",
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
  borderRadius: "4px",
  fontFamily: "Poppins",
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
};
