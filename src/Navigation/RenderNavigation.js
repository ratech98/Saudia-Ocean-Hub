import { Route, Routes } from "react-router-dom";
import { Pages } from "./Pages";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export const RenderRoutes = () => {
  const auth = useSelector((state) => state?.auth);
  console.log("RenderRoutes auth", auth);

  return (
    <Routes>
      <>
        {Pages.map((r, i) => {
          // console.log("Pages List", r);

          if (r.isPrivate && auth?.AuthToken) {
            return <Route key={i} path={r.path} element={r.element} />;
          } else if (!r.isPrivate && !auth?.AuthToken) {
            return <Route key={i} path={r.path} element={r.element} />;
          } else if (!r.isPrivate && auth?.AuthToken) {
            return <Route key={i} path={"/"} element={r.element} />;
          } else return <Route key={i} path={"/"} element={r.element} />;
        })}
      </>
    </Routes>
  );
};

// export const RenderMenu = () => {
//   const auth = useSelector((state) => state?.auth);

//   useEffect(() => {
//     const currentURI = window.location.pathname;
//     console.log("currentURI", currentURI);
//   }, []);

//   return (
//     <div>
//       {auth.AuthToken && window.location.pathname === "/logIn" ? (
//         <div>
//           <Typography
//             onClick={() => {
//               console.log("log OUT");
//             }}
//           >
//             Log out
//           </Typography>
//         </div>
//       ) : null}
//     </div>
//   );
// };
