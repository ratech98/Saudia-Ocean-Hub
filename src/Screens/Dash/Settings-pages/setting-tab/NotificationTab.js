import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../Setting.css";
import { withStyles } from "@mui/styles";

const CustomCheckbox = withStyles({
  root: {
    color: "#ffffff",
    "&$checked": {
      color: "#ffffff",
    },
  },
  checked: {},
})(Checkbox);

export const NotificationTab = ({}) => {
  const renderList = (item) => {
    console.log("item", item);
    return (
      <div>
        <FormControlLabel
          control={
            <CustomCheckbox
              name="RememberMe"
              checked={item?.status}
              //   onChange={handleCheckboxChange}
              icon={
                <span
                  style={{
                    border: "1px solid rgba(66, 70, 81, 0.4)",
                    borderRadius: "1px",
                    width: "22px",
                    height: "22px",
                  }}
                />
              }
              checkedIcon={
                <span
                  style={{
                    color: "#424651",
                    border: "1px solid rgba(66, 70, 81, 0.4)",
                    borderRadius: "1px",
                    width: "22px",
                    height: "22px",
                    alignSelf: "center",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  ✓
                </span>
              }
              //   disableTouchRipple={item.status}
              disabled={true}
            />
          }
          label={
            <span
              style={{
                fontSize: "14px",
                color: "rgba(66, 70, 81, 0.87)",
                fontFamily: "Poppins",
              }}
            >
              {item?.name}
            </span>
          }
        />
      </div>
    );
  };
  return (
    <div className="notification">
      <Container
        style={{
          //   height: "100%",
          //   borderRadius: "0",
          //   margin: "0px",
          //   padding: "0px",
          // padding: "80px 200px",
          //   backgroundColor: "white",
          //   width: "100%",
          //   margin: "50px 0px 100px 0px",
          //   padding: "50px 0px",
          margin: "100px 94px",
        }}
      >
        <Typography className="list-title-txt">
          Booking Notifications
        </Typography>

        <Row>
          {booking_list?.map((item, index) => {
            return renderList(item);
          })}
        </Row>
      </Container>
    </div>
  );
};

const booking_list = [
  { id: 1, name: "A booking request is submitted on your offer", status: true },
  { id: 2, name: "A booking request is cancelled", status: false },
  { id: 3, name: "Your booking request is done successfully", status: true },
  {
    id: 4,
    name: "Your booking request is rejected by the owner",
    status: true,
  },
];

const offer_list = [
  { id: 1, name: "Your offer is declined", status: true },
  { id: 2, name: "Your offer is accepted", status: true },
  { id: 3, name: "Your offer is under review", status: true },
];

const transaction_list = [
  { id: 1, name: "a refund is requested", status: true },
  { id: 2, name: "Payment amount is received", status: true },
  { id: 3, name: "Payment amount is sent", status: true },
];
