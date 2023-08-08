import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
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
import Loader from "../../Loader";
import "./ChangePassword.css";
import { Container } from "react-bootstrap";

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
  const [isLoader, setIsLoader] = useState(false);

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
    toast.dismiss();
    setErrorMsg("");
    if (password !== "") {
      if (password?.length >= 8) {
        if (confirmPassword === password) {
          let payload = {
            email: user?.emailId,
            password: password,
          };
          console.log("payload", payload);
          setIsLoader(true);
          set_new__password(payload)
            .then((res) => {
              console.log("res", res);
              if (res?.data?.message === "Password updated successfully") {
                toast.success(res?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });
                navigate("/logIn");
                setIsLoader(false);
              } else {
                console.log("enter else");
                setErrorMsg(res?.data?.message);
                toast.error(res?.data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });
                setIsLoader(false);
              }
            })
            .catch((err) => {
              console.log("err", err);
              setIsLoader(false);
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
    <div className="full-box">
      {isLoader ? <Loader loading={isLoader} /> : null}
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
        <Container className="container-body">
          <div className="container-inside-box">
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
                Change Password
              </Typography>

              <Typography className="page-info-txt">
                Enter new password
              </Typography>

              {/* Password */}
              <Container className="text-filed-container">
                <div className="pwd-filed">
                  <CustomTextField
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    fullWidth
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
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingRight: "8px",
                          }}
                        >
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </div>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      className: "input-txt",
                    }}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid rgba(66, 70, 81, 0.4)",
                      backgroundColor: "lightblue",
                    }}
                  />

                  {/* Confirm Password */}
                  <CustomTextField
                    type="password"
                    margin="normal"
                    fullWidth
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
                      className: "input-txt",
                    }}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid rgba(66, 70, 81, 0.4)",
                      backgroundColor: "lightblue",
                    }}
                  />
                </div>
              </Container>

              {password ? (
                <div className="pwd-strength-div">
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
                      contain at least 1 lowercase letter, 1 capital letter, 1
                      number, and 1 special character.
                    </Typography>
                  </div>
                </div>
              ) : null}

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

              <Button onClick={handleSubmit} className="submit-btn">
                Continue
              </Button>

              {errorMsg ? (
                <Typography
                  style={{ marginTop: "48px", color: "#DC143C", fontSize: 12 }}
                >
                  {errorMsg}
                </Typography>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

const styles = {
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
    backgroundColor: "#fff",
    borderRadius: "5px",
    paddingLeft: "15px",
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
