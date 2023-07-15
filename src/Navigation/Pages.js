import { LogIn } from "../Screens/Auth/Login";
import { SignUp } from "../Screens/Auth/SignUp";
import { UserChoice } from "../Screens/Auth/UserChoice";
import VerifyOTP from "../Screens/Auth/VerifyOTP";
import { BoatOwnerDashBoard } from "../Screens/Dash/BoatOwnerDashBoard";
import { ForgotPassword } from "../Screens/Auth/password/ForgotPassword";
import Home from "../Screens/Dash/Home";
import { ResetPwdVerifyOTP } from "../Screens/Auth/password/ResetPwdVerifyOTP";
import { ChangePassword } from "../Screens/Auth/password/ChangePassword";
import { BoatOfferStep1 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep1";
import { BoatOfferStep2 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep2";
import { BoatOfferStep3 } from "../Screens/Dash/BoatOwner/ListABoatOffer/BoatOfferStep3";
import { MyListings } from "../Screens/Dash/BoatOwner/list/MyListings";
import { RequestList } from "../Screens/Dash/BoatOwner/list/RequestList";
import { CustomerProfile } from "../Screens/Dash/BoatOwner/list/CustomerProfile";
import { SearchBoat } from "../Screens/Dash/SearchBoat";
import { Notification } from "../Screens/new/Notification";
import { ReviewPage } from "../Screens/new/ReviewPage";
import { Confirmation } from "../Screens/new/Confirmation";

export const Pages = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isPrivate: false,
  },
  {
    path: "/userChoice",
    name: "UserChoice",
    element: <UserChoice />,
    isPrivate: false,
  },
  {
    path: "/signUp",
    name: "SignUp",
    element: <SignUp />,
    // isMenu: false,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <LogIn />,
    isPrivate: false,
  },
  {
    path: "/verifyOTP",
    name: "VerifyOTP",
    element: <VerifyOTP />,
    isPrivate: false,
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    element: <ForgotPassword />,
    isPrivate: false,
  },
  {
    path: "/resetPwdVerifyOTP",
    name: "ResetPwdVerifyOTP",
    element: <ResetPwdVerifyOTP />,
    isPrivate: false,
  },
  {
    path: "/changePassword",
    name: "ChangePassword",
    element: <ChangePassword />,
    isPrivate: false,
  },
  //
  //
  //
  //
  //
  //
  {
    path: "/boatOwnerDashBoard",
    name: "BoatOwnerDashBoard",
    element: <BoatOwnerDashBoard />,
    isPrivate: true,
  },
  {
    path: "/boatOwnerDashBoard",
    name: "BoatOwnerDashBoard",
    element: <BoatOwnerDashBoard />,
    isPrivate: true,
  },
  {
    path: "/boatOfferStep1",
    name: "BoatOfferStep1",
    element: <BoatOfferStep1 />,
    isPrivate: true,
  },
  {
    path: "/boatOfferStep2",
    name: "BoatOfferStep2",
    element: <BoatOfferStep2 />,
    isPrivate: true,
  },
  {
    path: "/boatOfferStep3",
    name: "BoatOfferStep3",
    element: <BoatOfferStep3 />,
    isPrivate: true,
  },
  {
    path: "/myListings",
    name: "MyListings",
    element: <MyListings />,
    isPrivate: true,
  },
  {
    path: "/requestList",
    name: "RequestList",
    element: <RequestList />,
    isPrivate: true,
  },
  {
    path: "/customerProfile",
    name: "CustomerProfile",
    element: <CustomerProfile />,
    isPrivate: true,
  },
  {
    path: "/searchBoat",
    name: "SearchBoat",
    element: <SearchBoat />,
    isPrivate: true,
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    element: <Confirmation />,
    isPrivate: true,
  },
  {
    path: "/ReviewPage",
    name: "ReviewPage",
    element: <ReviewPage />,
    isPrivate: true,
  },
  {
    path: "/Notification",
    name: "Notification",
    element: <Notification />,
    isPrivate: true,
  },
];
