import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaSearch } from "react-icons/fa";

import Boat_Experience from "../../../assets/Images/removeable/Boating_Experience.png";
import Rentel_Ellipse from "../../../assets/Images/Rental_Ellipse.svg";
import Ellipse from "../../../assets/Images/Ellipse.svg";
import Imagebox from "../../../Component/ImageBox/Imagebox";
import Banner from "../../../Component/Banner/Banner";
import Footer from "../../../Component/Footer/Footer";

export const Rental = () => {
  const [extraInputValue, setExtraInputValue] = useState("");

  const handleExtraInputChange = (event) => {
    setExtraInputValue(event.target.value);
  };
  const backgroundImage = Boat_Experience;
  const title = "Best Boating Experience in Saudi Arabia";
  const showButton = false;
  const titleStyle = {
    width: 660,
    height: 133,
    fontFamily: "Poppins",
    fontSize: 48,
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.38,
    letterSpacing: "normal",
    textAlign: "center",
    // color: 'rgba(66, 70, 81, 0.87)',
  };

  const className = "d-flex justify-content-center";
  const backgroundColor = "#fff";
  const opacity = 0.9;
  const showInput = true;
  const inputStyle = {
    width: 1037,
    height: 70,
    marginTop: 50,
    paddingLeft: 27,
    // paddingTop: 27,
    // paddingBottom: 27,
    borderRadius: 10,
    backgroundColor: "#fff",
    border: "none",
    backgroundImage: "url(${FaSearch})",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 2.75,
    letterSpacing: "normal",
    textAlign: "left",
    color: "rgba(66, 70, 81, 0.4)",
  };
  return (
    <div style={{ backgroundColor: "#f6f6f6" }}>
      <Banner
        backgroundImage={backgroundImage}
        title={title}
        showButton={showButton}
        titleStyle={titleStyle}
        className={className}
        backgroundColor={backgroundColor}
        opacity={opacity}
        inputStyle={inputStyle}
        showInput={showInput}
        extraInputValue={extraInputValue}
        handleExtraInputChange={handleExtraInputChange}
      />
      <Container style={{ paddingTop: 140 }}>
        <div className="d-flex justify-content-between">
          <h5
            style={{
              fontFamily: "Poppins",
              fontSize: 38,
              fontWeight: 600,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 1.74,
              letterSpacing: "normal",
              textAlign: "left",
              color: "rgba(66, 70, 81, 0.87)",
            }}
          >
            Discover Some Boat Offers{" "}
          </h5>
          <h6
            style={{
              fontFamily: "Poppins",
              fontSize: 24,
              fontWeight: 500,
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: 2.75,
              letterSpacing: "normal",
              textAlign: "center",
              color: "rgba(66, 70, 81, 0.6)",
            }}
          >
            show more
          </h6>
        </div>
        <Imagebox />
        <Row style={{ marginTop: 150 }}>
          <Col>
            <div
              className="d-flex align-items-center"
              style={{
                backgroundImage: `url(${Rentel_Ellipse})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: 450,
                width: 450,
              }}
            >
              <h4
                style={{
                  fontFamily: "Poppins",
                  fontSize: 38,
                  fontWeight: 600,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.5,
                  letterSpacing: "normal",
                  textAlign: "center",
                  color: "rgba(66, 70, 81, 0.87)",
                }}
              >
                Over 900 boat trips done through us
              </h4>
            </div>
            <div style={{ marginTop: 120, marginBottom: 120 }}>
              <h4
                style={{
                  fontFamily: "Poppins",
                  fontSize: 30,
                  fontWeight: 500,
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.53,
                  letterSpacing: "normal",
                  color: "rgba(66, 70, 81, 0.87)",
                }}
              >
                Real reviews from happy customers!
              </h4>
              <p
                style={{
                  marginTop: 30,
                  fontFamily: "Poppins",
                  fontSize: 20,
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.5,
                  letterSpacing: "normal",
                  textAlign: "start",
                  color: "rgba(66, 70, 81, 0.6)",
                }}
              >
                Join Our Trusted Community. Our satisfied customers have
                embarked on more than 900 incredible boat trips with us.
                Experience the joy of smooth sailing, breathtaking views, and
                unforgettable moments on the water. Book your dream boat trip
                today and become a part of our growing community of happy
                adventurers.
              </p>
            </div>
          </Col>
          <Col style={{ marginLeft: -120 }}>
            <Row className=" mb-2">
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
            <Row className="mb-2" style={{ marginLeft: -90 }}>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col xs={4} className="p-0">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
              <Col className="d-flex justify-content-end">
                <img src={Ellipse} alt="ellipse" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
