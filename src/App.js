import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import StoreAuth from "./Screens/StoreAuth";
import { RootNavigator } from "./Navigation/root-navigator";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./AuthWrapper";

const App = () => {
  const [myLoader, setMyLoader] = useState(true);
  const [getSession, setGetSession] = useState(null);
  const [getdata, setGetdata] = useState(null);
  const [calculateTime, setCalculateTime] = useState(false);

  const handleData = (data) => {
    setGetdata(data);
  };

  // console.log("calculateTime", calculateTime);
  return (
    <Provider store={store}>
      <ToastContainer />
      <RootNavigator calculateTime={calculateTime} />
      {/* {myLoader ? (
        <>
          <StoreAuth
            data={handleData}
            setCalculateTime={setCalculateTime}
            setMyLoader={setMyLoader}
          />
        </>
      ) : (
        <>
          <BrowserRouter>
            <AuthWrapper />
          </BrowserRouter>
        </>
      )} */}
    </Provider>
  );
};

export default App;

// Set data in local storage
// localStorage.setItem("key", "value");
//
// Get data from local storage
// const value = localStorage.getItem("key");
//
// Remove data from local storage
// localStorage.removeItem("key");
