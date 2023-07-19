import { LocationOn } from "@material-ui/icons";
import { Typography } from "@mui/material";
import React from "react";

const Marker = ({ selected, onClick, children, lat, lng }) => (
  <div
    style={{
      // // position: "absolute",
      // // transform: "translate(-50%, -50%)",
      // cursor: "pointer",
      // // backgroundColor: selected && selected.lat ? "red" : "blue",
      // width: "70px",
      // height: "10px",
      // display: "flex",
      // // borderRadius: "50%",
      // flexDirection: "column",
      // justifyContent: "center",
      // alignItems: "center",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      cursor: "pointer",
      backgroundColor: "red",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
    }}
    lat={lat}
    lng={lng}
  >
    {/* <LocationOn style={{ color: "white", width: "20px", height: "20px" }} />
    <Typography
      style={{
        fontSize: 14,
        color: "white",
        backgroundColor: "#3973a5",
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      {children}
    </Typography> */}
  </div>
);

export default Marker;
