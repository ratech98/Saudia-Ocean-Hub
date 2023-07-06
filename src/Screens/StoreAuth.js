import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StoreAuth = ({ data, setCalculateTime, setMyLoader }) => {
  useEffect(() => {
    const getCurrentSession = async () => {
      const sessionTime = localStorage.getItem("session");
      const currentTime = moment();
      if (sessionTime) {
        const storedTime = moment(sessionTime, "YYYY-MM-DD HH:mm:ss");
        const timeDifference = currentTime.diff(storedTime, "minutes");
        console.log("timeDifference", timeDifference);
        if (timeDifference > 1) {
          localStorage.removeItem("session");
          setMyLoader(false);
        } else {
          setCalculateTime(true);
          localStorage.setItem("session", currentTime.toString());
          setMyLoader(false);
        }
      } else {
        localStorage.setItem("session", currentTime.toString());
        setMyLoader(false);
      }
    };
    setMyLoader(false);
    // getCurrentSession();
  }, [data, setCalculateTime, setMyLoader]);
};

export default StoreAuth;
