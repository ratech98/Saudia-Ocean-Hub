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
    return (
      <div>
        <FormControlLabel
          control={
            <CustomCheckbox
              name="RememberMe"
              checked={item?.status}
              //   onChange={handleCheckboxChange}
              icon={<span className="notify-empty-check-box" />}
              checkedIcon={<span className="notify-tick-check-box">✓</span>}
              disabled={true}
            />
          }
          label={
            <span
              style={{
                color: item?.unselect ? "rgba(66, 70, 81, 0.38)" : "#424651",
              }}
              className="notify-content-name-txt"
            >
              {item?.name}
            </span>
          }
        />
      </div>
    );
  };
  return (
    <>
      <div className="notification">
        <Container
          style={{
            padding: "50px 94px",
          }}
        >
          <Typography className="notify-list-title-txt">
            Booking Notifications
          </Typography>

          <Row style={{ margin: "20px 0px 40px 0px" }}>
            {booking_list?.map((item, index) => {
              return renderList(item);
            })}
          </Row>
          <Typography className="notify-list-title-txt">
            Offer Notifications
          </Typography>
          <Row style={{ margin: "20px 0px 40px 0px" }}>
            {offer_list?.map((item, index) => {
              return renderList(item);
            })}
          </Row>
          <Typography className="notify-list-title-txt">
            Transaction Notifications
          </Typography>
          <Row style={{ margin: "20px 0px 40px 0px" }}>
            {transaction_list?.map((item, index) => {
              return renderList(item);
            })}
          </Row>
        </Container>
      </div>
    </>
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
  { id: 1, name: "Your offer is declined", status: false, unselect: true },
  { id: 2, name: "Your offer is accepted", status: false, unselect: true },
  { id: 3, name: "Your offer is under review", status: false, unselect: true },
];

const transaction_list = [
  { id: 1, name: "a refund is requested", status: true },
  { id: 2, name: "Payment amount is received", status: true },
  { id: 3, name: "Payment amount is sent", status: true },
];
