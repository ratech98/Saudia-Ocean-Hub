import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";
import moment from "moment";

const CalendarComponent = ({
  setSelectedDateTime,
  selectedDateTime,
  onDateSelect,
  errorShow,
  showFixedDates,
  setDay,
  setCalendar_date,

  handleCalendarMoth,
  calender_no,
  handleShowMonth,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDate, setAvailableDate] = useState([]);
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 365);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // New state to keep track of the currently displayed month

  useEffect(() => {
    if (showFixedDates) {
      setAvailableDate(showFixedDates);
    }
  }, [showFixedDates]);

  useEffect(() => {
    if (handleShowMonth) {
      setSelectedDate(handleShowMonth);
    } else if (selectedDateTime?.length > 0) {
      setSelectedDate(selectedDateTime[0].date);
    } else if (setDay) {
      setSelectedDate(setDay);
    } else {
      setSelectedDate(null);
    }
  }, [selectedDateTime, setDay]);

  function isSameDay(date1, date2) {
    // Extract day, month, and year from date1
    const day1 = new Date(date1).getDate();
    const month1 = new Date(date1).getMonth();
    const year1 = new Date(date1).getFullYear();

    // Extract day, month, and year from date2
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();

    // Compare the day, month, and year components
    return day1 === day2 && month1 === month2 && year1 === year2;
  }

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
        { date, time: ["00:00 AM"] },
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

  // Function to convert date strings to Date objects using Moment.js
  function convertDatesToJSDateObjects(data) {
    return data.map((item) => ({
      ...item,
      date: moment(item.date, "DD.MM.YYYY").toDate(),
    }));
  }

  // Call the function to convert the dates
  const dataWithJSDateObjects = convertDatesToJSDateObjects(availableDate);

  const handleViewChange = (view) => {
    console.log("Calendar view changed:", view);

    // You can perform any desired operations based on the calendar view change here
    // For example, you can update some state or fetch data for the new view, etc.
  };

  const handleActiveStartDateChange = (date) => {
    // console.log("999 Active start date changed:", date, date?.action);
    if (showFixedDates) {
      handleCalendarMoth(date, calender_no);
      setCalendar_date(date);
    }
    // You can perform any desired operations based on the next/prev button click here
    // For example, you can update some state or fetch data for the new date, etc.
  };
  return (
    <div className="calendar-container">
      <Calendar
        minDate={new Date()}
        maxDate={maxSelectableDate}
        onChange={showFixedDates ? null : handleDateSelect}
        value={selectedDate}
        selectRange={false}
        tileClassName={({ date }) => {
          if (isDaySelected(date) && !isTargetDate(date)) {
            return "react-calendar__tile--random-date";
          } else if (isTargetDate(date)) {
            return "react-calendar__tile--random-date";
          } else if (
            dataWithJSDateObjects.some((randomDate) =>
              isSameDay(randomDate?.date, date)
            )
          ) {
            return "react-calendar__tile--random-date";
          }
          return null;
        }}
        className="custom-calendar"
        onViewChange={handleViewChange} // Attach the view change handler here
        onActiveStartDateChange={handleActiveStartDateChange} // Attach the active start date change handler here
      />
    </div>
  );
};

export default CalendarComponent;
