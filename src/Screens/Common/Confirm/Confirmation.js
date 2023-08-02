import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../Images";
import "./Confirmation.css";
import { confirmTickMsg } from "../../../redux/slices";
import { Container } from "react-bootstrap";

export const Confirmation = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className="container-glass">
        <img src={IMAGES.APP_ICON} alt="ICON" className="appIcon" />
        <Container
          // className="justify-content-center"
          // fluid
          // className="p-0"
          className="d-flex justify-content-center"
        >
          <div className="inside-body">
            <img src={IMAGES.CONFIRM_TICK} alt="ICON" className="tick-icon" />
            <Typography className="reqSentTxt">
              {auth?.confirmTickMsg_title ?? "Request Sent Successfully"}
            </Typography>
            <Typography className="msgTxt">
              {auth?.confirmTickMsg_title
                ? null
                : "Our team is now processing your request. If you have any further questions or need assistance, please don`t hesitate to contact our support team"}
            </Typography>
            <Typography
              className="backToHomeTxt"
              onClick={() => {
                if (auth?.AuthToken) {
                  if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
                    navigate("/boatOwnerDashBoard");
                  } else {
                    navigate("/rental");
                  }
                } else {
                  navigate("/logIn");
                  dispatch(
                    confirmTickMsg({
                      title: null,
                      buttonName: null,
                    })
                  );
                }
              }}
            >
              {auth?.confirmTickMsg_buttonName ?? "back to home"}
            </Typography>
          </div>
        </Container>
      </div>
    </>
  );
};
