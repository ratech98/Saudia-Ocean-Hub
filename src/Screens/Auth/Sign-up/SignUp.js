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
import { countryCodeJson } from "../countryCodeJson";
import { useDispatch, useSelector } from "react-redux";
import { EmailId, confirmTickMsg } from "../../../redux/slices";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { register } from "../../../Service/api";
import IMAGES from "../../Images";
import Loader from "../../Loader";
import { toast } from "react-toastify";
import GoogleSignInButton from "../GoogleSignInButton";
import "./SignUp.css";
import { Container } from "react-bootstrap";

const start_space_Validation = new RegExp(/^(?!\s).*/);
const emailIdValidation = new RegExp(
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
);
const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

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
  const [searchValue, setSearchValue] = useState("");
  let errors = {};

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
        errors.password = "The minimum password length is 8 characters";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Please enter your confirm password";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password must be same";
      }

      return errors;
    },
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "email") {
      setIsEmailChecked(checked);
    } else if (name === "termsOfService") {
      setIsTermsOfServiceChecked(checked);
      setTermsOfServiceError(false);
    }
  };

  const handleSubmit = async (value, type) => {
    setErrorMessage("");
    toast.dismiss();
    formik.setErrors({});
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

          if (res?.data?.message === "user registered successfully") {
            if (type !== "GOOGLE") {
              dispatch(EmailId(value?.email));
              navigate("/verifyOTP");
            } else {
              dispatch(
                confirmTickMsg({
                  title:
                    "Your account has been created successfully, Please login!",
                  buttonName: "Go to login",
                })
              );

              toast.success(res?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 20000,
              });
              navigate("/confirmation");
              // navigate("/logIn");
            }
          } else {
            if (
              res?.data?.message === "user already registered" &&
              type !== "GOOGLE"
            ) {
              formik.setFieldError("email", res?.data?.message);
            } else if (
              res?.data?.message === "Phone Number already registered"
            ) {
              formik.setFieldError("cellNo", res?.data?.message);
            }
            // console.log("res?.data?.message", res?.data?.message);
            // setErrorMessage(res?.data?.message);

            toast.error(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 20000,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("register API error", err);

          toast.error("Something went wrong. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        });
    } else {
      setTermsOfServiceError(true);
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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCountryCodeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredCountries = countryCodeJson.filter((country) =>
    country.name.en.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="full-box">
      {loading ? <Loader loading={loading} /> : null}

      <form onSubmit={formik.handleSubmit} className="formStyle">
        <img src={IMAGES.APP_ICON} alt="Icon" className="appIconStyle" />
        <Container
          className="container-sm"
          style={{
            // backgroundColor: "lightgreen",
            alignSelf: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="body-content">
            <Typography className="page-title">Create Account</Typography>
            <Typography className="title-info">
              Open your gate to endless happiness!
            </Typography>

            <Container className="first-field">
              {/* First Name */}
              <CustomTextField
                className="text-fileds"
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
                  className: "text-field-inputs",
                }}
              />

              {/* Last Name */}
              <CustomTextField
                className="text-fileds"
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
                  className: "text-field-inputs",
                }}
              />
            </Container>

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
                className: "text-inputs",
              }}
            />
            {/* Phone Number */}
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
                className: "text-inputs",
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
            {/* mob no. err MSG */}
            <div style={{ display: "flex", width: "100%" }}>
              {formik.touched.cellNo && Boolean(formik.errors.cellNo) ? (
                <Typography style={styles.ErrorMsgTxt}>
                  {formik.touched.cellNo && formik.errors.cellNo}
                </Typography>
              ) : null}
            </div>
            {/* Password */}
            <div
              style={{
                border:
                  formik.touched.password && Boolean(formik.errors.password)
                    ? "1px solid red"
                    : null,
              }}
              className="pwd-filed"
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
                    <>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  className: "pwd-txt-input",
                }}
                style={{ padding: "0px", margin: "0px" }}
              />
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              {formik.touched.password && Boolean(formik.errors.password) ? (
                <Typography style={styles.ErrorMsgTxt}>
                  {formik.touched.password && formik.errors.password}
                </Typography>
              ) : null}
            </div>

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
                formik.touched.confirmPassword && formik.errors.confirmPassword
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
                // className: "text-field-input",
              }}
            />

            {password ? (
              <div className="pwd-strength-div" style={{ display: "block" }}>
                <Typography className="pwd-strength-title">
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
                <div className="pwd-strength-info-marker">
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
                <Typography className="pwd-strength-info-txt">
                  The minimum password length is 8 characters and must contain
                  at least 1 lowercase letter, 1 capital letter, 1 number, and 1
                  special character.
                </Typography>
              </div>
            ) : null}

            {/* check boa */}
            <div className="check-box-div">
              <FormControlLabel
                control={
                  <>
                    <CustomCheckbox
                      name="email"
                      checked={isEmailChecked}
                      onChange={handleCheckboxChange}
                      icon={<span className="unChecked-box" />}
                      checkedIcon={<span className="checked-box">✓</span>}
                    />
                  </>
                }
                label={
                  <Typography className="check-box-txt">
                    Receiving emails about latest news, offers and more
                  </Typography>
                }
              />

              <FormControlLabel
                control={
                  <CustomCheckbox
                    name="termsOfService"
                    checked={isTermsOfServiceChecked}
                    onChange={handleCheckboxChange}
                    icon={<span className="unChecked-box" />}
                    checkedIcon={<span className="checked-box">✓</span>}
                  />
                }
                label={
                  <Typography className="agree-info-txt">
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
              {termsOfServiceError && (
                <Typography className="err-term-service-txt">
                  Please accept the Terms of Service.
                </Typography>
              )}
            </div>

            {/* end buttons */}
            <div className="end-content">
              <Button
                // variant="contained"
                color="primary"
                type="submit"
                className="btnStyle"
              >
                Create Account
              </Button>
              <div style={{ marginTop: "20px" }} />

              {/* GOOGLE LOGIN */}
              <GoogleOAuthProvider clientId="496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com">
                <GoogleSignInButton
                  googleResponce={setGoogleResult}
                  handle={handleSubmit}
                  isTermsOfServiceChecked={isTermsOfServiceChecked}
                />
              </GoogleOAuthProvider>

              {errorMessage && (
                <Typography className="error-msg-txt">
                  {errorMessage}
                </Typography>
              )}
              <div className="login-div">
                <Typography className="acc-txt ">
                  Already have an account?
                </Typography>
                <Typography
                  onClick={() => {
                    navigate("/LogIn");
                  }}
                  className="login-txt"
                >
                  Log in
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
};

const styles = {
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
