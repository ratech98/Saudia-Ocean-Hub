import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resend_otp, verifyOtp } from "../../Service/api";
import { EmailId, verifyOTP } from "../../redux/slices";
import IMAGES from "../Images";
import { toast } from "react-toastify";

const useOtpInputRefs = (length) => {
  const inputRefs = React.useMemo(() => {
    return Array(length)
      .fill()
      .map(() => React.createRef());
  }, [length]);

  return inputRefs;
};

const VerifyOTP = () => {
  const inputRefs = useOtpInputRefs(6);
  const user = useSelector((state) => state?.auth);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  // const navigate = useHistory();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [showResend, setShowResend] = useState(true);
  const [countdown, setCountdown] = useState(60);

  const handleSubmit = (values) => {
    setErrorMsg("");
    const otp = inputRefs.map((ref) => ref.current.value).join("");
    let payload = {
      email: user?.emailId,
      otp: otp,
    };
    console.log("payload", payload);
    verifyOtp(payload)
      .then((res) => {
        console.log("res", res);
        if (res?.data?.message === "User Verified successfully") {
          if (!user?.password) {
            dispatch(EmailId(null));
          }

          dispatch(verifyOTP("VERIFY_OTP"));
          navigate("/LogIn");
        } else {
          console.log("enter else");
          setErrorMsg(res?.data?.message);
          toast.error(res?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
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

  // useEffect(() => {
  //   window.history.forward();
  //   const handleNoBack = () => {
  //     window.history.forward();
  //   };
  //   window.addEventListener("popstate", handleNoBack);

  //   return () => {
  //     window.removeEventListener("popstate", handleNoBack);
  //   };
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", handleBackPress);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBackPress);
  //   };
  // }, []);

  // const handleBackPress = useCallback((event) => {
  //   event.preventDefault();
  //   const confirmation = window.confirm(
  //     "Hold on! Are you sure you want to exit the app?"
  //   );
  //   if (confirmation) {
  //     // Perform actions when user confirms exit
  //     // For example, you can call a function to exit the app
  //     // exitApp();
  //   }
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {

  //       return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, [

  //   ]),
  // );

  // React.useEffect(
  //   () =>
  //     navigate.addListener("beforeRemove", (e) => {
  //       if (false) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }

  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Discard",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigate.dispatch(e.data.action),
  //           },
  //         ]
  //       );
  //     }),
  //   []
  // );

  // const handleBeforeRemove = (location) => {
  //   if (false) {
  //     // If we don't have unsaved changes, then we don't need to do anything
  //     return true;
  //   }

  //   // Prompt the user before leaving the screen
  //   return window.confirm(
  //     "You have unsaved changes. Are you sure to discard them and leave the screen?"
  //   );
  // };

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
          // marginTop: "24px",
        }}
      />
      <div
        style={{
          display: "flex",
        }}
      >
        <Container
          sx={{}}
          style={{
            backgroundColor: "white",
            width: "65%",
            display: "flex",
            justifyContent: "center",
            // alignSelf: "center",
            // alignItems: "center",
            // alignContent: "center",
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
                dispatch(EmailId(null));
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
                  fontFamily: "inherit",
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
                alignItems: "center",
              }}
            >
              <img
                src={IMAGES.VERIFY_ACC}
                alt="Verify Acc"
                style={{ width: "260px", height: "220px" }}
              />

              <Typography
                variant="h4"
                sx={{
                  // marginTop: "24px",
                  fontSize: "40px",
                  fontFamily: "inherit",
                  fontWeight: "550",
                  // color: "rgba(66, 70, 81, 0.87)",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Please Verify Account
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  marginTop: "8px",
                  fontSize: "22px",
                  fontFamily: "inherit",
                  fontWeight: "normal",
                  color: "rgba(66, 70, 81, 0.87)",
                  textAlign: "center",
                }}
              >
                Enter the six-digit code we sent to your email to verify your
                new account
              </Typography>

              <Grid
                container
                justifyContent="center"
                alignItems="center"
                marginTop={"20px"}
                // sx={{ marginTop: "48px" }}
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
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        fontSize: "20px",
                        textAlign: "center",
                      }}
                      onChange={(event) => handleInputChange(event, index)}
                      onKeyDown={(event) => handleInputBackspace(event, index)}
                    />
                  </Grid>
                ))}
              </Grid>

              {errorMsg ? (
                <Typography
                  style={{ marginTop: "48px", color: "#DC143C", fontSize: 12 }}
                >
                  {errorMsg}
                </Typography>
              ) : null}

              {showResend ? (
                <Typography
                  variant="contained"
                  onClick={startCountdown}
                  style={{
                    color: "#3973a5",
                    marginTop: errorMsg ? "18px" : "48px",
                    textAlign: "center",
                    borderRadius: "5px",
                    fontSize: 14,
                    marginBottom: "25px",
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
              )}

              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ backgroundColor: "#3973a5" }}
                sx={{
                  color: "white",
                  // padding: "10px",
                  // width: "30%",
                  textAlign: "center",
                  borderRadius: "5px",
                  fontSize: 24,
                  marginBottom: "25px",
                  paddingLeft: "100px",
                  paddingRight: "100px",
                }}
              >
                Verify & Continue
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default VerifyOTP;
