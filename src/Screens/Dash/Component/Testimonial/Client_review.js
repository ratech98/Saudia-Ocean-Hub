import React, { useEffect, useRef } from "react";
import "./Client_review.css";
import Ellipse from "../../../../Asset/Icons/SVG/Ellipse.svg";
import { Container } from "react-bootstrap";

const Client_review = () => {
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

  const checkVisibility = () => {
    const scrollableRow = scrollableRowRef.current;
    const cards = scrollableRow.getElementsByClassName("review_card");

    const scrollLeft = scrollableRow.scrollLeft;
    const containerWidth = scrollableRow.offsetWidth;

    Array.from(cards).forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();

      const isLastCard = index === Testimonial.length - 1;

      if (isLastCard) {
        const isFullyVisible =
          cardRect.left >= 0 && cardRect.right <= window.innerWidth;
        if (isFullyVisible) {
          card.style.marginTop = "100px";
        } else {
          card.style.marginTop = "";
        }
      } else {
        const isPartiallyVisible =
          cardRect.left < window.innerWidth && cardRect.right > 0;
        if (isPartiallyVisible) {
          const cardLeft =
            cardRect.left - scrollableRow.getBoundingClientRect().left;
          const cardRight = cardLeft + card.offsetWidth;
          if (
            cardLeft < scrollLeft &&
            cardRight > scrollLeft + containerWidth
          ) {
            card.style.marginLeft = `${scrollLeft - cardLeft}px`;
          } else {
            card.style.marginLeft = "";
          }
          card.style.marginTop = "";
        } else {
          card.style.marginLeft = "";
          card.style.marginTop = "";
        }
      }
    });
  };

  useEffect(() => {
    checkVisibility();

    const handleScroll = () => {
      checkVisibility();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="client_review">
      <Container fluid className="container-padding">
        <div className="text-center client_review_title">
          <h2>What Our Customers Are Saying</h2>
        </div>
        <div className="scrollable-row" ref={scrollableRowRef}>
          {Testimonial.map((item) => (
            <div key={item.id} className="flex-nowrap">
              <div className="review_card">
                <div className="">
                  <img src={item.image} alt="client_img" />
                </div>
                <h4>{item.name}</h4>
                <p>{item.place}</p>
                <h5>{item.review}</h5>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Client_review;
