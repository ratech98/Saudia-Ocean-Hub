import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { AuthPage } from "../Screens/Auth";
import Loader from "../Screens/Loader";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children, session }) => {
  const [calculateTime, setCalculateTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [landingPage, setLandingpage] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("session");
    // console.log("token", token);
    // let tokenDecode = jwt_decode(token);
    // console.log(tokenDecode);
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // console.log("currentTimeStamp", currentTimestamp);
    // console.log(currentTimestamp < tokenDecode?.exp);
    const getCurrentSession = async () => {
      const token = localStorage.getItem("session");
      console.log("token", token);
      if (token) {
        let tokenDecode = jwt_decode(token);
        // jwt.verify(token, "OCEAN_HUB@2023!#", function (err, tokenDecode) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp < tokenDecode.exp) {
          console.log("entry");
          setCalculateTime(true);
          setLoading(false);
        } else {
          setLoading(false);
          setCalculateTime(false);
        }
        // });
      } else {
        setLoading(false);
        setCalculateTime(true);
        // console.log("ennry else");
        // setLandingpage(true);
        // return <Navigate to="/home" />;
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
          <Route
            path="/"
            element={
              <PrivateRoute session={props?.calculateTime}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/logIn" element={<LogIn />} />
          <Route
            path="/rental"
            element={
              <PrivateRoute session={props?.calculateTime}>
                <Rental />
              </PrivateRoute>
            }
          />
          <Route
            path="/boatOwnerDashBoard"
            element={
              <PrivateRoute session={props?.calculateTime}>
                <BoatOwnerDashBoard />
              </PrivateRoute>
            }
          />
          <Route path="/boatOfferStep1" element={<BoatOfferStep1 />} />
          <Route path="/boatOfferStep2" element={<BoatOfferStep2 />} />
          <Route path="/boatOfferStep3" element={<BoatOfferStep3 />} />
          <Route path="/myListings" element={<MyListings />} />
          <Route path="/requestList" element={<RequestList />} />
          <Route path="/customerProfile" element={<CustomerProfile />} />

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/userChoice" element={<UserChoice />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
        </>
      </Routes>
    </BrowserRouter>
  );
});

{
}
