import React from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Skeleton } from "@mui/material";

const localImageBox = [
  {
    id: 1,

    boat_name: "Peace Boat",
    marine_city: "Russel Madam",
    starCount: 4,
    moneyIcon: FaMoneyBill,
    price_per_hour: "55000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "15",
  },
  {
    id: 2,

    boat_name: "Al Madina Boat",
    marine_city: "Yanbu",
    starCount: 4,
    moneyIcon: FaMoneyBill,
    price_per_hour: "6000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "15",
  },
  {
    id: 3,

    boat_name: "Russel Madam",
    marine_city: "Riyadh",
    starCount: 5,
    moneyIcon: FaMoneyBill,
    price_per_hour: "5000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "12",
  },
];

const CardLoader = ({ imageBox = null }) => {
  return (
    <div
      style={{
        margin: "0px",
        paddingLeft: "110px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {localImageBox?.map((item, index) => (
        <>
          <Skeleton
            style={{
              margin: "-50px 42.5px",
              width: "400px",
              height: "400px",
            }}
          />
        </>
      ))}
    </div>
  );
};

export default CardLoader;
