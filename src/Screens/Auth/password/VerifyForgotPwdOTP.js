import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import IMAGES from "../../Images";
import { verify_forgotpass_otp } from "../../../Service/api";
import Loader from "../../Loader";
import "./VerifyForgotPwdOTP.css";

const useOtpInputRefs = (length) => {
  const inputRefs = React.useMemo(() => {
    return Array(length)
      .fill()
      .map(() => React.createRef());
  }, [length]);

  return inputRefs;
};

export const VerifyForgotPwdOTP = () => {
  const inputRefs = useOtpInputRefs(6);
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  // const navigate = useHistory();
  // const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  // const [showResend, setShowResend] = useState(true);
  // const [countdown, setCountdown] = useState(60);
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
      console.log("verify_forgotpass_otp payload", payload);

      verify_forgotpass_otp(payload)
        .then((res) => {
          console.log("verify_forgotpass_otp res", res);
          if (res?.data?.message === "otp verified successfully") {
            toast.success(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
            navigate("/changePassword");
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
          console.log("verify_forgotpass_otp err", err);
          setIsLoading(false);
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

  // const ResentOTP = () => {
  //   let payload = {
  //     email: user?.emailId,
  //   };
  //   console.log("payload", payload);
  //   // resend_otp(payload)
  //   //   .then((res) => {
  //   //     console.log("res", res);
  //   //     inputRefs.forEach((ref) => {
  //   //       ref.current.value = "";
  //   //     });
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log("err", err);
  //   //   });
  // };

  return (
    <div style={{}} className="full-box">
      {isLoading ? <Loader loading={isLoading} /> : null}
      <div className="icon-div">
        <Grid
          item
          className="top-back-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={IMAGES.LEFT_BACK_BUTTON} className="back-icon" alt="Back" />
        </Grid>
        <img src={IMAGES.APP_ICON} alt="ICON" className="app-icon-style" />
      </div>
      <div className="box-body">
        <Container
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
              <Typography className="page-info-txt">
                Enter the six-digit code we sent to your email to verify your
                authentication
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
                      style={{
                        width: "50px",
                        // height: "40px",
                        marginRight: "20px",
                        fontSize: "20px",
                        textAlign: "center",
                        borderRadius: "5px",
                      }}
                      onChange={(event) => {
                        handleInputChange(event, index);
                      }}
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

              {errorMsg ? (
                <Typography
                  style={{ marginTop: "48px", color: "#DC143C", fontSize: 12 }}
                >
                  {"Invalid Otp, Please try again"}
                </Typography>
              ) : null}

              {/* {showResend ? (
                <Typography
                  variant="contained"
                  onClick={startCountdown}
                  style={{
                    color: "#3973a5",
                    marginTop: errorMsg ? "18px" : "48px",
                    textAlign: "center",
                    borderRadius: "5px",
                    fontSize: 14,
                    marginBot: "25px",
                  }}
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
              )} */}

              <Button onClick={handleSubmit} className="submit-btn">
                Verify & Continue
              </Button>
            </div>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
