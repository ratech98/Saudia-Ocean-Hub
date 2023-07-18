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
