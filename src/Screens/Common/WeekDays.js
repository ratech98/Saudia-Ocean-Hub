import React from "react";
import { Typography } from "@mui/material";
import moment from "moment";

const WeekDays = ({ item, index }) => {
  console.log("item", item);
  return (
    <>
      <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          SAT
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          {moment(item?.date).format("D")}
        </Typography>
      </div>
      {/*  */}
      <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          SUN
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          {moment(item?.date).format("D")}
        </Typography>
      </div>
      {/*  */}
      {/* <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          MON
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div> */}
      {/*  */}
      {/* <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          TUE
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div> */}
      {/*  */}
      {/* <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          WED
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div> */}
      {/*  */}
      {/* <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          THU
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div> */}
      {/*  */}
      {/* <div
        style={{
          ...styles.headerContent,
          //   backgroundColor: selectedDate === index ? "#4f82af" : "white",
        }}
        onClick={() => {
          //   setSelectedDate(index);
        }}
      >
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          FRI
        </Typography>
        <Typography
          style={{
            ...styles.lableTxt,
            // color: selectedDate === index ? "white" : "#424651",
            width: "100%",
          }}
        >
          07
        </Typography>
      </div> */}
    </>
  );
};

export default WeekDays;

const styles = {
  headerContent: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 27px",
    borderRadius: "20px",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "24px",
    marginTop: "32px",
    border: "solid 1px rgba(66, 70, 81, 0.36)",
  },
};

const weekdate = [
  { id: 1, day: "SAT" },
  { id: 2, day: "SUN" },
  { id: 3, day: "MON" },
  { id: 4, day: "TUE" },
  { id: 5, day: "WED" },
  { id: 6, day: "THU" },
  { id: 7, day: "FRI" },
];
