import React from "react";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { animated, useSpring, easings } from "react-spring";
import Image1Image from "../../assets/Images/boat_carousal_2.png";

const ImageFrame = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `10px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px`,
});

const Image1 = animated(
  styled("div")({
    backgroundPosition: `center`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    borderRadius: `6px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    alignSelf: `stretch`,
    height: `251px`,
    margin: `0px`,
  })
);

export const BoatCard = () => {
  const [Image1Spring, Image1Api] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9)", opacity: 0 },
  }));

  React.useEffect(() => {
    Image1Api.start({
      ...{ transform: "scale(1)", opacity: 1 },
      delay: 1000,
      config: { duration: 750 },
    });
  }, []);

  return (
    <ImageFrame>
      <Tooltip arrow={true} placement={"top"} title={"This is an Image"}>
        <Image1
          style={{ ...Image1Spring, backgroundImage: `url(${Image1Image})` }}
        ></Image1>
      </Tooltip>
    </ImageFrame>
  );
};
