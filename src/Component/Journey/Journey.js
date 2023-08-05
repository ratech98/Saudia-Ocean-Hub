import React from "react";
import "./Journey.css";
import Boat from "../../assets/Images/boat_carousal_1.png";
import Question_Mark from "../../assets/Images/question_mark.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Journey = ({ handleClick = () => {} }) => {
  return (
    <div>
      <Container fluid className="p-0">
        <div className="choose_journey">
          <div className="d-flex justify-content-center choose_journey_title">
            <h2 className="">
              Choose Your Journey To Go With Saudia Ocean Hub
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <div style={{ width: "100%" }}>
              <img
                className="boat_img"
                src={Boat}
                alt="boat_carousal_img"
                onClick={() => {
                  handleClick("rental");
                }}
              />
            </div>
            <div style={{ width: "100%", marginLeft: "30px" }}>
              <img
                className="boat_img"
                src={Question_Mark}
                alt="boat_carousal_img"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Journey;
