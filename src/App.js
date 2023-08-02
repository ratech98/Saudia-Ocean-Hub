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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// @media (max-width: 1000px) {
//   .docUploadContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 20px;
//     /* background-color: darkgrey; */
//     align-items: center;
//   }
//   .TypographyContainer .subtitleTxt {
//     font-family: Poppins;
//     font-size: 30px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: center;
//     color: var(--charcoal-grey-87);
//   }
//   .boatDetailContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 20px;
//     padding: 0px 150px 0px 150px;
//     /* background-color: aqua; */
//   }
//   .boatDetailContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }

//   .boatDetailContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 14px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .docUploadContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }
//   .docUploadContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 15px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .doc_img {
//     padding: 18px;
//     background-color: white;
//     border-radius: 500px;
//     align-self: "center";
//     align-items: "center";
//     display: "flex";
//   }

//   .addFilesIcon {
//     flex: 1;
//     background-color: white;
//     height: 60px;
//     width: 70px;
//   }
//   .addBoatDetial {
//     flex: 1;
//     width: 75px;
//     height: 65px;
//   }
//   .contentContainer {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     border-color: #026b93;
//     border-width: 2px;
//     border-radius: 30px;
//     border-style: solid;
//     align-self: flex-end;
//     padding: 25px 60px;
//     margin: 20px 200px 0px 0px;
//   }
//   .actionButton {
//     font-family: Poppins;
//     font-size: 20px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.46;
//     letter-spacing: normal;
//     text-align: left;
//     color: #026b93;
//     cursor: pointer;
//   }
//   .containerBody .boatOfferTitle {
//     font-size: 38px;
//   }
// }

// @media (max-width: 800px) {
//   .docTextArea {
//     width: 100%;
//     /* min-width: 50%; */
//     /* padding-left: 5%; */
//     /* background-color: antiquewhite; */
//   }
//   .docUploadContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 20px;
//     /* background-color: darkgrey; */
//     align-items: center;
//     width: 100%;
//   }
//   .TypographyContainer .subtitleTxt {
//     font-family: Poppins;
//     font-size: 30px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: center;
//     color: var(--charcoal-grey-87);
//   }
//   .boatDetailContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 20px;
//     padding: 0px 150px 0px 150px;
//     /* background-color: aqua; */
//   }
//   .boatDetailContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }

//   .boatDetailContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 14px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .docUploadContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }
//   .docUploadContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 15px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .doc_img {
//     padding: 18px;
//     background-color: white;
//     border-radius: 500px;
//     align-self: "center";
//     align-items: "center";
//     display: "flex";
//   }

//   .addFilesIcon {
//     flex: 1;
//     background-color: white;
//     height: 60px;
//     width: 70px;
//   }
//   .addBoatDetial {
//     flex: 1;
//     width: 75px;
//     height: 65px;
//   }
//   .contentContainer {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     border-color: #026b93;
//     border-width: 2px;
//     border-radius: 30px;
//     border-style: solid;
//     align-self: flex-end;
//     padding: 25px 60px;
//     margin: 20px 200px 0px 0px;
//   }
//   .actionButton {
//     font-family: Poppins;
//     font-size: 20px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.46;
//     letter-spacing: normal;
//     text-align: left;
//     color: #026b93;
//     cursor: pointer;
//   }
//   .containerBody .boatOfferTitle {
//     font-size: 28px;
//   }
// }

// @media (max-width: 600px) {
//   .docTextArea {
//     width: 100%;
//     /* min-width: 50%; */
//     /* padding-left: 5%; */
//     /* background-color: #026b93; */
//   }
//   .docUploadContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 30px;
//     padding: 0px 50px 0px 50px;
//     /* background-color: darkgrey; */
//   }
//   .TypographyContainer .subtitleTxt {
//     font-family: Poppins;
//     font-size: 30px;
//     font-weight: normal;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: center;
//     color: var(--charcoal-grey-87);
//   }
//   .boatDetailContainer {
//     display: flex;
//     flex-direction: row;
//     margin-top: 30px;
//     padding: 0px 50px 0px 50px;
//     /* background-color: aqua; */
//   }
//   .boatDetailContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }

//   .boatDetailContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 14px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .docUploadContainer .uploadBoatDocTitleTxt {
//     font-family: Poppins;
//     font-size: 24px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.53;
//     letter-spacing: normal;
//     text-align: left;
//     color: var(--charcoal-grey-87);
//   }
//   .docUploadContainer .uploadBoatDocTxt {
//     font-family: Poppins;
//     font-size: 15px;
//     font-weight: 300;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.5;
//     letter-spacing: normal;
//     text-align: left;
//     color: rgba(66, 70, 81, 0.6);
//   }
//   .doc_img {
//     padding: 18px;
//     background-color: white;
//     border-radius: 500px;
//     align-self: "center";
//     align-items: "center";
//     display: "flex";
//   }

//   .addFilesIcon {
//     /* flex: 1; */
//     background-color: white;
//     height: 60px;
//     width: 70px;
//     /* background-color: #424651; */
//   }
//   .addBoatDetial {
//     flex: 1;
//     width: 75px;
//     height: 65px;
//   }
//   .contentContainer {
//     display: flex;
//     /* flex-direction: row; */

//     border-color: #026b93;
//     border-width: 2px;
//     border-radius: 30px;
//     border-style: solid;

//     /* padding: 25px 60px; */
//     /* margin: 20px 200px 0px 0px; */
//     /* background-color: #026b93; */
//     justify-content: center;
//     align-content: center;
//     align-items: center;
//     align-self: center;
//   }
//   .actionButton {
//     font-family: Poppins;
//     font-size: 20px;
//     font-weight: 600;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.46;
//     letter-spacing: normal;
//     text-align: left;
//     color: #026b93;
//     cursor: pointer;
//   }
//   .containerBody .boatOfferTitle {
//     font-size: 28px;
//   }
// }
