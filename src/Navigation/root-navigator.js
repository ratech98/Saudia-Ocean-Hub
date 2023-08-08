import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { BoatOwnerDashBoard } from "../Screens/Dash/Boat-owner-dashboard/BoatOwnerDashBoard";
import { Rental } from "../Screens/Dash/RentalBoat/Rental";
import Home from "../Screens/Dash/Home";
import { LogIn } from "../Screens/Auth/Log-in/Login";
import { BoatOfferStep1 } from "../Screens/Dash/BoatOwner/ListABoatOffer/step1/BoatOfferStep1";
import { BoatOfferStep2 } from "../Screens/Dash/BoatOwner/ListABoatOffer/step2/BoatOfferStep2";
import { BoatOfferStep3 } from "../Screens/Dash/BoatOwner/ListABoatOffer/step3/BoatOfferStep3";
import { MyListings } from "../Screens/Dash/BoatOwner/list/MyListings";
import { RequestList } from "../Screens/Dash/BoatOwner/list/RequestList";
import { CustomerProfile } from "../Screens/Dash/BoatOwner/list/CustomerProfile";
import { UserChoice } from "../Screens/Auth/user-type/UserChoice";
import { SignUp } from "../Screens/Auth/Sign-up/SignUp";
import VerifyOTP from "../Screens/Auth/verify-OTP/VerifyOTP";
import { Confirmation } from "../Screens/Common/Confirm/Confirmation";
import { ReviewPage } from "../Screens/new/ReviewPage";
import { Notification } from "../Screens/new/Notification";
import { AuthPage } from "../Screens/Auth";
import Loader from "../Screens/Loader";
import jwt_decode from "jwt-decode";
import { ForgotPassword } from "../Screens/Auth/password/ForgotPassword";
import { ChangePassword } from "../Screens/Auth/password/ChangePassword";
import { VerifyForgotPwdOTP } from "../Screens/Auth/password/VerifyForgotPwdOTP";
import { AuthToken, TokenDecodeData, UserId } from "../redux/slices";
import { BoatBookingRequest } from "../Screens/new/BoatBookingRequest";
import BoatViewDetails from "../Screens/Dash/Boat-View-Details/BoatViewDetails";

import { BoatDetailCard } from "../Screens/Dash/Card/BoatDetailCard";
import { BookingHistory } from "../Screens/Dash/Booking_History/BookingHistory";
import { SearchBoat } from "../Screens/Dash/Search/SearchBoat";
import { Setting } from "../Screens/Dash/Settings-pages/Setting";

const PrivateRoute = ({ children, session, type, screenName }) => {
  console.log("children", children, "type", type);
  const navigate = useNavigate();

  const [calculateTime, setCalculateTime] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentSession = async () => {
      const token = localStorage.getItem("session");
      console.log("token", token);
      if (token) {
        let tokenDecode = jwt_decode(token);
        console.log("tokenDecode", tokenDecode);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log("auth condition", currentTimestamp < tokenDecode.exp);
        if (currentTimestamp < tokenDecode.exp) {
          if (tokenDecode.user_type === type) {
            setCalculateTime(true);
            setLoading(false);
          } else {
            navigate(-1);
          }
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
  }, [navigate, type]);

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
              <PrivateRoute type="CUSTOMER" screenName={"rental"}>
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
          {/* common */}
          <Route path="/searchBoat" element={<SearchBoat />} />
          {/*  new */}
          <Route path="/requestList" element={<RequestList />} />
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/reviewPage" element={<ReviewPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/boatBookingRequest" element={<BoatBookingRequest />} />
          <Route path="/boatViewDetails" element={<BoatViewDetails />} />
          <Route path="/bookingHistory" element={<BookingHistory />} />
          {/* // */}
          {/* // */}
          {/* // */}
          {/* // */}
          {/* // */}
          {/* // */}
          {/* // */}
          {/* // */}

          <Route path="/boatDetailCard" element={<BoatDetailCard />} />
          <Route path="/setting" element={<Setting />} />
        </>
      </Routes>
    </BrowserRouter>
  );
});
