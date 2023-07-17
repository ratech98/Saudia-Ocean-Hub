import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../Images";
import { toast } from "react-toastify";
import { forgot_password_request } from "../../../Service/api";
import { EmailId } from "../../../redux/slices";

const start_space_Validation = new RegExp(/^(?!\s).*/);

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const [emailAddress, setEmailAddress] = useState(user?.emailId ?? "");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (values) => {
    setErrorMsg("");
    let payload = {
      email: emailAddress,
    };
    console.log("forgot pwd request payload", payload);
    forgot_password_request(payload)
      .then((res) => {
        console.log("forgot pwd request res", res);
        if (res?.data?.message === "otp send to email") {
          toast.success(res?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          navigate("/verifyForgotPwdOTP");
        } else {
          setErrorMsg(res?.data?.message);
          toast.error(res?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.log("forgot pwd request err", err);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f6f6f6",
        paddingBottom: "100px",
      }}
    >
      <img
        src={IMAGES.APP_ICON}
        alt="ICON"
        style={{
          marginLeft: "140px",
          width: "200px",
          height: "100px",
        }}
      />
      <div
        style={{
          display: "flex",
          height: "90%",
        }}
      >
        <Container
          sx={{}}
          style={{
            backgroundColor: "white",
            width: "65%",
            display: "flex",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Grid container direction="column">
            <Grid
              item
              sx={{
                marginTop: "20px",
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                alignSelf: "flex-start",
                marginLeft: "10px",
              }}
              onClick={() => {
                // dispatch(EmailId(null));
                navigate(-1);
              }}
            >
              <img
                src={IMAGES.LEFT_BACK_BUTTON}
                style={{
                  width: "14px",
                  height: "18px",
                }}
                alt="Back"
              />
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "20px",
                  fontFamily: "Poppins",
                  fontWeight: "normal",
                  color: "#3973a5",
                  marginLeft: "16px",
                }}
              >
                Back
              </Typography>
            </Grid>

            <Grid
              item
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                // variant="h4"
                sx={{
                  fontSize: "40px",
                  fontFamily: "Poppins",
                  fontWeight: "550",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Forgot Password
              </Typography>

              <Typography
                sx={{
                  fontSize: "24px",
                  fontFamily: "Poppins",
                  fontWeight: "550",
                  color: "black",
                  textAlign: "center",
                  margin: "50px 100px",
                }}
              >
                Enter the email address associated with your account and we`ll
                send you a verification code to reset your password
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <TextField
                  label={"Email"}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Email"
                  value={emailAddress}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      setEmailAddress(inputValue);
                    }
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "15px",
                      borderWidth: ".1px",
                      borderColor: "rgba(66, 70, 81, 0.2)",
                      //   width: "60%",
                      alignSelf: "center",
                    },
                  }}
                />
              </div>
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ backgroundColor: "#3973a5" }}
                sx={{
                  color: "white",
                  textAlign: "center",
                  borderRadius: "15px",
                  fontSize: 24,
                  marginBottom: "25px",
                  paddingLeft: "100px",
                  paddingRight: "100px",
                  margin: "50px 100px",
                }}
              >
                Continue
              </Button>

              {errorMsg ? (
                <Typography
                  style={{ marginTop: "48px", color: "#DC143C", fontSize: 12 }}
                >
                  {errorMsg}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
