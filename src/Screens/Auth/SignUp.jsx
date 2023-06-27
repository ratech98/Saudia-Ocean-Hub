import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { countryCodeJson } from "./countryCodeJson";
import { useDispatch, useSelector } from "react-redux";
import { EmailId } from "../../redux/slices";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignInButton from "./GoogleSignInButton";
import { register } from "../../Service/api";
import IMAGES from "../Images";

const emailIdValidation = new RegExp(
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
);

const CustomTextField = withStyles({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
    },
  },
})(TextField);

// Define the regex patterns for each condition
const regexPatterns = [
  /[a-z]/, // At least 1 lowercase letter
  /[A-Z]/, // At least 1 uppercase letter
  /[0-9]/, // At least 1 number
  /[!@#$%^&*]/, // At least 1 special character
];

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [strengthIndicator, setStrengthIndicator] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCountry, setSelectedCountry] = useState(countryCodeJson[0]); // Set the initial selected country
  const [showModal, setShowModal] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false);
  const [termsOfServiceError, setTermsOfServiceError] = useState(false);
  const [googleResult, setGoogleResult] = useState("");

  // const classes = useStyles();
  // const formMargin = windowWidth <= 500 ? 0 : 50;
  const [errorMessage, setErrorMessage] = useState("");

  console.log("googleResult", googleResult);

  // console.log("user", user);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "email") {
      setIsEmailChecked(checked);
    } else if (name === "termsOfService") {
      setIsTermsOfServiceChecked(checked);
      setTermsOfServiceError(false);
    }
  };

  const handleCountryChange = (values) => {
    const countryCode = values;
    const selectedCountry = countryCodeJson.find(
      (country) => country.code === countryCode
    );
    setSelectedCountry(selectedCountry);
    setShowModal(false);
  };

  const handleCountryCodeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //window Size Calculation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Password strength check conditions
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

  const handleSubmit = async (value) => {
    setErrorMessage("");
    if (isTermsOfServiceChecked) {
      let payload = {
        first_name: value?.firstName,
        last_name: value?.lastName,
        email: value?.email,
        phone_number: value?.cellNo,
        country_code: selectedCountry?.dial_code,
        password: value?.password,
        received_email: isEmailChecked,
        sign_in_type: "EMAIL",
        user_type: "BOAT_OWNER",
      };

      console.log("handleSubmit payload", payload);
      register(payload)
        .then((res) => {
          console.log("register res", res);
          if (res?.data?.success) {
            if (res?.data?.message === "user registered successfully") {
              dispatch(EmailId(value?.email));
              navigate("/VerifyOTP");
            }
          } else {
            console.log("res message ====>>>", res?.data?.message);
            setErrorMessage(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("register err", err);
        });
    } else {
      setTermsOfServiceError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      cellNo: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: (values) => {
      handleSubmit(values);
    },

    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "Please enter first name";
      }
      if (!values.lastName) {
        errors.lastName = "Please enter last name";
      }
      if (values.email === "") {
        errors.email = "Please enter your email";
      } else if (!values.email.match(emailIdValidation)) {
        errors.email = "Invalid email address";
      }
      if (!values.cellNo) {
        errors.cellNo = "Please enter your phone number";
      }
      if (!values.password) {
        errors.password = "Please enter your password";
      } else if (values.password?.length < 8) {
        errors.password = "The minimum password length is 8 characters ";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = " Please enter your confirm password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password must be same";
      }

      return errors;
    },
  });

  // 496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com
  const googleClientId = "YOUR_GOOGLE_CLIENT_ID";
  const options = {
    scope:
      "profile email https://www.googleapis.com/auth/user.phonenumbers.read",
    prompt: "select_account",
  };

  return (
    <div style={styles.containerBody}>
      <form onSubmit={formik.handleSubmit} style={styles.formStyle}>
        <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIconStyle} />
        <div style={styles.pageTitleDev}>
          <span style={styles.pageNameTxt}>Create Account</span>
          <span style={styles.pageSubNameTxt}>
            Open your gate to endless happiness!
          </span>

          <Grid container style={styles.fieldDev}>
            {/* First Name */}
            <Grid item xs={12} sm={5.5}>
              <CustomTextField
                variant="standard"
                margin="normal"
                fullWidth
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
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
                  style: styles.customTextField,
                }}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={5.5}>
              <CustomTextField
                margin="normal"
                fullWidth
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
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
                  style: styles.customTextField,
                }}
              />
            </Grid>
          </Grid>

          <Grid container style={styles.fieldDev2}>
            {/* Email */}
            <CustomTextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
                style: styles.customTextField,
              }}
            />

            {/* Phone Number */}
            <div style={styles.fieldDev3}>
              <CustomTextField
                margin="normal"
                fullWidth
                id="cellNo"
                name="cellNo"
                placeholder="Phone Number"
                value={`${formik.values.cellNo}`}
                onChange={formik.handleChange}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    backgroundColor: "white",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "-8px",
                  },
                  startAdornment: (
                    <div
                      onClick={handleCountryCodeClick}
                      style={{
                        cursor: "pointer",
                        width: "150px",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      {selectedCountry && (
                        <>
                          <span style={{ fontSize: 30, textAlign: "center" }}>
                            {selectedCountry.flag}
                          </span>
                          <img
                            src={IMAGES.DOWN}
                            alt="up"
                            style={{
                              width: "10px",
                              height: "10px",
                              alignSelf: "center",
                            }}
                          />
                          <span
                            style={{
                              fontSize: 16,
                              textAlign: "center",
                              marginLeft: "20px",
                            }}
                          >
                            {selectedCountry.dial_code}
                          </span>
                        </>
                      )}
                    </div>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: styles.phoneNoStyles,
                }}
              />

              {/* Render the country options */}
              <Dialog
                open={showModal}
                onClose={handleCloseModal}
                scroll="paper"
              >
                <DialogTitle>Country Options</DialogTitle>
                <DialogContent dividers>
                  {countryCodeJson.map((country) => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                      style={{ width: "100%" }}
                      onClick={() => handleCountryChange(country.code)}
                    >
                      {country.name.en}
                    </MenuItem>
                  ))}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
            {formik.touched.cellNo && Boolean(formik.errors.cellNo) ? (
              <span style={styles.ErrorMsgTxt}>
                {formik.touched.cellNo && formik.errors.cellNo}
              </span>
            ) : null}
          </Grid>

          <Grid container style={styles.pwdDev}>
            <Grid container style={styles.pwdDev2}>
              {/* Password */}
              <div style={styles.pwdDev3}>
                <CustomTextField
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={(event) => {
                    formik.handleChange(event);
                    setPassword(event.target.value);
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </div>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    style: styles.pwdStyles,
                  }}
                />
              </div>
              {formik.touched.password && Boolean(formik.errors.password) ? (
                <span style={styles.ErrorMsgTxt}>
                  {formik.touched.password && formik.errors.password}
                </span>
              ) : null}

              {/* Confirm Password */}
              <CustomTextField
                type="password"
                margin="normal"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
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
                  style: styles.customTextField,
                }}
              />
            </Grid>

            {password ? (
              <Grid container style={styles.pwdPowerDev}>
                <div>
                  <span style={styles.pwdStrengthTxt}>
                    Password Strength{" "}
                    <span
                      style={{
                        fontSize: 10,
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
                    </span>
                  </span>
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
                  <span style={styles.pwdInstructionTxt}>
                    The minimum password length is 8 characters and must contain
                    at least 1 lowercase letter, 1 capital letter, 1 number, and
                    1 special character.
                  </span>
                </div>
              </Grid>
            ) : null}
          </Grid>

          <Grid container style={styles.checkBoxDev}>
            <Grid container spacing={2} style={{ marginTop: "-20px" }}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="email"
                      checked={isEmailChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(66, 70, 81, 0.87)",
                      }}
                    >
                      Receiving emails about latest news, offers and more
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="termsOfService"
                      checked={isTermsOfServiceChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(66, 70, 81, 0.87)",
                      }}
                    >
                      Creating an account means you agree to our{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        Terms of Service
                      </span>{" "}
                      and our{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                        }}
                      >
                        Privacy Policy
                      </span>
                    </span>
                  }
                />
                {termsOfServiceError && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Please accept the Terms of Service.
                  </span>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={styles.endContent}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={styles.btnStyle}
            >
              Create Account
            </Button>
            <div style={{ marginTop: "20px" }} />
            <GoogleOAuthProvider clientId="496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com">
              {/* <GoogleLogoutButton /> */}
              <GoogleSignInButton googleResponce={setGoogleResult} />
            </GoogleOAuthProvider>

            {errorMessage && (
              <Typography style={styles.ErrorMsgTxt}>{errorMessage}</Typography>
            )}
            <div style={styles.loginDev}>
              <span style={styles.alreadyAcc}>Already have an account?</span>
              <span
                onClick={() => {
                  navigate("/LogIn");
                }}
                style={styles.loginTxt}
              >
                Log in
              </span>
            </div>
          </Grid>
          <Grid container style={styles.endContent}></Grid>
        </div>
        <span
          onClick={() => {
            dispatch(EmailId("er.riyaz2507@gmail.com"));
            navigate("/VerifyOTP");
          }}
          style={styles.loginTxt}
        >
          Skip VerifyOTP
        </span>
        <span
          onClick={() => {
            navigate("/Home");
          }}
          style={styles.loginTxt}
        >
          Skip DashBoard
        </span>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  customTextField: {
    fontSize: 16,
    color: "black",
    padding: "15px",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
  },
}));

const styles = {
  containerBody: {
    width: "100%",
    // height: "100vh",
    backgroundColor: "#f6f6f6",
  },
  formStyle: {
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingBottom: "50px",
    backgroundColor: "#f6f6f6",
    borderStyle: "solid",
    borderRadius: "4px",
  },
  appIconStyle: {
    marginTop: "2%",
    marginLeft: "5%",
    width: "100px",
    height: "50px",
  },
  pageTitleDev: {
    marginTop: "28px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  pageNameTxt: {
    fontSize: 45,
    lineHeight: "40px",
    color: "rgba(66, 70, 81, 0.87)",
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
  },
  pageSubNameTxt: {
    marginTop: "11px",
    fontSize: 30,
    lineHeight: "40px",
    color: "rgba(66, 70, 81, 0.87)",
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center",
  },
  fieldDev: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "65%",
    marginTop: "40px",
  },
  fieldDev2: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "65%",
  },
  fieldDev3: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    borderBottom: "none",
    marginTop: "15px",
    borderRadius: "5px",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  pwdDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
  },
  pwdDev2: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
    maxWidth: "65%",
    margin: "0 auto",
  },
  pwdDev3: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    borderBottom: "none",
    marginTop: "20px",
    borderRadius: "5px",
    paddingLeft: "15px",
    paddingTop: "1px",
    paddingBottom: "1px",
  },
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
  },
  pwdStrengthTxt: {
    color: "#424651",
    fontSize: 14,
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
    fontFamily: "revert-layer",
    color: "#424651",
    fontSize: 12,
    fontWeight: "normal",
    letterSpacing: -1,
    lineHeight: 0.2,
  },
  customTextField: {
    fontSize: 16,
    color: "black",
    padding: "15px",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
  },
  phoneNoStyles: {
    fontSize: 16,
    color: "black",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  pwdStyles: {
    fontSize: 16,
    color: "black",
    borderBottom: "none",
    backgroundColor: "#fff",
    marginTop: "-6px",
  },
  ErrorMsgTxt: {
    color: "#DC143C",
    fontSize: 12,
    marginTop: "5px",
  },
  endContent: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "65%",
    marginTop: "15px",
  },
  btnStyle: {
    width: "100%",
    backgroundColor: "#026b93",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    // borderRadius: 0,
  },
  loginDev: {
    marginTop: "15px",
    flexDirection: "row",
    alignSelf: "center",
    textAlign: "center",
  },
  loginTxt: {
    marginLeft: "40px",
    color: "black",
    fontSize: "14px",
    fontWeight: "normal",
    textDecoration: "underline",
    textAlign: "center",
  },
  alreadyAcc: {
    color: "black",
    fontSize: "14px",
    fontWeight: "normal",
    textAlign: "center",
  },
  checkBoxDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "65%",
  },
};
