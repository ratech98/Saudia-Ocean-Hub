import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resend_otp, verifyOtp } from "../../../Service/api";
import { EmailId, confirmTickMsg, verifyOTP } from "../../../redux/slices";
import IMAGES from "../../Images";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import "./VerifyOTP.css";
import { Container } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useOtpInputRefs = (length) => {
  const inputRefs = React.useMemo(() => {
    return Array(length)
      .fill()
      .map(() => React.createRef());
  }, [length]);

  return inputRefs;
};

const VerifyOTP = () => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const inputRefs = useOtpInputRefs(6);
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [showResend, setShowResend] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values) => {
    setIsLoading(true);
    setErrorMsg("");
    toast.dismiss();
    const otp = inputRefs.map((ref) => ref.current.value).join("");
    if (otp?.length >= 6) {
      let payload = {
        email: user?.emailId,
        otp: otp,
      };
      // console.log("payload", payload);
      verifyOtp(payload)
        .then((res) => {
          // console.log("res", res);
          if (res?.data?.message === "User Verified successfully") {
            if (!user?.password) {
              dispatch(EmailId(null));
            }
            dispatch(verifyOTP("VERIFY_OTP"));
            // navigate("/LogIn");
            dispatch(
              confirmTickMsg({
                title:
                  "Your account has been created successfully, Please login!",
                buttonName: "Go to login",
              })
            );

            navigate("/confirmation");

            toast.success(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          } else {
            setErrorMsg(res?.data?.message);

            toast.error(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("err", err);

          toast.error("Something went wrong. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        });
    } else {
      setIsLoading(false);

      toast.error("Please enter your OTP", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
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

  const startCountdown = () => {
    ResentOTP();
    setErrorMsg("");
    setShowResend(false);
    let timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      setShowResend(true);
      setCountdown(60);
    }, 60000);
  };

  const ResentOTP = () => {
    let payload = {
      email: user?.emailId,
    };
    console.log("payload", payload);
    resend_otp(payload)
      .then((res) => {
        console.log("res", res);
        inputRefs.forEach((ref) => {
          ref.current.value = "";
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="verify-otp-full-container">
      {isLoading ? <Loader loading={isLoading} /> : null}
      <div
        className="icon-div"
        // style={{ backgroundColor: "red" }}
      >
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
      <div className="body-content">
        <Container className="verify-otp-body-container">
          <Grid container direction="column">
            <Grid
              item
              className="back-button"
              onClick={() => {
                dispatch(EmailId(null));
                navigate(-1);
              }}
            >
              <img
                src={IMAGES.LEFT_BACK_BUTTON}
                className="back-icon"
                alt="Back"
              />
              <Typography variant="subtitle1" className="back-txt">
                Back
              </Typography>
            </Grid>

            <div className="inside-content-box">
              <img
                src={IMAGES.VERIFY_ACC}
                alt="Verify Acc"
                style={{}}
                // className="verify-acc-icon"
                className={class_name.verified_img}
              />

              <Typography
                // className="please-txt"
                className={class_name.pageTitle}
              >
                Please Verify Account
              </Typography>

              <Typography
                // className="enter-code-txt"
                className={class_name.page_info_txt}
              >
                Enter the six-digit code we sent to your email to verify your
                new account
              </Typography>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                marginTop={"20px"}
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
              <div className="end-content-div">
                {errorMsg ? (
                  <Typography className="error-msg-txt">{errorMsg}</Typography>
                ) : null}

                {showResend ? (
                  <Typography
                    variant="contained"
                    onClick={startCountdown}
                    style={
                      {
                        // color: "#3973a5",
                        // marginTop: errorMsg ? "18px" : "48px",
                        // textAlign: "center",
                        // borderRadius: "5px",
                        // fontSize: 14,
                        // marginBottom: "25px",
                      }
                    }
                    className="resend-txt"
                  >
                    Resend OTP
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    style={{
                      color: "#3973a5",
                      marginTop: errorMsg ? "18px" : "48px",
                      textAlign: "center",
                      borderRadius: "5px",
                      fontSize: 14,
                      marginBottom: "25px",
                    }}
                  >
                    Resend OTP in {countdown} seconds
                  </Typography>
                )}
                <div
                  style={{
                    // backgroundColor: "red",
                    display: "flex",
                    alignItems: "flex-end",
                    alignContent: "center",
                    height: "100%",
                  }}
                >
                  <Button onClick={handleSubmit} className="btn-style">
                    Verify & Continue
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default VerifyOTP;

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    // width: "442px",
    // height: "56px",
    margin: "8px",
    fontSize: "clamp(14px, 3vw, 40px)",
    fontFamily: "Poppins",
    // fontSize: "40px",
    fontWeight: "600",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1,
    letterSpacing: "normal",
    textAlign: "center",
    color: "var(--charcoal-grey-87)",
  },
  page_info_txt: {
    // width: "784px",
    // height: "31px",
    margin: "8px 0 0",
    fontFamily: "Poppins",
    // fontSize: "22px",
    fontSize: "clamp(10px, 1vw, 22px)",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.82,
    letterSpacing: "normal",
    textAlign: "center",
    color: "var(--charcoal-grey-87)",
  },

  verified_img: {
    width: "clamp(165px, 30vw, 260px)", // Adjust the range as needed
    height: "clamp(145px, 30vh, 220px)", // Adjust the range as needed
  },
}));
