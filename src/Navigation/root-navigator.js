import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { BoatOwnerDashBoard } from "../Screens/Dash/BoatOwnerDashBoard";
import { Rental } from "../Screens/Dash/RentalBoat/Rental";
import Home from "../Screens/Dash/Home";
import { LogIn } from "../Screens/Auth/Login";
import { BoatOfferStep1 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep1";
import { BoatOfferStep2 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep2";
import { BoatOfferStep3 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep3";
import { MyListings } from "../Screens/Dash/BoatOwner/list/MyListings";
import { RequestList } from "../Screens/Dash/BoatOwner/list/RequestList";
import { CustomerProfile } from "../Screens/Dash/BoatOwner/list/CustomerProfile";
import { UserChoice } from "../Screens/Auth/UserChoice";
import { SignUp } from "../Screens/Auth/SignUp";
import VerifyOTP from "../Screens/Auth/VerifyOTP";
import moment from "moment";
import { SearchBoat } from "../Screens/Dash/SearchBoat";
import { Confirmation } from "../Screens/new/Confirmation";
import { ReviewPage } from "../Screens/new/ReviewPage";
import { Notification } from "../Screens/new/Notification";
import { BoatViewDetails } from "../Screens/Dash/BoatViewDetails";
import { AuthPage } from "../Screens/Auth";
import Loader from "../Screens/Loader";
import jwt_decode from "jwt-decode";
import { ForgotPassword } from "../Screens/Auth/password/ForgotPassword";
import { ChangePassword } from "../Screens/Auth/password/ChangePassword";
import { VerifyForgotPwdOTP } from "../Screens/Auth/password/VerifyForgotPwdOTP";
import { AuthToken, TokenDecodeData, UserId } from "../redux/slices";

const PrivateRoute = ({ children, session, type }) => {
  const [calculateTime, setCalculateTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [landingPage, setLandingpage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentSession = async () => {
      const token = localStorage.getItem("session");

      if (token) {
        let tokenDecode = jwt_decode(token);
        console.log("tokenDecode", tokenDecode);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("auth condition", currentTimestamp < tokenDecode.exp);
        if (currentTimestamp < tokenDecode.exp) {
          setCalculateTime(true);
          setLoading(false);
          dispatch(TokenDecodeData(tokenDecode));
          dispatch(UserId(tokenDecode?.user_id));
          dispatch(AuthToken(token));
        } else {
          setLoading(false);
          setCalculateTime(false);
        }
      } else {
        setLoading(false);
        setCalculateTime(true);
      }
    };

    getCurrentSession();
  }, []);

  return loading ? (
    <Loader />
  ) : calculateTime ? (
    children
  ) : (
    <Navigate to="/logIn" />
  );
};

export const RootNavigator = React.forwardRef(function RootNavigator(
  props,
  ref
) {
  console.log("props", props);

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/userChoice" element={<UserChoice />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/verifyForgotPwdOTP" element={<VerifyForgotPwdOTP />} />
          {/* ForgotPassword ResetPwdVerifyOTP ChangePassword */}
          {/*  */}
          <Route
            path="/rental"
            element={
              <PrivateRoute type="BOAT_OWNER">
                <Rental />
              </PrivateRoute>
            }
          />
          <Route
            path="/boatOwnerDashBoard"
            element={
              <PrivateRoute type="BOAT_OWNER">
                <BoatOwnerDashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/boatOfferStep1"
            element={
              <PrivateRoute type="BOAT_OWNER">
                <BoatOfferStep1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/boatOfferStep2"
            element={
              <PrivateRoute type="BOAT_OWNER">
                <BoatOfferStep2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/boatOfferStep3"
            element={
              <PrivateRoute type="BOAT_OWNER">
                <BoatOfferStep3 />
              </PrivateRoute>
            }
          />
          <Route path="/myListings" element={<MyListings />} />

          {/*  */}
          <Route path="/requestList" element={<RequestList />} />
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/reviewPage" element={<ReviewPage />} />
          <Route path="/notification" element={<Notification />} />
          {/* <Route path="/boatViewDetails" element={<BoatViewDetails />} /> */}
          {/* common */}
          <Route path="/searchBoat" element={<SearchBoat />} />
        </>
      </Routes>
    </BrowserRouter>
  );
});

{
}
