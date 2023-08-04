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
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDate, setAvailableDate] = useState([]);
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 365);

  useEffect(() => {
    if (showFixedDates) {
      setAvailableDate(showFixedDates);
    }
  }, [showFixedDates]);

  useEffect(() => {
    if (selectedDateTime?.length > 0) {
      setSelectedDate(selectedDateTime[0].date);
    } else {
      setSelectedDate(null);
    }
  }, [selectedDateTime]);

  // function isSameDay(date1, date2) {
  //   // Extract day, month, and year from date1
  //   const day1 = new Date(date1).getDate();
  //   const month1 = new Date(date1).getMonth();
  //   const year1 = new Date(date1).getFullYear();

  //   // Extract day, month, and year from date2
  //   const day2 = date2.getDate();
  //   const month2 = date2.getMonth();
  //   const year2 = date2.getFullYear();

  //   // Compare the day, month, and year components
  //   return day1 === day2 && month1 === month2 && year1 === year2;
  // }

  // const isSameDay = (date1, date2) => {
  //   return moment(date1).isSame(date2, "day");
  // };

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

  console.log("availableDate", availableDate);

  // Function to check if a given date is present in the availableDate array
  const isDateBooked = (date) => {
    availableDate?.map((item, index) => {
      console.log(
        "item",
        moment(item?.createdAt).format("DD/MM/YYYY"),
        moment(date).format("DD/MM/YYYY"),
        moment(item?.createdAt).format("DD/MM/YYYY") ===
          moment(date).format("DD/MM/YYYY")
      );
    });
    return availableDate.some(
      (item) =>
        moment(item?.createdAt).format("DD/MM/YYYY") ===
        moment(date).format("DD/MM/YYYY")
    );
  };

  // Function to apply custom CSS class to the booked dates
  const tileClassName = ({ date }) => {
    // console.log(
    //   "2222 date",
    //   date,
    //   isDateBooked(date.toISOString().slice(0, 10))
    // );
    if (isDateBooked(date.toISOString().slice(0, 10))) {
      console.log("11111 date", date);
      return "react-calendar__tile--random-date";
    }
    return null;
  };
  return (
    <div className="calendar-container">
      <Calendar
        minDate={availableDate ? null : new Date()}
        onChange={showFixedDates ? null : handleDateSelect}
        value={selectedDate}
        selectRange={false}
        tileClassName={tileClassName}
        // tileClassName={({ date }) => {
        //   // console.log("8888 date", date);
        //   // console.log(
        //   //   "condition===========",
        //   //   availableDate.some((randomDate) => {
        //   //     console.log("randomDate.createdAt", randomDate.createdAt);
        //   //     isSameDay(randomDate.createdAt, date);
        //   //   })
        //   // );
        //   // Check if the date is selected and not the target date
        //   if (isDaySelected(date) && !isTargetDate(date)) {
        //     return "react-calendar__tile--random-date";
        //   }
        //   // Check if the date is the target date
        //   if (isTargetDate(date)) {
        //     return "react-calendar__tile--random-date";
        //   }
        //   // Check if the date is present in the availableDate array
        //   if (availableDate.some((randomDate) => isSameDay(randomDate, date))) {
        //     console.log("=-=-=-=-if", date);
        //     return "react-calendar__tile--random-date";
        //   }
        //   // // Loop through the availableDate array and log items with the same date
        //   // let foundItem = null;
        //   // availableDate?.forEach((item) => {
        //   //   if (
        //   //     moment(item?.createdAt).format("DD/MM/YYYY") ===
        //   //     moment(date).format("DD/MM/YYYY")
        //   //   ) {
        //   //     console.log("=====map", item);
        //   //     foundItem = item;
        //   //   }
        //   // });
        //   // // Return the CSS class name based on your logic here
        //   // if (foundItem) {
        //   //   return "react-calendar__tile--random-date";
        //   // }
        //   return null;
        // }}
        //
        //
        //
        //
        // tileClassName={({ date }) => {
        //   if (isDaySelected(date) && !isTargetDate(date)) {
        //     return "selected-day";
        //   } else if (isTargetDate(date)) {
        //     return "target-date";
        //   }
        //   return null;
        // }}

        className="custom-calendar"
        maxDate={maxSelectableDate}
      />
    </div>
  );
};

export default CalendarComponent;
