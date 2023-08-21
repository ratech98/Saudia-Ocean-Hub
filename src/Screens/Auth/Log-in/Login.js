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
import { useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../Images";
import GoogleSignInButton from "../Google/GoogleSignInButton";
import { login } from "../../../Service/api";
import {
  AuthToken,
  EmailId,
  Password,
  TokenDecodeData,
  UserId,
  verifyOTP,
} from "../../../redux/slices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Loader from "../../Loader";
import "./Login.css";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [isRemembermeChecked, setIsRemembermeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [googleResult, setGoogleResult] = useState("");
  const errors = {};

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "RememberMe") {
      setIsRemembermeChecked(checked);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: user?.emailId ?? "",
      password: user?.password ?? "",
      sign_in_type: "SOCIAL_LOGIN",
    },

    onSubmit: (value) => {
      handleSubmit(value);
    },

    validate: (values) => {
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
    console.log("user?.verifyOTPpage", user?.verifyOTPpage);
    if (user?.verifyOTPpage === "VERIFY_OTP") {
      const blockBackButton = (e) => {
        e.preventDefault();
        navigate(location.pathname);
      };
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener("popstate", blockBackButton);
      return () => {
        window.removeEventListener("popstate", blockBackButton);
      };
    }
  }, [location.pathname, navigate, user?.verifyOTPpage]);

  const handleSubmit = async (value, type) => {
    toast.dismiss();
    localStorage.removeItem("session");
    setIsLoading(true);
    setErrorMsg(false);
    formik.setErrors({});
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
          localStorage.setItem("session", res?.data?.token);
          dispatch(verifyOTP(null));
          tokenDecode?.user_type === "BOAT_OWNER"
            ? navigate("/boatOwnerDashBoard")
            : navigate("/rental");

          toast.success("Login successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        } else {
          if (res?.data?.message === "User not register") {
            formik.setFieldError("email", res?.data?.message);
          } else if (
            res?.data?.message === "Incorrect pasword, please try again"
          ) {
            formik.setFieldError("password", res?.data?.message);
          }
          if (res?.data?.message && Object.keys(res.data.message).length > 0) {
            toast.error(res?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 20000,
            });
          }
          // setErrorMsg(
          //   res?.data?.message && Object.keys(res.data.message).length > 0
          //     ? res?.data?.message
          //     : "LogIn Error"
          // );
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("login err", err);

        toast.error("Something went wrong. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      {/* <Typography
        onClick={() => {
          navigate("/setting");
        }}
      >
        setting
      </Typography> */}
      <div className="full-container-body">
        {isLoading ? <Loader loading={isLoading} /> : null}
        <div className="background-image-show" />

        <form onSubmit={formik.handleSubmit} className="form-style">
          <img src={IMAGES.APP_ICON} alt="Icon" className="display-app-icon" />

          <div className="field-content">
            {/* Email */}

            <Grid className="text-field-box">
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
                      <IconButton>
                        <img
                          src={IMAGES.EMAIL_ICON}
                          alt="lock"
                          className="email-icon"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  className: "text-style",
                }}
              />

              {formik.touched.email && Boolean(formik.errors.email) ? (
                <span className="error-msg-txt">
                  {formik.touched.email && formik.errors.email}
                </span>
              ) : null}
            </Grid>
            {/* Password */}
            <Grid className="text-field-box">
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
                  className: "text-style",
                }}
              />

              {formik.touched.password && Boolean(formik.errors.password) ? (
                <span className="error-msg-txt">
                  {formik.touched.password && formik.errors.password}
                </span>
              ) : null}
            </Grid>

            <div className="end-content">
              <div className="inside-end-content">
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      name="RememberMe"
                      checked={isRemembermeChecked}
                      onChange={handleCheckboxChange}
                      icon={<span className="unChecked" />}
                      checkedIcon={<span className="checked">✓</span>}
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
                {/* </Grid> */}
                <Grid item xs={12}>
                  {errorMsg ? (
                    <Typography className="error-msg-txt">
                      {errorMsg}
                    </Typography>
                  ) : null}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="login-btn-style"
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
                {/* <Grid item xs={12}> */}
                <div className="forgot-pwd-div">
                  <Typography
                    className="forgot-pwd-txt"
                    onClick={() => {
                      dispatch(EmailId(formik.values.email));
                      navigate("/forgotPassword");
                    }}
                  >
                    Forgot Password?
                  </Typography>
                  <Typography
                    className="no-acc-txt"
                    onClick={() => {
                      navigate("/userChoice");
                    }}
                  >
                    Don`t have an account?
                  </Typography>
                </div>
                {/* </Grid> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
