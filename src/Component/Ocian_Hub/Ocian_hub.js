import React from "react";
import "./Ocian_hub.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Handshake from "../../assets/Images/handshake.svg";
import Start from "../../assets/Images/start.svg";
import Shift from "../../assets/Images/shift.svg";
import Ellipse from "../../assets/Images/Ellipse.svg";

const Ocian_hub = () => {
  return (
    <div className="ocian_hub">
      <Container fluid>
        <div className="text-center ocian_hub_title">
          <h2 className="">Why Saudia Ocean Hub?</h2>
        </div>
        <Row className="ocian_image_box">
          <Col>
            <div
              style={{
                backgroundImage: `url(${Ellipse})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: 180,
                height: 180,
                display: "grid",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img src={Handshake} alt="handshake" />
            </div>
            <div className="ocian_image_box_title">
              <h4>Flexibility</h4>
              <p>
                At Saudia Ocean Hub, we believe in giving our customers the
                flexibility to plan their bookings according to their own
                schedule.
              </p>
            </div>
          </Col>
          <Col>
            <div
              style={{
                backgroundImage: `url(${Ellipse})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: 180,
                height: 180,
                display: "grid",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img src={Start} alt="Start" />
            </div>
            <div className="ocian_image_box_title">
              <h4>100% Trust Worthy</h4>
              <p>
                At Saudia Ocean Hub, we take pride in offering a safe and secure
                platform for all of our users. We ensure that all of our boats
                are fully licensed and certified.
              </p>
            </div>
          </Col>
          <Col>
            <div
              style={{
                backgroundImage: `url(${Ellipse})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: 180,
                height: 180,
                display: "grid",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <img src={Shift} alt="Shift" />
            </div>
            <div className="ocian_image_box_title">
              <h4>Professional Connection</h4>
              <p>
                At Saudia Ocean Hub, we care about providing a unique
                opportunity for all of our customers to connect together and
                expand their network.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Ocian_hub;
