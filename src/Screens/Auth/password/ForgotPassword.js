import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../Images";
import { toast } from "react-toastify";
import { forgot_password_request } from "../../../Service/api";
import { EmailId } from "../../../redux/slices";
import Loader from "../../Loader";
import "./ForgotPassword.css";

const start_space_Validation = new RegExp(/^(?!\s).*/);

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const [emailAddress, setEmailAddress] = useState(user?.emailId ?? "");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setErrorMsg("");
    toast.dismiss();
    setIsLoading(true);
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
          dispatch(EmailId(emailAddress));
          setIsLoading(false);
        } else {
          setErrorMsg(res?.data?.message);
          toast.error(res?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("forgot pwd request err", err);
        setIsLoading(false);
        toast.error("Something went wrong. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="pwd-full-box">
      {isLoading ? <Loader loading={isLoading} /> : null}
      <div className="icon-div">
        <Grid
          item
          className="top-back-button"
          onClick={() => {
            dispatch(EmailId(null));
            navigate(-1);
          }}
        >
          <img src={IMAGES.LEFT_BACK_BUTTON} className="back-icon" alt="Back" />
        </Grid>
        <img src={IMAGES.APP_ICON} alt="ICON" className="app-icon-style" />
      </div>
      <div className="box-body">
        <Container className="container-body">
          <Grid container direction="column">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="back-content"
            >
              <img
                src={IMAGES.LEFT_BACK_BUTTON}
                className="back-icon"
                alt="Back"
              />
              <Typography variant="subtitle1" className="back-txt">
                Back
              </Typography>
            </div>

            <div className="inside-body">
              <Typography className="page-title-txt">
                Forgot Password
              </Typography>

              <Typography className="page-info-txt">
                Enter the email address associated with your account and we`ll
                send you a verification code to reset your password
              </Typography>
              <div className="show-txt-filed">
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
                  style={{ width: "100%" }}
                />
                {errorMsg ? (
                  <Typography
                    style={{
                      // marginTop: "48px",
                      color: "#DC143C",
                      fontSize: 12,
                    }}
                  >
                    {errorMsg}
                  </Typography>
                ) : null}
              </div>
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="submit-btn"
              >
                Continue
              </Button>
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
