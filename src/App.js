import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { ToastContainer } from "react-toastify";

import { RootNavigator } from "./Navigation/root-navigator";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  // console.log("calculateTime", calculateTime);

  //   useEffect(() => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     console.log("emtry tab clode");
  //     ev.preventDefault();
  //     localStorage.removeItem("persist:root");
  //     // return (ev.returnValue = "Are you sure you want to close?");
  //   });
  //   }, []);

  // useEffect(() => {
  //   const handleBackButton = (event) => {
  //     // Prevent the default behavior of the back button
  //     event.preventDefault();
  //     // Force the user back to the current route
  //     navigate(location.pathname);
  //   };
  //   window.addEventListener("popstate", handleBackButton);
  //   return () => {
  //     // Clean up the event listener when the component unmounts
  //     window.removeEventListener("popstate", handleBackButton);
  //   };
  // }, [location.pathname, navigate]);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <RootNavigator />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default App;

// Kitchen/Galley
// WiFi
// Crew/Guide
// Dining Area
// Restrooms/Toilets
// Sun Deck
// Lounge
// Sleeping Cabins
// Entertainment
// Bar
// Safety Equipment
// Fishing Gear
// Snorkeling/Diving Gear
// Water Sports Equipment
// Observation Deck
// Spa/Wellness
// Medical Facilities
// Disabled Access
// Conference/Meeting Rooms
// Environmental Features
