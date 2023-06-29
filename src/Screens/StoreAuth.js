import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StoreAuth = ({ data }) => {
  const user = useSelector((state) => state?.auth);

  useEffect(() => {
    data(user);
    console.log("user", user);
  }, [data, user]);
};

export default StoreAuth;
