import React from "react";
import { useSpring, animated } from "react-spring";

const loaderStyle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  border: "4px solid #ccc",
  borderTop: "4px solid #007bff", // You can adjust the color as per your preference
};

export const MiniLoader = () => {
  const springProps = useSpring({
    to: async (next) => {
      while (true) {
        await next({ rotate: 360 }); // Rotate 360 degrees
      }
    },
    from: { rotate: 0 },
    config: { duration: 1000 }, // Adjust the duration as needed
    reset: true,
  });

  return (
    <animated.div
      style={{
        ...loaderStyle,
        transform: springProps.rotate.interpolate(
          (rotate) => `rotate(${rotate}deg)`
        ),
      }}
    />
  );
};
