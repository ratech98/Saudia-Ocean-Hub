import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

const CalendarComponent = ({
  setSelectedDateTime,
  selectedDateTime,
  onDateSelect,
  errorShow,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 365); // Add days

  useEffect(() => {
    if (selectedDateTime.length > 0) {
      setSelectedDate(selectedDateTime[0].date);
    } else {
      setSelectedDate(null);
    }
  }, [selectedDateTime]);

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

  const handleDateSelect = (date) => {
    const isDateSelected = selectedDateTime.some((selectedDay) =>
      isSameDay(selectedDay.date, date)
    );
    if (!isDateSelected) {
      const updatedDays = [...selectedDateTime, { date, time: ["10:00 AM"] }];
      setSelectedDateTime(updatedDays);
    }
    setSelectedDate(date);
    onDateSelect(date);
  };

  const isTargetDate = (date) => {
    if (errorShow) {
      const targetDate = errorShow;
      // new Date("Wed Jun 21 2023 00:00:00 GMT+0530");
      return isSameDay(targetDate, date);
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        minDate={new Date()}
        onChange={handleDateSelect}
        value={selectedDate}
        selectRange={false}
        tileClassName={({ date }) => {
          if (isDaySelected(date) && !isTargetDate(date)) {
            return "selected-day";
          } else if (isTargetDate(date)) {
            return "target-date";
          }
          return null;
        }}
        className="custom-calendar"
        maxDate={maxSelectableDate}
      />
    </div>
  );
};

export default CalendarComponent;
