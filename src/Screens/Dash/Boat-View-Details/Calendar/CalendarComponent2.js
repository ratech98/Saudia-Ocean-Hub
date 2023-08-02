import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

const CalendarComponent2 = ({
  setSelectedDateTime,
  selectedDateTime,
  onDateSelect,
  errorShow,
  dummyRandomDates,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDate, setAvailableDate] = useState([]);
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 365);

  useEffect(() => {
    if (dummyRandomDates) {
      setAvailableDate(dummyRandomDates);
    }
  }, [dummyRandomDates]);

  useEffect(() => {
    if (selectedDateTime?.length > 0) {
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
    return (
      selectedDateTime &&
      selectedDateTime.some((selectedDay) => isSameDay(selectedDay.date, date))
    );
  };

  const handleDateSelect = (date) => {
    const isDateSelected =
      selectedDateTime &&
      selectedDateTime.some((selectedDay) => isSameDay(selectedDay.date, date));
    if (!isDateSelected) {
      const updatedDays = [
        ...(selectedDateTime || []),
        { date, time: ["10:00 AM"] },
      ];
      setSelectedDateTime(updatedDays);
    }
    setSelectedDate(date);
    onDateSelect(date);
  };

  const isTargetDate = (date) => {
    if (errorShow) {
      const targetDate = errorShow;
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
            // return "react-calendar__tile--selected-day";
            return "react-calendar__tile--random-date";
          } else if (isTargetDate(date)) {
            // return "react-calendar__tile--target-date";
            return "react-calendar__tile--random-date";
          } else if (
            availableDate.some((randomDate) => isSameDay(randomDate, date))
          ) {
            return "react-calendar__tile--random-date";
          }
          return null;
        }}
        className="custom-calendar"
        maxDate={maxSelectableDate}
      />
    </div>
  );
};

export default CalendarComponent2;
