import React, { useEffect, useState } from "react";
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

const localImageBox = [
  {
    id: 1,
    image: Boat,
    boat_name: "Peace Boat",
    marine_city: "Russel Madam",
    starCount: 4,
    moneyIcon: FaMoneyBill,
    price_per_hour: "55000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "15",
  },
  {
    id: 2,
    image: Boat,
    boat_name: "Al Madina Boat",
    marine_city: "Yanbu",
    starCount: 4,
    moneyIcon: FaMoneyBill,
    price_per_hour: "6000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "15",
  },
  {
    id: 3,
    image: Boat,
    boat_name: "Russel Madam",
    marine_city: "Riyadh",
    starCount: 5,
    moneyIcon: FaMoneyBill,
    price_per_hour: "5000",
    price_currency: "SAR",
    userGroup: FaUsers,
    boat_max_capacity: "12",
  },
];

const Imagebox = ({ imageBox = null }) => {
  const [showdata, setShowData] = useState([]);

  useEffect(() => {
    if (imageBox === null) {
      setShowData(localImageBox);
    } else {
      setShowData(imageBox);
    }
  }, [imageBox]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        // backgroundColor: "darkmagenta",
      }}
    >
      <div
        // className="d-flex flex-wrap justify-content-between"
        style={{
          // margin: "0px 0px 0px 125px",
          // margin: "0px 129px",
          // marginLeft: "125px",
          // margin: "50px 0px 140px 0px",
          marginTop: "50px",
          margin: "0px 140px",
          // marginRight: "140px",
          // backgroundColor: "green",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {showdata?.map((item, index) => (
          <>
            <Card
              style={{
                // backgroundColor: "green",
                borderRadius: 0,
                width: 400,
                marginTop: "55px",
                marginLeft: "55px",
                // margin: "0 0 24px",
              }}
              key={item?.id}
            >
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
      </div>
    </div>
  );
};

export default Imagebox;
