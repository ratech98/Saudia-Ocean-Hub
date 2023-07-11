import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
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
import PrivateRoutes from "./PrivateRoutes";
import Protected from "../Protected";
import { SearchBoat } from "../Screens/Dash/SearchBoat";
import { Confirmation } from "../Screens/new/Confirmation";
import { ReviewPage } from "../Screens/new/ReviewPage";
import { Notification } from "../Screens/new/Notification";
import { BoatViewDetails } from "../Screens/Dash/BoatViewDetails";

export const RootNavigator = React.forwardRef(function RootNavigator(
  props,
  ref
) {
  const user = useSelector((state) => state?.auth);
  const [calculateTime, setCalculateTime] = useState(false);

  useEffect(() => {
    const sessionTime = localStorage.getItem("session");

    if (sessionTime) {
      const storedTime = moment(sessionTime, "YYYY-MM-DD HH:mm:ss");
      const currentTime = moment();
      // minutes // seconds
      const timeDifference = currentTime.diff(storedTime, "minutes");

      if (timeDifference > 1) {
        localStorage.removeItem("session");
      } else {
        setCalculateTime(true);
      }
    }
  }, []);

  return (
    <>
      {/* <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" exact />
            </Route>
            <Route element={<LogIn />} path="/logIn" />
          </Routes>
        </Router>
      </div> */}
      <BrowserRouter>
        <Routes>
          <>
            <>
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/userChoice" element={<UserChoice />} />
              <Route path="/home" element={<Home />} />
            </>
            <Route path="/" element={<Home />} />
            {/* <Route
              path="/"
              element={
                <Protected isLoggedIn={!calculateTime}>
                  <Home />
                </Protected>
              }
            /> */}

            {/* <Route
              path="/home"
              element={
                <Protected isLoggedIn={!calculateTime}>
                  <Home />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/userChoice"
              element={
                <Protected isLoggedIn={!calculateTime}>
                  <UserChoice />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/signUp"
              element={
                <Protected isLoggedIn={!calculateTime}>
                  <SignUp />
                </Protected>
              }
            /> */}

            {/* <Route
              path="/logIn"
              element={
                <Protected isLoggedIn={!calculateTime}>
                  <LogIn />
                </Protected>
              }
            /> */}
            <Route path="/verifyOTP" element={<VerifyOTP />} />
          </>
          <>
            <Route path="/" element={<Rental />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/" element={<BoatOwnerDashBoard />} />
            <Route
              path="/boatOwnerDashBoard"
              element={<BoatOwnerDashBoard />}
            />
            {/* <Route
              path="/"
              element={
                <Protected isLoggedIn={calculateTime}>
                  <BoatOwnerDashBoard />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/"
              element={
                <Protected isLoggedIn={calculateTime}>
                  <Rental />
                </Protected>
              }
            /> */}
            {/* <Route
              path="/boatOwnerDashBoard"
              element={
                <Protected isLoggedIn={calculateTime}>
                  <BoatOwnerDashBoard />
                </Protected>
              }
            /> */}

            {/* <Route
              path="/rental"
              element={
                <Protected isLoggedIn={calculateTime}>
                  <Rental />
                </Protected>
              }
            /> */}
            <Route path="/boatOfferStep1" element={<BoatOfferStep1 />} />
            <Route path="/boatOfferStep2" element={<BoatOfferStep2 />} />
            <Route path="/boatOfferStep3" element={<BoatOfferStep3 />} />

            <Route path="/myListings" element={<MyListings />} />
            <Route path="/requestList" element={<RequestList />} />
            <Route path="/customerProfile" element={<CustomerProfile />} />

            <Route path="/searchBoat" element={<SearchBoat />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/reviewPage" element={<ReviewPage />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/boatViewDetails" element={<BoatViewDetails />} />
          </>
        </Routes>
      </BrowserRouter>
    </>
  );
});

{
}
