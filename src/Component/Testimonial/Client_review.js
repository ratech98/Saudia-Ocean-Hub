import React, { useEffect, useRef, useState } from "react";
import "./Client_review.css";
import Container from "react-bootstrap/Container";
import Ellipse from "../../assets/Logo/profile.jpg";

const Client_review = ({
  backgroundColors,
  clientPadding,
  Client_Title_Show,
  scrollingTop,
  reviewCard_color,
  reviewCard_width,
  reviewCard_height,
  reviewCard_center,
  bgimage,
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

  const scrollableRowRef = useRef(null);
  const [fullyVisibleCardIds, setFullyVisibleCardIds] = useState([]);

  const handleIntersection = (entries) => {
    const visibleCardIds = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => parseInt(entry.target.dataset.id));
    setFullyVisibleCardIds(visibleCardIds);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (scrollableRowRef.current) {
      const cards = scrollableRowRef.current.querySelectorAll(".review_card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => {
      observer.disconnect();
    };
  }, [Testimonial]);

  return (
    <div className="client_review" style={{ backgroundColor: backgroundColors, padding: clientPadding, backgroundImage: bgimage }}>
      <Container fluid className="container-padding">
        {Client_Title_Show && (
          <div className="text-center client_review_title">
            <h2>What Our Customers Are Saying</h2>
          </div>
        )}
        <div className="scrollable-row" style={{ paddingTop: scrollingTop }} ref={scrollableRowRef}>
          {Testimonial.map((item) => (
            <div key={item.id} className="flex-nowrap">
              <div
                className="review_card"
                style={{
                  backgroundColor: reviewCard_color,
                  width: reviewCard_width,
                  height: reviewCard_height,
                  marginTop: fullyVisibleCardIds.includes(item.id) ? "80px" : "0", 
                }}
                data-id={item.id}
              >
                <div className="review_image">
                  <img src={item.image} alt="client_img"  />
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
