import React from "react";
import { Route } from "react-router-dom";
import Home from "../Screens/Dash/Home";
import { UserChoice } from "../Screens/Auth/UserChoice";
import { SignUp } from "../Screens/Auth/SignUp";
import { LogIn } from "../Screens/Auth/Login";
import VerifyOTP from "../Screens/Auth/VerifyOTP";
import { BoatOfferStep1 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep1";
import { BoatOfferStep2 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep2";
import { BoatOfferStep3 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep3";
import { MyListings } from "../Screens/Dash/BoatOwner/list/MyListings";
import { RequestList } from "../Screens/Dash/BoatOwner/list/RequestList";
import { CustomerProfile } from "../Screens/Dash/BoatOwner/list/CustomerProfile";
import { BoatOwnerDashBoard } from "../Screens";

export const OutSideRoutes = [
  { path: "/Home", element: <Home /> },
  { path: "/UserChoice", element: <UserChoice /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/LogIn", element: <LogIn /> },
  { path: "/VerifyOTP", element: <VerifyOTP /> },
];

{
  /* <Route path={"/Rental"} element={<Rental />} /> */
}

{
  /* <Route path={"/"} element={<DashBoard />} /> */
}

export const DashBoardRoutes = [
  { path: "/boatOwnerDashBoard", element: <BoatOwnerDashBoard /> },
];

export const InSideRoutes = [
  { path: "/BoatOfferStep1", element: <BoatOfferStep1 /> },
  { path: "/BoatOfferStep2", element: <BoatOfferStep2 /> },
  { path: "/BoatOfferStep3", element: <BoatOfferStep3 /> },
  { path: "/MyListings", element: <MyListings /> },
  { path: "/RequestList", element: <RequestList /> },
  { path: "/CommunityManagerRegister", element: <CustomerProfile /> },
];
