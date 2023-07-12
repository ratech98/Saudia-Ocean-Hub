import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import StoreAuth from "./Screens/StoreAuth";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import PrivateRoutes from "./Navigation/PrivateRoutes";
import Home from "./Screens/Dash/Home";
import { LogIn } from "./Screens/Auth/Login";
import { Rental } from "./Screens/Dash/RentalBoat/Rental";
import { UserChoice } from "./Screens/Auth/UserChoice";
import { SignUp } from "./Screens/Auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { RequireAuth } from "./RequireAuth";
import { BoatOwnerDashBoard } from "./Screens/Dash/BoatOwnerDashBoard";
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
          <RootNavigator />
        </>
      )}
    </Provider>
  );
};

export default App;

//pull from GJ
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

// <div className="App">
// <BrowserRouter>
//   <Routes>
//     {/* <Route element={<PrivateRoutes />}>
//       <Route element={<Home />} path="/" exact />

//     </Route> */}
//     <Route path="/" element={<UserChoice />} />
//     <Route path="/userChoice" element={<UserChoice />} />
//     <Route path="/signUp" element={<SignUp />} />
//     <Route path="/logIn" element={<LogIn />} />
//     {/* <ProtectedRoute path="/rental" component={Rental} auth={true} /> */}
//     <Route
//       path="/rental"
//       element={
//         <RequireAuth>
//           <Rental />
//         </RequireAuth>
//       }
//     />
//     <Route
//       path="/boatOwnerDashBoard"
//       element={
//         <RequireAuth>
//           <BoatOwnerDashBoard />
//         </RequireAuth>
//       }
//     />
//   </Routes>
// </BrowserRouter>
// </div>

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
//
//
//
//
//
//
//
//
//

// import React, { useContext, createContext, useState } from "react";
// import {
//   Link,
//   Route,
//   Router,
//   useLocation,
//   useNavigate,
//   Switch,
//   Routes,
//   Navigate,
// } from "react-router-dom";

// export default function App() {
//   return (
//     <ProvideAuth>
//       <Router>
//         <div>
//           <AuthButton />

//           <ul>
//             <li>
//               <Link to="/public">Public Page</Link>
//             </li>
//             <li>
//               <Link to="/protected">Protected Page</Link>
//             </li>
//           </ul>

//           <Routes>
//             <Route path="/public">
//               <PublicPage />
//             </Route>
//             <Route path="/logIn">
//               <LoginPage />
//             </Route>
//             <PrivateRoute path="/protected">
//               <ProtectedPage />
//             </PrivateRoute>
//           </Routes>
//         </div>
//       </Router>
//     </ProvideAuth>
//   );
// }

// const fakeAuth = {
//   isAuthenticated: false,
//   signin(cb) {
//     fakeAuth.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     fakeAuth.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };

// /** For more details on
//  * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
//  * refer to: https://usehooks.com/useAuth/
//  */
// const authContext = createContext();

// function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// function useAuth() {
//   return useContext(authContext);
// }

// function useProvideAuth() {
//   const [user, setUser] = useState(null);

//   const signin = (cb) => {
//     return fakeAuth.signin(() => {
//       setUser("user");
//       cb();
//     });
//   };

//   const signout = (cb) => {
//     return fakeAuth.signout(() => {
//       setUser(null);
//       cb();
//     });
//   };

//   return {
//     user,
//     signin,
//     signout,
//   };
// }

// function AuthButton() {
//   let history = useNavigate();
//   let auth = useAuth();

//   return auth.user ? (
//     <p>
//       Welcome!{" "}
//       <button
//         onClick={() => {
//           auth.signout(() => history.push("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   );
// }

// // A wrapper for <Route> that redirects to the login
// // screen if you're not yet authenticated.
// function PrivateRoute({ children, ...rest }) {
//   let auth = useAuth();
//   const navigate = useNavigate();
//   let location = useLocation();
//   return (
//     <Route
//       {...rest}
//       render={
//         ({ location }) =>
//           auth.user ? (
//             children
//           ) : (
//             <Navigate to={{ pathname: "/login", state: { from: location } }} />
//           ) // Pass the current location as 'from'
//       }
//     />
//   );
// }

// function PublicPage() {
//   return <h3>Public</h3>;
// }

// function ProtectedPage() {
//   return <h3>Protected</h3>;
// }

// function LoginPage() {
//   let history = useNavigate();
//   let location = useLocation();
//   let auth = useAuth();

//   let { from } = location.state || { from: { pathname: "/" } };
//   let login = () => {
//     auth.signin(() => {
//       history.replace(from);
//     });
//   };

//   return (
//     <div>
//       <p>You must log in to view the page at {from.pathname}</p>
//       <button onClick={login}>Log in</button>
//     </div>
//   );
// }
