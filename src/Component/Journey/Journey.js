import React from "react";
import "./Journey.css";
import Boat from "../../assets/Images/boat_carousal_1.png";
import Question_Mark from "../../assets/Images/question_mark.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Typography } from "@material-ui/core";

const Journey = ({ handleClick = () => {} }) => {
  return (
    // <div>
    <Container
      // fluid className="p-0"
      className="justify-content-center"
      style={{ margin: "0px", padding: "0px", width: "100", height: "100" }}
    >
      <div
        className="choose_journey"
        // style={{ backgroundColor: "lightgray" }}
      >
        <div className="d-flex justify-content-center choose_journey_title">
          <Typography className="title">
            Choose Your Journey To Go With Saudia Ocean Hub
          </Typography>
        </div>
        <div className="show-img-box">
          <div style={{ width: "100%", backgroundColor: "lightpink" }}>
            <img
              className="boat_img"
              src={Boat}
              alt="boat_carousal_img"
              onClick={() => {
                handleClick("rental");
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              marginLeft: "30px",
              backgroundColor: "lightcoral",
            }}
          >
            <img
              className="boat_img"
              src={Question_Mark}
              alt="boat_carousal_img"
            />
          </div>
        </div>
      </div>
    </Container>
    // </div>
  );
};
export default Journey;
