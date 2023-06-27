import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../Service/api";
import { EmailId } from "../../redux/slices";
import IMAGES from "../Images";

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
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

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
          navigate("/LogIn");
        } else {
          console.log("enter else");
          setErrorMsg(res?.data?.message);
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

  return (
    <div
      style={{
        width: "100%",
        // height: "100vh",
        backgroundColor: "#f6f6f6",
        paddingBottom: "100px",
      }}
    >
      <img
        src={IMAGES.APP_ICON}
        alt="ICON"
        style={{
          width: "198px",
          height: "98px",
          marginLeft: "140px",
          marginTop: "24px",
        }}
      />
      <div
        style={{
          display: "flex",
        }}
      >
        <Container sx={{}}>
          <Grid
            container
            direction="column"
            style={{ backgroundColor: "white" }}
          >
            <Grid
              item
              sx={{
                marginTop: "20px",
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
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
                  marginLeft: "100px",
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
                style={{ width: "292px", height: "255px" }}
              />

              <Typography
                variant="h4"
                sx={{
                  marginTop: "24px",
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
                sx={{ marginTop: "48px" }}
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
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{ backgroundColor: "#3973a5" }}
                sx={{
                  marginTop: errorMsg ? "18px" : "48px",
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
