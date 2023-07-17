import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import IMAGES from "../../Images";
import { toast } from "react-toastify";
import { withStyles } from "@mui/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { set_new__password } from "../../../Service/api";

const start_space_Validation = new RegExp(/^(?!\s).*/);

const CustomTextField = withStyles({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
  },
})(TextField);

const regexPatterns = [
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[0-9]/, // At least 1 number
  /[!@#$%^&*]/, // At least 1 special character
];

export const ChangePassword = () => {
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorPwdNotSame, setErrorPwdNotSame] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strengthIndicator, setStrengthIndicator] = useState(false);

  useEffect(() => {
    let conditionsMet = 0;
    regexPatterns.forEach((pattern) => {
      if (pattern.test(password)) {
        conditionsMet++;
      }
    });
    // Determine the password strength indicator based on the number of conditions met
    if (password.length >= 8 && conditionsMet === 4) {
      setStrengthIndicator("green"); // All conditions met
    } else if (password.length >= 8 && conditionsMet >= 3) {
      setStrengthIndicator("yellow"); // At least 4 conditions met
    } else {
      setStrengthIndicator("red"); // Less than 3 conditions met
    }
  }, [password]);

  useEffect(() => {
    if (password === confirmPassword) {
      setErrorPwdNotSame(false);
    } else {
      setErrorPwdNotSame(true);
    }
  }, [confirmPassword, password]);

  const handleSubmit = (values) => {
    setErrorMsg("");
    if (password !== "") {
      if (password?.length >= 8) {
        if (confirmPassword === password) {
          let payload = {
            email: user?.emailId,
            password: password,
          };
          console.log("payload", payload);

          set_new__password(payload)
            .then((res) => {
              console.log("res", res);
              if (res?.data?.message === "Password updated successfully") {
                toast.success(res?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });
                navigate("/logIn");
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
        } else {
          toast.error(
            "Please enter your confirm password, Password must be same",
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            }
          );
        }
      } else {
        toast.error("The minimum password length is 8 characters ", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } else {
      toast.error("Please enter your password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
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
                sx={{
                  fontSize: "40px",
                  fontFamily: "Poppins",
                  fontWeight: "550",
                  color: "black",
                  textAlign: "center",
                }}
              >
                Change Password
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
                Enter new password
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Grid container style={styles.fieldDevLast}>
                  <Grid container style={styles.pwd_confirmDev}>
                    {/* Password */}
                    <div
                      style={{
                        ...styles.pwdDev,
                      }}
                    >
                      <CustomTextField
                        type={showPassword ? "text" : "password"}
                        margin="normal"
                        fullWidth
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          if (start_space_Validation.test(inputValue)) {
                            setPassword(inputValue);
                          }
                        }}
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            backgroundColor: "white",
                            borderRadius: "5px",
                          },
                          endAdornment: (
                            <InputAdornment>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  paddingRight: "8px",
                                }}
                              >
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{
                                    top: -5,
                                  }}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </div>
                            </InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            ...styles.pwdStyles,
                          },
                        }}
                      />
                    </div>
                    {/* {formik.touched.password && Boolean(formik.errors.password) ? (
                <span style={styles.ErrorMsgTxt}>
                  {formik.touched.password && formik.errors.password}
                </span>
              ) : null} */}

                    {/* Confirm Password */}
                    <CustomTextField
                      type="password"
                      margin="normal"
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(event) => {
                        const inputValue = event.target.value;
                        if (start_space_Validation.test(inputValue)) {
                          setConfirmPassword(inputValue);
                        }
                      }}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          backgroundColor: "white",
                          borderRadius: "5px",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        style: {
                          ...styles.customTextField,
                        },
                      }}
                    />
                  </Grid>
                  {/* // error={
                      //   formik.touched.confirmPassword &&
                      //   Boolean(formik.errors.confirmPassword)
                      // }
                      // helperText={
                      //   formik.touched.confirmPassword &&
                      //   formik.errors.confirmPassword
                      // } */}
                  {password ? (
                    <Grid container style={styles.pwdPowerDev}>
                      <div>
                        <Typography style={styles.pwdStrengthTxt}>
                          Password Strength{" "}
                          <Typography
                            style={{
                              fontSize: 10,
                              fontFamily: "Poppins",
                              color:
                                strengthIndicator === "red"
                                  ? "red"
                                  : strengthIndicator === "yellow"
                                  ? "#FFAA33"
                                  : strengthIndicator === "green"
                                  ? "green"
                                  : "white",
                            }}
                          >
                            {strengthIndicator === "red"
                              ? "Poor"
                              : strengthIndicator === "yellow"
                              ? "Weak"
                              : strengthIndicator === "green"
                              ? "Good"
                              : null}
                          </Typography>
                        </Typography>
                        <div style={styles.pwdInstructionDev}>
                          <div
                            style={{
                              height: "5px",
                              width:
                                strengthIndicator === "red"
                                  ? "30%"
                                  : strengthIndicator === "yellow"
                                  ? "65%"
                                  : strengthIndicator === "green"
                                  ? "100%"
                                  : "0%",
                              backgroundColor:
                                strengthIndicator === "yellow"
                                  ? "#FFAA33"
                                  : strengthIndicator,
                            }}
                          />
                        </div>
                        <Typography style={styles.pwdInstructionTxt}>
                          The minimum password length is 8 characters and must
                          contain at least 1 lowercase letter, 1 capital letter,
                          1 number, and 1 special character.
                        </Typography>
                      </div>
                    </Grid>
                  ) : null}
                </Grid>
                {errorPwdNotSame && confirmPassword !== "" ? (
                  <Typography
                    style={{
                      fontSize: "20px",
                      fontFamily: "Poppins",
                      fontWeight: "normal",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {"Password must be same"}
                  </Typography>
                ) : null}
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

const styles = {
  fieldDevLast: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
  },
  pwd_confirmDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
    maxWidth: "55%",
    margin: "0 auto",
  },
  pwdDev: {
    backgroundColor: "#fff",
    marginTop: "20px",
    borderRadius: "5px",
    paddingLeft: "15px",
    border: "1px solid rgba(66, 70, 81, 0.4)",
    // backgroundColor: "red",
    // boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    // borderBottom: "none",
    // paddingTop: "1px",
    // paddingBottom: "1px",
    // height: "30px",
  },
  //
  //
  //
  //
  //
  pwdPowerDev: {
    borderColor: "white",
    borderRadius: "5px",
    borderWidth: 1,
    borderStyle: "solid",
    alignSelf: "center",
    flex: 0.5,
    backgroundColor: "white",
    position: "absolute",
    right: "4%",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    boxSizing: "border-box",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    width: "100%",
    maxWidth: "13%",
    height: "auto",
    marginTop: "10px",
    border: "1px solid rgba(66, 70, 81, 0.4)",
  },
  pwdStrengthTxt: {
    color: "#424651",
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "revert",
  },
  pwdInstructionDev: {
    height: "5px",
    width: "100%",
    border: "solid 0.5px rgba(66, 70, 81, 0.3)",
    marginTop: "10px",
    marginBottom: "10px",
  },
  pwdInstructionTxt: {
    color: "#424651",
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight: "normal",
    letterSpacing: 0,
    // lineHeight: 0.2,
  },
  customTextField: {
    fontSize: "16px",
    fontFamily: "Poppins",
    color: "#424651",
    padding: "10px",
    borderBottom: "none",

    // backgroundColor: "red",
    backgroundColor: "#fff",
    marginTop: "20px",
    borderRadius: "5px",
    paddingLeft: "15px",
    border: "1px solid rgba(66, 70, 81, 0.4)",
    height: "30px",
  },
  phoneNoStyles: {
    fontSize: "16px",
    fontFamily: "Poppins",
    color: "#424651",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "5px",
    // backgroundColor: "red",
  },
  pwdStyles: {
    fontSize: "16px",
    fontFamily: "Poppins",
    color: "#424651",
    // borderBottom: "none",
    backgroundColor: "#fff",
    // marginTop: "-6px",
    // padding: "0px",
    borderStyle: "solid",
  },
  ErrorMsgTxt: {
    color: "#DC143C",
    fontSize: 11,
    fontFamily: "Poppins",
    marginTop: "5px",
  },
  endContent: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "55%",
    // marginTop: "15px",
    paddingBottom: "15px",
  },
  btnStyle: {
    width: "100%",
    backgroundColor: "#026b93",
    color: "white",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    padding: "10px",
  },
  loginDev: {
    display: "flex",
    marginTop: "15px",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
  },
  loginTxt: {
    marginLeft: "40px",
    color: "#424651",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "normal",
    textDecoration: "underline",
    textAlign: "center",
  },
  alreadyAcc: {
    color: "#424651",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "normal",
    textAlign: "center",
  },
  BoxDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "55%",
  },
  checkBoxUncheckedstyle: {
    border: "1px solid rgba(66, 70, 81, 0.4)",
    borderRadius: "1px",
    width: "22px",
    height: "22px",
  },
  checkBoxcheckedstyle: {
    color: "#424651",
    border: "1px solid rgba(66, 70, 81, 0.4)",
    borderRadius: "1px",
    width: "22px",
    height: "22px",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
  },
};
