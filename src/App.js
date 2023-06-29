import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import StoreAuth from "./Screens/StoreAuth";
import { RootNavigator } from "./Navigation/root-navigator";

const App = () => {
  const [myLoader, setMyLoader] = useState(true);
  const [getSession, setGetSession] = useState(null);
  const [getdata, setGetdata] = useState(null);

  const handleData = (data) => {
    setGetdata(data);
    setMyLoader(false);
  };

  return (
    <Provider store={store}>
      <ToastContainer />
      {myLoader ? (
        <>
          <StoreAuth data={handleData} />
        </>
      ) : (
        <>
          <RootNavigator
          // ref={navigationRef}
          // initialState={initialNavigationState}
          // onStateChange={onNavigationStateChange}
          // lang={getLang}
          // checkAuth={checkAuth}
          />
        </>
      )}
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

// useEffect(() => {
//   localStorage.removeItem("session");
//   // setGetSession(localStorage.getItem("session"));
// }, []);
