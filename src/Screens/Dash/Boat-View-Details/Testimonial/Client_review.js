import React, { useEffect, useRef } from "react";
import "./Client_review.css";
import Container from "react-bootstrap/Container";
import Ellipse from "../../../../assets/Images/Ellipse.svg";
import { animated, easings, useSpring } from "react-spring";
import { styled } from "@mui/material/styles";

const TypeQuest = animated(
  styled("div")(({ theme }) => ({
    backgroundColor: `rgba(250, 250, 250, 1)`,
    boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
    borderRadius: `15px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    // width: "100%",
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
    height: "auto",
    // width: "414px", // Set the width to 300px
    // height: "400px", // Set the height to 400px
    flexShrink: 0,
    width: "300px",
    marginRight: "20px",
    transition: "transform 0.3s ease",
  }))
);

const reviewCard_color = "rgba(102, 155, 195, 0.1)";
const reviewCard_height = 299;
const reviewCard_width = 425;
const reviewCard_center = "center";

const Client_review = ({ id, image, name, place, review }) => {
  const [TitleSpring, TitleApi] = useSpring(() => ({
    config: {
      duration: 500,
      easing: easings["easeInOutExpo"],
    },
    delay: 1250,
    from: { transform: "translateX(25px)", opacity: 0 },
  }));
  const [TypeQuestSpring, TypeQuestApi] = useSpring(() => ({
    config: {
      duration: 100,
      easing: easings["easeOutBack"],
    },
    delay: 0,
    from: { transform: "scale(1)" },
  }));

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

  React.useEffect(() => {
    // Image1Api.start({
    //   ...{ transform: "scale(1)", opacity: 1 },
    //   delay: 1000,
    //   config: { duration: 750 },
    // });
    TitleApi.start({
      ...{ transform: "translateX(0px)", opacity: 1 },
      delay: 1250,
      config: { duration: 500 },
    });
    // Q3DotsApi.start({
    //   ...{ opacity: 1 },
    //   delay: 1250,
    //   config: { duration: 500 },
    // });
    // Details1Api.start({
    //   ...{ transform: "translateY(0px)", opacity: 1 },
    //   delay: 1500,
    //   config: { duration: 500 },
    // });
    //   ButtonContainedApi.start({
    //     ...{ transform: "translateY(0px)", opacity: 1 },
    //     delay: 1750,
    //     config: { duration: 500 },
    //   });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "visible",
        padding: "60px 0px 0px 0px",
      }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: "red",
        }}
      >
        <img
          src={image}
          alt="client_img"
          style={{
            width: "100px",
            height: "120px",
            top: -60,
            position: "absolute",
            // backgroundColor: "red",
            borderRadius: "50px",
            left: 35,
            boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
            zIndex: 1,
            border: "1px solid rgba(102, 155, 195, 0.1)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          // backgroundColor: "gold",
          position: "relative",
        }}
      >
        <TypeQuest
          onMouseLeave={() => {
            TypeQuestApi.start({ transform: "scale(1)" });
          }}
          onMouseEnter={() => {
            TypeQuestApi.start({
              ...{ transform: "scale(1.05)" },
              delay: 0,
            });
          }}
          //   className={props.className}
          className="review_card"
          style={{
            ...TypeQuestSpring,
            backgroundColor: reviewCard_color,
            width: reviewCard_width,
            height: reviewCard_height,
            padding: "50px 20px 20px 20px",
          }}
          key={id}
        >
          {/* <div
                  className="review_card"
                  style={{
                    backgroundColor: reviewCard_color,
                    width: reviewCard_width,
                    height: reviewCard_height,
                    // backgroundColor: "red",
                  }}
                > */}

          <h4>{name}</h4>
          <p>{place}</p>
          <h5 style={{ textAlign: reviewCard_center }}>{review}</h5>
        </TypeQuest>
      </div>
    </div>
  );
};

export default Client_review;
