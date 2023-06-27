import React from "react";
import "./App.css";
import Home from "./Screens/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./redux/store";
import { UserChoice } from "./Screens/Auth/UserChoice";
import { SignUp } from "./Screens/Auth/SignUp";
import { LogIn } from "./Screens/Auth/Login";
import VerifyOTP from "./Screens/Auth/VerifyOTP";
import { DashBoard } from "./Screens/Dash/DashBoard";
import { BoatOfferStep1 } from "./Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep1";
import { BoatOfferStep2 } from "./Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep2";
import { BoatOfferStep3 } from "./Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep3";
import { MyListings } from "./Screens/Dash/BoatOwner/list/MyListings";
import { RequestList } from "./Screens/Dash/BoatOwner/list/RequestList";
import { CustomerProfile } from "./Screens/Dash/BoatOwner/list/CustomerProfile";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<UserChoice />} />
          <Route path={"/SignUp"} element={<SignUp />} />
          <Route path={"/LogIn"} element={<LogIn />} />
          <Route path={"/VerifyOTP"} element={<VerifyOTP />} />
          {/*  */}
          <Route path={"/Home"} element={<Home />} />
          <Route path={"/DashBoard"} element={<DashBoard />} />
          <Route path={"/BoatOfferStep1"} element={<BoatOfferStep1 />} />
          <Route path={"/BoatOfferStep2"} element={<BoatOfferStep2 />} />
          <Route path={"/BoatOfferStep3"} element={<BoatOfferStep3 />} />
          <Route path={"/MyListings"} element={<MyListings />} />
          <Route path={"/RequestList"} element={<RequestList />} />
          <Route path={"/CustomerProfile"} element={<CustomerProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
