import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Boat from "../../assets/Images/boat_carousal_1.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaMoneyBill } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import "./Imagebox.css";
import Star from "../../assets/Images/star.webp";
import StarOff from "../../assets/Images/XMLID_16_.png";
import IMAGES from "../../Screens/Images";
import { StarRating } from "../../UI kit/5Star/StarRating";

const Imagebox = ({ imageBox }) => {
  // const imageBox = [
  //   {
  //     id: 1,
  //     image: Boat,
  //     boatName: "Peace Boat",
  //     placeName: "Russel Madam",
  //     starCount: 4,
  //     moneyIcon: FaMoneyBill,
  //     money: "55000 SAR",
  //     userGroup: FaUsers,
  //     member: "15",
  //   },
  //   {
  //     id: 2,
  //     image: Boat,
  //     boatName: "Al Madina Boat",
  //     placeName: "Yanbu",
  //     starCount: 4,
  //     moneyIcon: FaMoneyBill,
  //     money: "6000 SAR",
  //     userGroup: FaUsers,
  //     member: "15",
  //   },
  //   {
  //     id: 3,
  //     image: Boat,
  //     boatName: "Russel Madam",
  //     placeName: "Riyadh",
  //     starCount: 5,
  //     moneyIcon: FaMoneyBill,
  //     money: "10000 SAR",
  //     userGroup: FaUsers,
  //     member: "12",
  //   },
  // ];

  return (
    <div>
      <Container
        className="d-flex flex-wrap justify-content-between"
        style={{ marginTop: 30 }}
      >
        {imageBox?.map((item) => (
          <>
            {console.log("item", item)}
            <Card style={{ borderRadius: 0, width: 400 }} key={item?.id}>
              <Card.Img
                variant="top"
                src={IMAGES?.boat1 ?? item?.image}
                style={{ borderRadius: 0 }}
              />
              <Card.Body>
                <Card.Title>{item?.boat_name}</Card.Title>
                <Card.Text className="place_name">
                  {item?.marine_city}
                </Card.Text>
                {/* default value */}
                <div className="star_ratings">
                  <StarRating rating={5} />
                </div>
                <Row className="justify-content-between">
                  <Col>
                    <Row className="gap-3">
                      <Col xs={1}>
                        <Card.Text>
                          <img
                            src={IMAGES.MONEY_CARD}
                            style={{ width: "28px", height: "30px" }}
                            className="moneyIcon"
                            alt="money"
                          />
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text className="money">
                          {item?.price_per_hour} {item?.price_currency}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col style={{ display: "contents" }}>
                    <Row className="gap-3">
                      <Col xs={1}>
                        <Card.Text>
                          <img
                            src={IMAGES.GROUP}
                            style={{ width: 36, height: 25 }}
                            color="rgba(66, 70, 81, 0.87)"
                            alt="grp"
                          />
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text className="member">
                          {item?.boat_max_capacity}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </>
        ))}
      </Container>
    </div>
  );
};

export default Imagebox;
