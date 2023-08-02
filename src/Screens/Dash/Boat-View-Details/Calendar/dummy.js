import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";
import { Typography } from "@mui/material";

const CalendarComponent = ({ setSelectedDateTime, selectedDateTime }) => {
  const isSameDay = (dateA, dateB) => {
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  };

  const isDaySelected = (date) => {
    return selectedDateTime.some((selectedDay) =>
      isSameDay(selectedDay.date, date)
    );
  };
  //   const calendar = selectedDateTime.map((day) => day.date);

  console.log("selectedDateTime", selectedDateTime);
  //   console.log("calendar", calendar);

  //   const calendarDays = calendar.map((date, index) => {
  //     const selectedDay = selectedDateTime.find((day) =>
  //       isSameDay(day.date, date)
  //     );
  //     const isSelected = isDaySelected(date);
  //     return (
  //       <div
  //         key={index}
  //         className={isSelected ? "selected-day" : null}
  //         onClick={() => onDateSelect(date)}
  //       >
  //         {date.getDate()}
  //         {isSelected && (
  //           <input
  //             type="time"
  //             className="time-field"
  //             value={selectedDay.time}
  //             onChange={(e) => onTimeSelect(e, date)}
  //           />
  //         )}
  //       </div>
  //     );
  //   });

  const onDateSelect = (date) => {
    const isDateSelected = selectedDateTime.some((selectedDay) =>
      isSameDay(selectedDay.date, date)
    );

    // if (isDateSelected) {
    //   const updatedDays = selectedDateTime.filter(
    //     (selectedDay) => !isSameDay(selectedDay.date, date)
    //   );
    //   setSelectedDateTime(updatedDays);
    // } else if (selectedDateTime.length < 100) {

    const selectedTime =
      selectedDateTime.length > 0 ? selectedDateTime[0].time : "10:00";
    const updatedDays = [...selectedDateTime, { date, time: selectedTime }];
    setSelectedDateTime(updatedDays);
    // }
  };

  //   const onTimeSelect = (e, date) => {
  //     const selectedTime = e.target.value;
  //     const amPm = e.target.value.split(" ")[1]; // Extracting AM/PM from the input value
  //     const updatedDays = selectedDateTime.map((selectedDay, index) => {
  //       if (
  //         index === selectedDateTime.length - 1 &&
  //         isSameDay(selectedDay.date, date)
  //       ) {
  //         return { ...selectedDay, time: selectedTime + " " + amPm }; // Concatenating AM/PM with the selected time
  //       }
  //       return selectedDay;
  //     });
  //     setSelectedDateTime(updatedDays);
  //   };

  // const onTimeChange = (e, date) => {
  //   console.log("e.target.value", e.target);
  //   const selectedTime = e.target.value;
  //   const updatedDays = selectedDateTime.map((selectedDay) => {
  //     if (isSameDay(selectedDay.date, date)) {
  //       return { ...selectedDay, time: selectedTime };
  //     }
  //     return selectedDay;
  //   });
  //   setSelectedDateTime(updatedDays);
  // };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onDateSelect}
        value={selectedDateTime}
        selectRange={false}
        tileClassName={({ date }) =>
          isDaySelected(date) ? "selected-day" : null
        }
        className="custom-calendar"
      />
      {/* <div className="time-edit-section">
        <Typography className="txt-lable">Starting Time</Typography>
        {selectedDateTime.length > 0 && (
          <div style={{ flexDirection: "row", marginTop: "10px" }}>
            <input
              type="time"
              className="time-field"
              value={selectedDateTime[selectedDateTime.length - 1].time}
              onChange={(e) =>
                onTimeChange(
                  e,
                  selectedDateTime[selectedDateTime.length - 1].date
                )
              }
            />
            <select
              className="am-pm-select"
              value={selectedDateTime[selectedDateTime.length - 1].amPm}
              onChange={(e) => {
                const selectedAmPm = e.target.value;
                const updatedDays = selectedDateTime.map(
                  (selectedDay, index) => {
                    if (
                      index === selectedDateTime.length - 1 &&
                      isSameDay(
                        selectedDay.date,
                        selectedDateTime[selectedDateTime.length - 1].date
                      )
                    ) {
                      return { ...selectedDay, amPm: selectedAmPm };
                    }
                    return selectedDay;
                  }
                );
                setSelectedDateTime(updatedDays);
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        )}
      </div> */}
      {/* {calendarDays} */}
    </div>
  );
};

export default CalendarComponent;
