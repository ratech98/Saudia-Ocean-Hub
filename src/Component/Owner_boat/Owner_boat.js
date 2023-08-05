import React from "react";
import "./Owner_boat.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Boat from "../../assets/Images/owner_boat.png";
import Clock from "../../assets/Images/clock.svg";
import Grow from "../../assets/Images/grow.svg";
import Web from "../../assets/Images/web.svg";

const Owner_boat = ({ handleClick = () => {} }) => {
  return (
    <div>
      <Container fluid className="d-flex">
        <Row>
          <Col className="boat_owners text-start w-50">
            <div className="boat_owners_title">
              <h5>For Boat Owners</h5>
              <h2>It's time for your boat to start paying you back!</h2>
            </div>
            <div className="container-fluid boat_owners_desc">
              <Row className="pb-5">
                <Col sm={2} className="p-0 text-start">
                  <img src={Clock} alt="clock" />
                </Col>
                <Col>
                  <p>
                    Save time, earn more by listing your boat on Saudia Ocean
                    hub
                  </p>
                </Col>
              </Row>
              <Row className="pb-5 text-start">
                <Col sm={2} className="p-0">
                  <img src={Grow} alt="grow" />
                </Col>
                <Col className="text-start">
                  <p>
                    Boost up your business and increase your visitors and
                    profits
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={2} className="p-0 text-start">
                  <img src={Web} alt="web" />
                </Col>
                <Col>
                  <p>
                    Let a wide range of customers know about your boat, and have
                    the freedom to update its information at any time with ease
                  </p>
                </Col>
              </Row>
            </div>
            <div style={{ textAlign: "start" }}>
              <Button
                className="boat_owner_btn"
                onClick={() => {
                  handleClick("boatOwnerDashBoard");
                }}
              >
                List Your Boat Now{" "}
              </Button>
            </div>
          </Col>
          <Col className="p-0 w-50">
            <img src={Boat} alt="boat_owner" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Owner_boat;
