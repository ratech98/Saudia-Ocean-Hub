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
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../Images";
import GoogleSignInButton from "./GoogleSignInButton";
import { login } from "../../Service/api";
import {
  AuthToken,
  EmailId,
  Password,
  TokenDecodeData,
  UserId,
} from "../../redux/slices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import jwt_decode from "jwt-decode";

const emailIdValidation = new RegExp(
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
);

const CustomTextField = withStyles({
  root: {
    "& input::placeholder": {
      fontSize: "16px",
      color: "rgba(66, 70, 81, 0.4)",
      fontFamily: "Poppins",
    },
  },
})(TextField);

const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(false);
  const [isRemembermeChecked, setIsRemembermeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [googleResult, setGoogleResult] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "RememberMe") {
      setIsRemembermeChecked(checked);
    }
  };

  const handleSubmit = async (value, type) => {
    localStorage.removeItem("session");
    //
    //
    // moment().format("YYYY-MM-DD HH:mm:ss")
    // localStorage.setItem("session", "GJ");

    //
    //
    //
    //
    //
    //
    //
    setIsLoading(true);

    let payload = {
      email: value?.email,
    };
    if (type === "GOOGLE") {
      payload = {
        ...payload,
        sign_in_type: "SOCIAL_LOGIN",
      };
    } else {
      payload = {
        ...payload,
        password: value?.password,
        sign_in_type: "EMAIL",
      };
    }

    console.log("handleSubmit payload", payload);

    login(payload)
      .then((res) => {
        console.log("login res", res?.data);
        if (res?.data?.message === "user not verified") {
          dispatch(EmailId(value?.email));
          dispatch(Password(value?.password));
          navigate("/VerifyOTP");
        } else if (res?.data?.message === "user Login successfully") {
          let tokenDecode = jwt_decode(res?.data?.token);
          dispatch(TokenDecodeData(tokenDecode));
          dispatch(UserId(res?.data?.user_id));
          dispatch(AuthToken(res?.data?.token));
          const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
          console.log("currentTime", currentTime);
          localStorage.setItem("session", currentTime.toString());

          tokenDecode?.user_type === "BOAT_OWNER"
            ? navigate("/boatOwnerDashBoard")
            : navigate("/rental");

          toast.success("Login successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        } else {
          setErrorMsg(
            res?.data?.message && Object.keys(res.data.message).length > 0
              ? res?.data?.message
              : "LogIn Error"
          );
          if (res?.data?.message && Object.keys(res.data.message).length > 0) {
            toast.error(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 20000,
            });
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("login err", err);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: user?.emailId ?? "",
      password: user?.password ?? "",
      sign_in_type: "SOCIAL_LOGIN",
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

  useEffect(() => {
    if (user?.verifyOTPpage === "VERIFY_OTP") {
      window.history.forward();
      const handleNoBack = () => {
        window.history.forward();
      };
      window.addEventListener("popstate", handleNoBack);
      return () => {
        window.removeEventListener("popstate", handleNoBack);
      };
    }
  }, []);

  return (
    <>
      <div style={styles.containerBody}>
        {/* {isLoading ? <Loader loading={isLoading} /> : null} */}
        <div style={styles.backgroundImage}></div>

        <form onSubmit={formik.handleSubmit} style={styles.formStyle}>
          <img src={IMAGES.APP_ICON} alt="Icon" style={styles.appIconStyle} />
          <div style={styles.pageContentDev}>
            {/* Email */}

            <Grid container style={styles.fieldDev}>
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
                    border:
                      formik.touched.email && Boolean(formik.errors.email)
                        ? "1px solid red"
                        : null,
                  },

                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ marginLeft: "20px" }}
                    >
                      <IconButton
                        style={
                          {
                            // marginLeft: "10px",
                            // top: -3,
                            // left: -1,
                          }
                        }
                      >
                        <img
                          src={IMAGES.EMAIL_ICON}
                          alt="lock"
                          style={{
                            width: "20px",
                            height: "20px",
                            opacity: 0.4,
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
                  style: styles.pwdStyles,
                }}
              />

              {formik.touched.email && Boolean(formik.errors.email) ? (
                <span style={styles.ErrorMsgTxt}>
                  {formik.touched.email && formik.errors.email}
                </span>
              ) : null}
            </Grid>
            {/* Password */}
            <Grid container style={styles.fieldDev}>
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
                    borderWidth: 2,
                    borderColor: "red",
                    border:
                      (formik.touched.password &&
                        Boolean(formik.errors.password)) ||
                      errorMsg === "Incorrect pasword, please try again"
                        ? "1px solid red"
                        : null,

                    borderRadius: "5px",
                    // Incorrect pasword, please try again
                  },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      style={{ marginLeft: "20px" }}
                    >
                      <IconButton>
                        <img
                          src={IMAGES.LOCK_ICON}
                          alt="lock"
                          style={{
                            width: "20px",
                            height: "20px",
                            opacity: 0.4,
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ marginRight: "10px" }}
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
                  style: {
                    ...styles.pwdStyles,
                  },
                }}
              />

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
                    <CustomCheckbox
                      name="RememberMe"
                      checked={isRemembermeChecked}
                      onChange={handleCheckboxChange}
                      icon={<span style={styles.checkBoxUncheckedstyle} />}
                      checkedIcon={
                        <span style={styles.checkBoxcheckedstyle}>✓</span>
                      }
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(66, 70, 81, 0.87)",
                        fontFamily: "Poppins",
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
                  }}
                  disabled={isLoading}
                >
                  Log in
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
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
                    <GoogleSignInButton
                      googleResponce={setGoogleResult}
                      title={"Sign in with google"}
                      handle={handleSubmit}
                      isTermsOfServiceChecked={true}
                    />
                  </GoogleOAuthProvider>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div style={styles.forgotPwdDev}>
                  <Typography style={styles.forgotPwdTxt}>
                    Forgot Password?
                  </Typography>
                  <Typography
                    style={styles.noAccTxt}
                    onClick={() => {
                      navigate("/userChoice");
                    }}
                  >
                    Don`t have an account?
                  </Typography>
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
    marginTop: "80px",
    width: "198px",
    height: "98px",
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
    width: "67%",
  },

  pwdDev: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    width: "100%",
  },

  pwdStyles: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#424651",
    borderBottom: "none",
    backgroundColor: "#fff",
    height: "40px",
  },
  ErrorMsgTxt: {
    color: "#DC143C",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  endContent: {
    alignContent: "center",
    width: "65%",
  },
  btnStyle: {
    marginTop: "30px",
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
  forgotPwdDev: {
    display: "flex",
    marginTop: "30px",
    width: "100%",
    justifyContent: "space-between",
  },
  forgotPwdTxt: {
    fontSize: "14px",
    fontFamily: "Poppins",
    alignSelf: "flex-start",
    color: "rgba(66, 70, 81, 0.87)",
    cursor: "pointer",
  },
  noAccTxt: {
    fontSize: "14px",
    fontFamily: "Poppins",
    alignSelf: "flex-end",
    textAlign: "end",
    color: "rgba(66, 70, 81, 0.87)",
    cursor: "pointer",
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
