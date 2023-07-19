import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StoreAuth = ({ data }) => {
  const user = useSelector((state) => state?.auth);

  useEffect(() => {
    data(user);
    console.log("StoreAuth ==> user", user);
    // console.log(
    //   "StoreAuth ==> localStorage session",
    //   localStorage.getItem("session")
    // );
  }, [data, user]);
};

export default StoreAuth;
