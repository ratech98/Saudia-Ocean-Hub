import React from "react";
import { OutsideStack } from "./OutsideStack";
import { useSelector } from "react-redux";
import { InsideStack } from "./InsideStack";
import { DashStack } from "./DashStack";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  BoatOwnerDashBoard,
  DashBoard,
} from "../Screens/Dash/BoatOwnerDashBoard";
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

// Redux action for navigation control
const setNavigation = (targetPage) => ({
  type: "SET_NAVIGATION",
  payload: targetPage,
});

export const RootNavigator = React.forwardRef((props, ref) => {
  const user = useSelector((state) => state?.auth);
  // console.log("AuthToken ", user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userChoice" element={<UserChoice />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
          {/*  */}
          <Route path="/boatOwnerDashBoard" element={<BoatOwnerDashBoard />} />
          <Route path="/boatOfferStep1" element={<BoatOfferStep1 />} />
          <Route path="/boatOfferStep2" element={<BoatOfferStep2 />} />
          <Route path="/boatOfferStep3" element={<BoatOfferStep3 />} />
          <Route path="/myListings" element={<MyListings />} />
          <Route path="/requestList" element={<RequestList />} />
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
});

{
  /* {user?.AuthToken !== null ? (
        <InsideStack />
      ) : user?.tokenDecodeData?.user_type === "BOAT_OWNER" ? (
        <DashStack />
      ) : (
        <OutsideStack />
      )} */
}
