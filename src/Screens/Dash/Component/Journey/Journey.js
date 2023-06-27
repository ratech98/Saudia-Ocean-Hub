import React from "react";
import "./Journey.css";
import Boat from "../../../../Asset/Icons/boat_carousal_1.png";
import Question_Mark from "../../../../Asset/Icons/question_mark.png";
import { Col, Container, Row } from "react-bootstrap";

const Journey = () => {
  return (
    <div>
      <Container fluid className="p-0">
        <div className="choose_journey">
          <div className="d-flex justify-content-center choose_journey_title">
            <h2 className="">
              Choose Your Journey To Go With Saudia Ocean Hub
            </h2>
          </div>
          <Row>
            <Col>
              <img className="boat_img" src={Boat} alt="boat_carousal_img" />
            </Col>
            <Col>
              <img
                className="boat_img"
                src={Question_Mark}
                alt="boat_carousal_img"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default Journey;
