import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Service/api";
import { AuthToken, EmailId, Password, UserId } from "../../redux/slices";
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

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [isRemembermeChecked, setIsRemembermeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "RememberMe") {
      setIsRemembermeChecked(checked);
    }
  };

  const handleSubmit = async (value) => {
    setIsLoading(true);
    let payload = {
      email: value?.email,
      password: value?.password,
    };
    console.log("handleSubmit payload", payload);
    navigate("/VerifyOTP");
    // login(payload)
    //   .then((res) => {
    //     console.log("login res", res);
    //     if (res?.data?.message === "user not verified") {
    //       dispatch(EmailId(value?.email));
    //       dispatch(Password(value?.password));
    //       navigate("/VerifyOTP");
    //     } else if (res?.data?.message === "user Login successfully") {
    //       navigate("/Home");
    //       dispatch(AuthToken(res?.data?.token));
    //       dispatch(UserId(res?.data?.user_id));
    //     } else {
    //       setErrorMsg(res?.data?.message);
    //     }
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.log("login err", err);
    //   });
  };

  const formik = useFormik({
    initialValues: {
      email: user?.emailId ?? "",
      password: user?.password ?? "",
    },

    onSubmit: (values) => {
      handleSubmit(values);
    },

    validate: (values) => {
      const errors = {};

      if (values.email === "") {
        errors.email = "Please enter your email";
      } else if (!values.email.match(emailIdValidation)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Please enter your password";
      }
      return errors;
    },
  });

  return (
    <>
      <div style={styles.containerBody}>
        <div style={styles.backgroundImage}></div>
        <form onSubmit={formik.handleSubmit} style={styles.formStyle}>
          <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIconStyle} />
          <div style={styles.pageContentDev}>
            <Grid container style={styles.fieldDev}>
              {/* Email */}

              <div style={{ ...styles.pwdDev2, width: "100%" }}>
                <CustomTextField
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      backgroundColor: "white",
                      borderRadius: "5px",
                    },

                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          style={{
                            // marginLeft: "10px",
                            top: -3,
                            left: -1,
                          }}
                        >
                          <img
                            src={IMAGES.EMAIL_ICON}
                            alt="lock"
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    // style: styles.customTextField,
                    style: styles.pwdStyles,
                  }}
                />
              </div>
              {formik.touched.email && Boolean(formik.errors.email) ? (
                <span style={styles.ErrorMsgTxt}>
                  {formik.touched.email && formik.errors.email}
                </span>
              ) : null}
            </Grid>

            <Grid container style={styles.pwdDev}>
              {/* Password */}
              <div style={styles.pwdDev2}>
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
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          style={{
                            top: -5,
                            left: -1,
                          }}
                        >
                          <img
                            src={IMAGES.LOCK_ICON}
                            alt="lock"
                            style={{
                              width: "20px",
                              height: "24px",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            top: -5,
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
            </Grid>

            <Grid container style={styles.endContent}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="RememberMe"
                      checked={isRemembermeChecked}
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
                      Remember me
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                {errorMsg ? (
                  <Typography style={styles.ErrorMsgTxt}>{errorMsg}</Typography>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{
                    ...styles.btnStyle,
                    lineHeight: "24px",
                    minHeight: "40px",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      style={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        color: "whitesmoke",
                      }}
                    />
                  ) : (
                    "Log in"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "30px",
                    width: "100%", // Adjust the width as needed
                    backgroundColor: "#f6f6f6",
                    justifyContent: "center",
                    borderStyle: "dotted",
                    borderWidth: 0.1,
                    borderColor: "gray",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {/* email,name,phno. */}
                  <GoogleOAuthProvider clientId="496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com">
                    <GoogleLogin
                      size="large"
                      onSuccess={(credentialResponse) => {
                        console.log("credentialResponse", credentialResponse);
                        navigate("/Home");
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                      render={(renderProps) => (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          style={{
                            background: "#026b93",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "none",
                            cursor: "pointer",
                            width: "100%",
                          }}
                        >
                          Sign in with Google
                        </Button>
                      )}
                    />
                  </GoogleOAuthProvider>
                  {/* <GoogleLogout
  clientId="496577884812-quv2n4j54nvk6gtrmo4vuv98cmrlf5q4.apps.googleusercontent.com"
  buttonText="Sign out"
  onLogoutSuccess={() => {
    console.log("Logged out successfully");
    // Add your logic to handle the sign-out process
  }}
/> */}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={styles.forgotPwdDev}>
                  <span style={styles.forgotPwdTxt}>Forgot Password?</span>
                  <span
                    style={styles.noAccTxt}
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                  >
                    Don't have an account?
                  </span>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </>
  );
};

const styles = {
  containerBody: {
    display: "flex",
    height: "100vh",
  },
  backgroundImage: {
    flex: 1,
    backgroundImage: `url(${IMAGES.SEA_VIEW_IMG})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  formStyle: {
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#f6f6f6",
    borderStyle: "solid",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  appIconStyle: {
    marginTop: "100px",
    width: "100px",
    height: "50px",
  },
  pageContentDev: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "60px",
  },
  fieldDev: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "65%",
    // marginTop: "40px",
  },
  customTextField: {
    fontSize: 16,
    color: "black",
    padding: "15px",
    paddingLeft: "0px",
    borderBottom: "none",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "1px 0px 2px rgba(0, 0, 0, 0.2)",
  },
  pwdDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
    // backgroundColor: "green",
  },

  pwdDev2: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
    borderBottom: "none",
    marginTop: "20px",
    borderRadius: "5px",
    paddingLeft: "15px",
    paddingTop: "1px",
    paddingBottom: "1px",
    width: "63%",
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
    // display: "flex",
    // flexDirection: "column",
    alignContent: "center",
    width: "65%",
    marginTop: "20px",
  },
  btnStyle: {
    width: "100%",
    backgroundColor: "#026b93",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
    marginTop: "30px",
    paddingTop: 10,
    paddingBottom: 10,
  },
  forgotPwdDev: {
    display: "flex",
    marginTop: "30px",
    width: "100%",
    justifyContent: "space-between",
  },
  forgotPwdTxt: {
    fontSize: "14px",
    alignSelf: "flex-start",
    color: "rgba(66, 70, 81, 0.87)",
  },
  noAccTxt: {
    fontSize: "14px",
    alignSelf: "flex-end",
    textAlign: "end",
    color: "rgba(66, 70, 81, 0.87)",
  },
  googleBtn: {
    background: "#026b93",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    // backgroundColor: "red",
    cursor: "pointer",
    width: "100%",
  },
};
