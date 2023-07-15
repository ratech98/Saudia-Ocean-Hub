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
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { countryCodeJson } from "./countryCodeJson";
import { useDispatch, useSelector } from "react-redux";
import { EmailId } from "../../redux/slices";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { register } from "../../Service/api";
import IMAGES from "../Images";
import Loader from "../Loader";
import { toast } from "react-toastify";
import GoogleSignInButton from "./GoogleSignInButton";

const start_space_Validation = new RegExp(/^(?!\s).*/);
const emailIdValidation = new RegExp(
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
);

//
//
//
//
//
//
//

const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

//
//
//
//
//
//
//
//

const CustomTextField = withStyles({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
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
  // const classes = useStyles();
  const user = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [strengthIndicator, setStrengthIndicator] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCountry, setSelectedCountry] = useState(countryCodeJson[189]); // Set the initial selected country
  const [showModal, setShowModal] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isTermsOfServiceChecked, setIsTermsOfServiceChecked] = useState(false);
  const [termsOfServiceError, setTermsOfServiceError] = useState(false);
  const [googleResult, setGoogleResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log("googleResult", googleResult);
  // console.log("user", user?.userType);
  // console.log("countryCodeJson", countryCodeJson);

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

  const handleSubmit = async (value, type) => {
    setErrorMessage("");

    if (isTermsOfServiceChecked) {
      setLoading(true);
      let payload = {
        first_name: value?.firstName || value?.name,
        email: value?.email,
        received_email: isEmailChecked,
        sign_in_type: type === "GOOGLE" ? "SOCIAL_LOGIN" : "EMAIL",
        user_type: user?.userType,
      };

      if (type !== "GOOGLE") {
        payload = {
          ...payload,
          last_name: value?.lastName,
          phone_number: value?.cellNo,
          country_code: selectedCountry?.dial_code,
          password: value?.password,
        };
      }

      console.log("handle Submit payload", payload);
      register(payload)
        .then((res) => {
          console.log("register res", res);
          if (res?.data?.success) {
            if (res?.data?.message === "user registered successfully") {
              if (type !== "GOOGLE") {
                dispatch(EmailId(value?.email));
                navigate("/verifyOTP");
              } else {
                navigate("/logIn");
              }
            }
          } else {
            console.log("res message ====>>>", res?.data?.message);
            setErrorMessage(res?.data?.message);
            toast.error(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 20000,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
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
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredCountries = countryCodeJson.filter((country) =>
    country.name.en.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div style={styles.containerBody}>
      {loading ? <Loader loading={loading} /> : null}
      <form onSubmit={formik.handleSubmit} style={styles.formStyle}>
        <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIconStyle} />
        <div style={styles.pageTitleDev}>
          <Typography style={styles.pageNameTxt}>Create Account</Typography>
          <Typography style={styles.pageSubNameTxt}>
            Open your gate to endless happiness!
          </Typography>

          <Grid container style={styles.firstFieldName}>
            {/* First Name */}
            <Grid
              item
              xs={12}
              sm={5.8}
              style={{
                alignSelf: "center",
              }}
            >
              <CustomTextField
                variant="standard"
                margin="normal"
                fullWidth
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (start_space_Validation.test(inputValue)) {
                    formik.setFieldValue("firstName", inputValue);
                  }
                }}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    backgroundColor: "white",
                    borderRadius: "5px",
                    border:
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                        ? "1px solid red"
                        : null,
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
                style={{
                  margin: "0px",
                  borderRadius: "5px",
                }}
              />
            </Grid>

            {/* Last Name */}
            <Grid
              item
              xs={12}
              sm={5.8}
              style={{
                alignSelf: "center",
              }}
            >
              <CustomTextField
                margin="normal"
                fullWidth
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (start_space_Validation.test(inputValue)) {
                    formik.setFieldValue("lastName", inputValue);
                  }
                }}
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
                    border:
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                        ? "1px solid red"
                        : null,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: styles.customTextField,
                }}
                style={{ margin: "0px", borderRadius: "5px" }}
              />
            </Grid>
          </Grid>

          <Grid container style={styles.BoxDev}>
            {/* Email */}
            <CustomTextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (start_space_Validation.test(inputValue)) {
                  formik.setFieldValue("email", inputValue);
                }
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border:
                    formik.touched.email && Boolean(formik.errors.email)
                      ? "1px solid red"
                      : null,
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
            {/* <div style={styles.fieldDev3}> */}
            <CustomTextField
              margin="normal"
              fullWidth
              id="cellNo"
              name="cellNo"
              placeholder="Phone Number"
              value={`${formik.values.cellNo}`}
              onChange={(event) => {
                const inputValue = event.target.value;
                if (start_space_Validation.test(inputValue)) {
                  formik.setFieldValue("cellNo", inputValue);
                }
              }}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  backgroundColor: "white",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "-8px",
                  marginBottom: "-8px",
                  border:
                    formik.touched.cellNo && Boolean(formik.errors.cellNo)
                      ? "1px solid red"
                      : null,
                },
                startAdornment: (
                  <div
                    onClick={handleCountryCodeClick}
                    style={{
                      cursor: "pointer",

                      justifyContent: "center",
                      display: "flex",
                      paddingLeft: "30px",
                      paddingRight: "5px",
                    }}
                  >
                    {selectedCountry && (
                      <>
                        <Typography
                          style={{
                            fontSize: 30,
                            textAlign: "center",
                            fontFamily: "Poppins",
                          }}
                        >
                          {selectedCountry.flag}
                        </Typography>
                        <img
                          src={IMAGES.DOWN}
                          alt="up"
                          style={{
                            width: "10px",
                            height: "10px",
                            alignSelf: "center",
                          }}
                        />
                        <Typography
                          style={{
                            fontSize: "16px",
                            textAlign: "center",
                            marginLeft: "20px",
                            fontFamily: "Poppins",
                            alignSelf: "center",
                            color: "#424651",
                          }}
                        >
                          {selectedCountry.dial_code}
                        </Typography>
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
              style={{ padding: "0px", borderRadius: "5px" }}
            />

            {/* Render the country options */}
            <Dialog open={showModal} onClose={handleCloseModal} scroll="paper">
              <DialogTitle>Country Options</DialogTitle>
              <DialogContent
                dividers
                style={{ minHeight: "690px", minWidth: "700px" }}
              >
                <TextField
                  label="Search Country"
                  variant="standard"
                  value={searchValue}
                  onChange={handleSearchChange}
                  fullWidth
                  style={{ width: "84%" }}
                />
                {filteredCountries.map((country, index) => (
                  <MenuItem
                    key={country.code}
                    value={country}
                    style={{ width: "100%" }}
                    onClick={() => {
                      console.log("index", country);
                      handleCountryChange(country.code);
                    }}
                  >
                    <Typography
                      style={{ marginRight: "15px", fontSize: "20px" }}
                    >
                      {country.flag}{" "}
                    </Typography>
                    {country.name.en}
                  </MenuItem>
                ))}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Close</Button>
              </DialogActions>
            </Dialog>
            {/* </div> */}
            {formik.touched.cellNo && Boolean(formik.errors.cellNo) ? (
              <span style={styles.ErrorMsgTxt}>
                {formik.touched.cellNo && formik.errors.cellNo}
              </span>
            ) : null}
          </Grid>

          <Grid container style={styles.fieldDevLast}>
            <Grid container style={styles.pwd_confirmDev}>
              {/* Password */}
              <div
                style={{
                  ...styles.pwdDev,
                  border:
                    formik.touched.password && Boolean(formik.errors.password)
                      ? "1px solid red"
                      : null,
                }}
              >
                <CustomTextField
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    if (start_space_Validation.test(inputValue)) {
                      formik.setFieldValue("password", inputValue);
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
                    style: {
                      ...styles.pwdStyles,
                    },
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
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (start_space_Validation.test(inputValue)) {
                    formik.setFieldValue("confirmPassword", inputValue);
                  }
                }}
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
                    border:
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                        ? "1px solid red"
                        : null,
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
                    The minimum password length is 8 characters and must contain
                    at least 1 lowercase letter, 1 capital letter, 1 number, and
                    1 special character.
                  </Typography>
                </div>
              </Grid>
            ) : null}
          </Grid>

          <Grid container style={styles.BoxDev}>
            <Grid container spacing={2} style={{ marginTop: "-20px" }}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <>
                      <CustomCheckbox
                        name="email"
                        checked={isEmailChecked}
                        onChange={handleCheckboxChange}
                        icon={<span style={styles.checkBoxUncheckedstyle} />}
                        checkedIcon={
                          <span style={styles.checkBoxcheckedstyle}>✓</span>
                        }
                      />
                    </>
                  }
                  label={
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        color: "rgba(66, 70, 81, 0.87)",
                      }}
                    >
                      Receiving emails about latest news, offers and more
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "-25px" }}>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      name="termsOfService"
                      checked={isTermsOfServiceChecked}
                      onChange={handleCheckboxChange}
                      icon={<span style={styles.checkBoxUncheckedstyle} />}
                      checkedIcon={
                        <span style={styles.checkBoxcheckedstyle}>✓</span>
                      }
                    />
                  }
                  label={
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "Poppins",
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
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {termsOfServiceError && (
              <Typography
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Poppins",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
              >
                Please accept the Terms of Service.
              </Typography>
            )}
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
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/* GOOGLE LOGIN */}
            <GoogleOAuthProvider clientId="496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com">
              <GoogleSignInButton
                googleResponce={setGoogleResult}
                handle={handleSubmit}
                isTermsOfServiceChecked={isTermsOfServiceChecked}
                // setIsEmailChecked={setIsEmailChecked}
                // handleIsEmailChecked={handleIsEmailChecked}
              />
            </GoogleOAuthProvider>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {errorMessage && (
              <Typography style={styles.ErrorMsgTxt}>{errorMessage}</Typography>
            )}
            <div style={styles.loginDev}>
              <Typography style={styles.alreadyAcc}>
                Already have an account?
              </Typography>
              <Typography
                onClick={() => {
                  navigate("/LogIn");
                }}
                style={styles.loginTxt}
              >
                Log in
              </Typography>
            </div>
          </Grid>
          {/* <Grid container style={styles.endContent}></Grid> */}
        </div>
        {/* <span
          onClick={() => {
            // dispatch(EmailId("er.riyaz2507@gmail.com"));
            navigate("/VerifyOTP");
          }}
          style={styles.loginTxt}
        >
          Skip VerifyOTP
        </span>
        <span
          onClick={() => {
            navigate("/boatOwnerDashBoard");
          }}
          style={styles.loginTxt}
        >
          BoatOwner DashBoard
        </span>
        <span
          onClick={() => {
            navigate("/home");
          }}
          style={styles.loginTxt}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigate("/confirmation");
          }}
          style={styles.loginTxt}
        >
          confirmation screen
        </span>
        <span
          onClick={() => {
            navigate("/reviewPage");
          }}
          style={styles.loginTxt}
        >
          reviewPage
        </span>
        <span
          onClick={() => {
            navigate("/notification");
          }}
          style={styles.loginTxt}
        >
          notification
        </span> */}
        {/* <span
          onClick={() => {
            navigate("/boatViewDetails");
          }}
          style={styles.loginTxt}
        >
          Boat View Details
        </span> */}
      </form>
    </div>
  );
};

const styles = {
  containerBody: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f6f6f6",
    // backgroundColor: "#454545",
  },
  formStyle: {
    backgroundColor: "#f6f6f6",
    //
    // borderWidth: 1,
    // borderColor: "#dddddd",
    // paddingBottom: "50px",
    // borderStyle: "solid",
    // borderRadius: "4px",
  },
  appIconStyle: {
    // marginTop: "10px",
    marginLeft: "140px",
    width: "200px",
    height: "100px",
    // backgroundColor: "pink",
  },
  pageTitleDev: {
    // marginTop: "28px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  pageNameTxt: {
    fontSize: "45px",
    fontFamily: "Poppins",
    lineHeight: 0.89,
    color: "#424651",
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
  },
  pageSubNameTxt: {
    marginTop: "11px",
    fontSize: "30px",
    fontFamily: "Poppins",
    lineHeight: 1.33,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center",
    color: "#424651",
  },
  firstFieldName: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "55%",
    marginTop: "40px",
    // backgroundColor: "gold",
  },

  fieldDev3: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    borderBottom: "none",
    marginTop: "10px",
    borderRadius: "5px",
    // paddingTop: "3px",
    // paddingBottom: "3px",
    // backgroundColor: "red",
  },
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
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.09)",
    // backgroundColor: "red",
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
    borderBottom: "none",
    backgroundColor: "#fff",
    marginTop: "-6px",
    padding: "0px",
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
