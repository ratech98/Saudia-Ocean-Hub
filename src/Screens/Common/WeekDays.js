import React from "react";
import { Typography } from "@mui/material";
import moment from "moment";

const WeekDays = ({ item, index, setSelectedDate, selectedDate }) => {
  return (
    <>
      {item?.days?.map((weekDay, weekIndex) => {
        return (
          <div
            style={{
              ...styles.headerContent,
              backgroundColor: weekDay?.isValid
                ? selectedDate === weekDay?.date
                  ? "#3973a5"
                  : "white"
                : "#ececec",
            }}
            onClick={() => {
              if (weekDay?.isValid) {
                setSelectedDate(weekDay?.date);
              }
            }}
          >
            <Typography
              style={{
                ...styles.lableTxt,
                color: weekDay?.isValid
                  ? selectedDate === weekDay?.date
                    ? "white"
                    : "#424651"
                  : "#c6c6c6",
              }}
            >
              {weekDay?.day}
            </Typography>
            <Typography
              style={{
                ...styles.lableTxt,
                color: weekDay?.isValid
                  ? selectedDate === weekDay?.date
                    ? "white"
                    : "#424651"
                  : "#c6c6c6",
              }}
            >
              {moment(weekDay?.date).format("D")}
            </Typography>
          </div>
        );
      })}
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
  lableTxt: {
    fontFamily: "Poppins",
    fontSize: "20px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.15,
    letterSpacing: "normal",
    textAlign: "center",
    color: "#424651;",
    // width: "50%",
    // backgroundColor: "red",
    width: "100%",
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
