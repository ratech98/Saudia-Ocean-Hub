import { Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const start_space_Validation = new RegExp(/^(?!\s).*/);

const styles = (theme) => ({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
    [theme.breakpoints.down("sm")]: {
      // Apply styles for small screens
      "& input::placeholder": {
        fontSize: "10px",
        color: "rgba(66, 70, 81, 0.4)", // Change the color for small screens
      },
    },
  },
});

const CustomTextField = withStyles(styles)(TextField);

export const ChangePwdModal = ({ handleModalClose }) => {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContentClick = (event) => {
    // Prevent propagation of click events to the parent elements
    event.stopPropagation();
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
          <Typography className="change-pwd-txt">Change Password</Typography>
          <div
            style={{
              display: "flex",
              alignSelf: "center",
              flexDirection: "column",

              width: "60%",
            }}
          >
            <CustomTextField
              label={"Old Password"}
              className="text-fileds"
              variant="standard"
              margin="normal"
              fullWidth
              name="old pwd"
              placeholder="Old Password"
              value={oldPwd}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (start_space_Validation.test(inputValue)) {
                  setOldPwd(inputValue);
                }
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: "text-field-label",
              }}
              inputProps={{
                className: "text-field-inputs",
                onFocus: (event) => {
                  event.target.style.border = "solid 1px blue";
                },
                onBlur: (event) => {
                  event.target.style.border = "solid 1px rgba(66, 70, 81, 0.2)";
                },
              }}
            />
            <CustomTextField
              label={"New Password"}
              className="text-fileds"
              variant="standard"
              margin="normal"
              fullWidth
              name="New Password"
              placeholder="New Password"
              value={newPwd}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (start_space_Validation.test(inputValue)) {
                  setNewPwd(inputValue);
                }
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: "text-field-label",
              }}
              inputProps={{
                className: "text-field-inputs",
                onFocus: (event) => {
                  event.target.style.border = "solid 1px blue";
                },
                onBlur: (event) => {
                  event.target.style.border = "solid 1px rgba(66, 70, 81, 0.2)";
                },
              }}
            />
            <CustomTextField
              label={"Confirm New Password"}
              className="text-fileds"
              variant="standard"
              margin="normal"
              fullWidth
              name="Confirm New Password"
              placeholder="Confirm New Password"
              value={confirmPwd}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (start_space_Validation.test(inputValue)) {
                  setConfirmPwd(inputValue);
                }
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                },
              }}
              InputLabelProps={{
                shrink: true,
                className: "text-field-label",
              }}
              inputProps={{
                className: "text-field-inputs",
                onFocus: (event) => {
                  event.target.style.border = "solid 1px blue";
                },
                onBlur: (event) => {
                  event.target.style.border = "solid 1px rgba(66, 70, 81, 0.2)";
                },
              }}
            />
            <div
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "flex-end",
                width: "100%",
                // backgroundColor: "lightseagreen",
                marginTop: "84px",
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
                <Button style={{ padding: "0px", margin: "0px" }}>
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
