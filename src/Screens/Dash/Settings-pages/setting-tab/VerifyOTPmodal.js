import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const useOtpInputRefs = (length) => {
  const inputRefs = React.useMemo(() => {
    return Array(length)
      .fill()
      .map(() => React.createRef());
  }, [length]);

  return inputRefs;
};

export const VerifyOTPmodal = ({ handleModalClose }) => {
  const inputRefs = useOtpInputRefs(6);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContentClick = (event) => {
    // Prevent propagation of click events to the parent elements
    event.stopPropagation();
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
      setErrorMsg("");
    }
  };

  const handleInputBackspace = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      if (inputRefs[index].current.value === "") {
        inputRefs[index - 1].current.focus();
      } else {
        inputRefs[index].current.value = "";
      }
    }
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleModalClose}>
        <div
          className="modal-content"
          onClick={handleContentClick}
          style={{
            maxWidth: "60%",
            padding: "0px 0px 50px 0px",
            backgroundColor: "white",
          }}
        >
          <Typography
            style={{
              fontSize: "26px",
              fontWeight: "bolder",
              textAlign: "center",
              padding: "50px 0px",
            }}
          >
            Verify Phone Number
          </Typography>

          <Typography
            style={{
              fontSize: "22px",
              fontWeight: "bolder",
              textAlign: "center",
            }}
          >
            Keep your account more secure
          </Typography>

          <Typography
            style={{
              fontSize: "22px",
              fontWeight: "normal",
              textAlign: "center",
            }}
          >
            We have sent you a six digit code to mobile number **********
          </Typography>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              margin: "50px 0px",
            }}
          >
            {inputRefs.map((ref, index) => (
              <Grid item key={index}>
                <TextField
                  variant="outlined"
                  type="text"
                  // type="password"
                  inputProps={{ maxLength: 1 }}
                  inputRef={ref}
                  className="opt-text-filed"
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 10px 20px 0px",
                    fontSize: "20px",
                    textAlign: "center",
                    /* background-color: red; */
                    padding: "0",
                  }}
                  onChange={(event) => handleInputChange(event, index)}
                  onKeyDown={(event) => handleInputBackspace(event, index)}
                  InputProps={{
                    style: {
                      textAlign: "center",
                      borderRadius: "5px",
                      border: errorMsg ? ".1px ridge red" : null,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              justifyContent: "flex-end",

              width: "60%",
              //   backgroundColor: "lightseagreen",
            }}
          >
            <div
              style={{
                // backgroundColor: "lightsalmon",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "30%",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "normal",
                  textAlign: "center",
                  // marginRight: "35px",
                }}
                onClick={handleModalClose}
              >
                Cancel
              </Typography>
              <Button style={{ padding: "0px", margin: "0px" }}>Verify</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
