import React from "react";
import "./ScrollableCardList.css";

const ScrollableCardList = ({ cards }) => {
  return (
    <div className="scrollable-card-list">
      <div className="card-placeholder" />
      {cards.map((card, index) => (
        <div key={index} className="card">
          {/* Render your card content here */}
          {"card"}
        </div>
      ))}
      <div className="card-placeholder" />
    </div>
  );
};

export default ScrollableCardList;
