import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Boat from "../../../assets/Images/boat_carousal_1.png";
// import { FaMoneyBill } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
import "./Imagebox.css";
import Star from "../../../assets/Images/star.png";

const Imagebox = () => {
  const imageBox = [
    {
      id: 1,
      image: Boat,
      boatName: "Peace Boat",
      placeName: "Russel Madam",
      star: Star,
      // moneyIcon: FaMoneyBill,
      money: "55000 SAR",
      // userGroup: FaUsers,
      member: "15",
    },
    {
      id: 2,
      image: Boat,
      boatName: "Al Madina Boat",
      placeName: "Yanbu",
      star: Star,
      // moneyIcon: FaMoneyBill,
      money: "6000 SAR",
      // userGroup: FaUsers,
      member: "15",
    },
    {
      id: 3,
      image: Boat,
      boatName: "Russel Madam",
      placeName: "Riyadh",
      star: Star,
      // moneyIcon: FaMoneyBill,
      money: "10000 SAR",
      // userGroup: FaUsers,
      member: "12",
    },
  ];

  return (
    <div>
      <Container
        className="d-flex flex-wrap justify-content-between"
        style={{ marginTop: 30 }}
      >
        {imageBox.map((item) => (
          <Card style={{ borderRadius: 0, width: 400 }} key={item.id}>
            <Card.Img
              variant="top"
              src={item.image}
              style={{ borderRadius: 0 }}
            />
            <Card.Body>
              <Card.Title>{item.boatName}</Card.Title>
              <Card.Text className="place_name">{item.placeName}</Card.Text>
              <Card.Img className="star_img" src={item.star}></Card.Img>
              <Row className="justify-content-between ">
                <Col>
                  <Row className="gap-3">
                    <Col xs={1}>
                      <Card.Text>
                        <item.moneyIcon
                          size={29}
                          color="rgba(66, 70, 81, 0.87)"
                        />
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text className="money">{item.money}</Card.Text>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ display: "contents" }}>
                  <Row className="gap-3">
                    <Col xs={1}>
                      <Card.Text>
                        <item.userGroup
                          size={29}
                          color="rgba(66, 70, 81, 0.87)"
                        />
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text className="member">{item.member}</Card.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Imagebox;
