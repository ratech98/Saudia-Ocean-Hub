import React, { useState } from "react";
import { Star, StarOutline } from "@material-ui/icons";

export const SelectableStarRating = ({ onSelect }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (starNumber) => {
    setSelectedRating(starNumber);
    return onSelect(starNumber);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={starNumber}
            onClick={() => handleStarClick(starNumber)}
            style={{ cursor: "pointer" }}
          >
            {starNumber <= selectedRating ? (
              <>
                <Star style={{ fill: "gold", width: "60px", height: "60px" }} />
              </>
            ) : (
              <>
                <StarOutline
                  style={{
                    fill: "gray",
                    width: "60px",
                    height: "60px",
                    fontWeight: "lighter",
                  }}
                />
              </>
            )}
          </span>
        );
      })}
    </div>
  );
};
