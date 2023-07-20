import React, { useEffect, useRef } from "react";
import "./Client_review.css";
import Container from "react-bootstrap/Container";
import Ellipse from "../../assets/Images/Ellipse.svg";

const Client_review = ({
  backgroundColors,
  clientPadding,
  Client_Title_Show,
  scrollingTop,
  reviewCard_color,
  reviewCard_width,
  reviewCard_height,
  reviewCard_center,
}) => {
  const Testimonial = [
    {
      id: 1,
      name: "Abdallah Hazmi",
      place: "Riyadh",
      review: "Best Experiences Ever. Good Idea!",
      image: Ellipse,
    },
    {
      id: 2,
      name: "Baker Arkan",
      place: "Jeddah",
      review: "This is very useful! we had a wonderful time.",
      image: Ellipse,
    },
    {
      id: 3,
      name: "Mohammed Wadi",
      place: "Abha",
      review: "good effort!",
      image: Ellipse,
    },
    {
      id: 4,
      name: "Salem Salem",
      place: "Mecca",
      review: "The most trusted scuba classes! Thank you.",
      image: Ellipse,
    },
    {
      id: 5,
      name: "Salem Salem",
      place: "Mecca",
      review: "The most trusted scuba classes! Thank you.",
      image: Ellipse,
    },
    {
      id: 6,
      name: "Salem Salem",
      place: "Mecca",
      review: "The most trusted scuba classes! Thank you.",
      image: Ellipse,
    },
  ];

  return (
    <div
      className="client_review"
      style={{ backgroundColor: backgroundColors, padding: clientPadding }}
    >
      <Container fluid className="container-padding">
        {Client_Title_Show && (
          <div className="text-center client_review_title">
            <h2>What Our Customers Are Saying</h2>
          </div>
        )}
        <div className="scrollable-row" style={{ paddingTop: scrollingTop }}>
          {Testimonial.map((item) => (
            <div key={item.id} className="flex-nowrap">
              <div
                className="review_card"
                style={{
                  backgroundColor: reviewCard_color,
                  width: reviewCard_width,
                  height: reviewCard_height,
                }}
              >
                <div className="">
                  <img src={item.image} alt="client_img" />
                </div>
                <h4>{item.name}</h4>
                <p>{item.place}</p>
                <h5 style={{ textAlign: reviewCard_center }}>{item.review}</h5>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Client_review;
