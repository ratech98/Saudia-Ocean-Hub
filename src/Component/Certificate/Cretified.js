import React from "react";
import "./Certified.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cretificate from "../../assets/Images/certified.svg";

const Cretified = () => {
  return (
    <div className="certified">
      <Container fluid>
        <Row
        // style={{ display: "flex" }}
        >
          <Col className="justify-content-center certified__title">
            <h2>
              Trusted by <span style={{ fontWeight: "bolder" }}>PADI®</span>
            </h2>
            <p>
              Saudia Ocean Hub is officially certified as an official hub for
              scuba by PADI Professional Association of Diving Instructors
            </p>
          </Col>
          <Col
            style={{
              //   backgroundColor: "red",
              justifyContent: "flex-end",
              display: "flex",
            }}
            className=""
          >
            <img
              src={Cretificate}
              alt="Cretificate"
              style={{
                width: "297.1px",
                height: "99.5px",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Cretified;
