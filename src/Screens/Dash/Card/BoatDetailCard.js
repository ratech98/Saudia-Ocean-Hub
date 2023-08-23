/**********************************************************************
 *
 *   Component generated by Quest
 *
 *   WARNING: By editing this component by hand, you will lose the ability to regenerate the code without conflicts.
 *   To preserve that ability, always export from Quest to regenerate this file.
 *   To setup element attributes and CSS properties, use the Quest web app
 *   Code Logic goes in the hook associated with this component
 *
 *   For help and further details refer to: https://www.quest.ai/docs
 *
 *
 **********************************************************************/

import React from "react";
import { Tooltip, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { animated, useSpring, easings } from "react-spring";
import IMAGES from "../../Images";
import { StarRating } from "../../../UI kit/5Star/StarRating";
import "./BoatDetailCard.css";
import { makeStyles } from "@material-ui/core/styles";
import useWindowDimensions from "../../../UI kit/useWindowDimensions";

const TypeQuest = animated(
  styled("div")(({ theme }) => ({
    // backgroundColor: `rgba(250, 250, 250, 1)`,
    backgroundColor: "#ffffff",
    // boxShadow: `0px 4px 8px rgba(0, 0, 0, 0.16)`,
    // borderRadius: `8px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    margin: "0px",
    boxSizing: `border-box`,
    overflow: `hidden`,
    height: "auto",
    border: "solid 0.5px rgba(66, 70, 81, 0.4)",
    // backgroundColor:'red'
  }))
);

const ImageFrame = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  //   padding: `10px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px`,
});

const Image1 = animated(
  styled("div")({
    backgroundPosition: `center`,
    // backgroundSize: `contain`,
    backgroundSize: `cover`,
    backgroundRepeat: `no-repeat`,
    // borderTopLeftRadius: `6px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    alignSelf: `stretch`,
    margin: `0px`,
    // borderRadius: `8px`,
  })
);

const Content = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `10px 20px 35px 20px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px`,
});

const Details = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px`,
});

const TitleTop = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px`,
});

const Title = animated(
  styled("div")(({ theme }) => ({
    // textAlign: `left`,
    whiteSpace: `pre-wrap`,
    // fontSynthesis: `none`,
    // fontStyle: `bold`,
    // // fontFamily: `Poppins`,
    // fontWeight: `700`,
    // fontSize: `26px`,
    // letterSpacing: `normal`,
    // textTransform: `none`,
    // margin: `0px`,
    // color: `#424651`,
    // lineHeight: "1.5",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    margin: 0,
    padding: 0,
    width: "100%",
  }))
);

const SubTitle = animated(
  styled("div")(({ theme }) => ({
    // textAlign: `left`,
    // whiteSpace: `pre-wrap`,
    // fontSynthesis: `none`,
    // fontStyle: `bold`,
    // fontWeight: `normal`,
    // fontSize: `20px`,
    // letterSpacing: `normal`,
    // textTransform: `none`,
    // color: `rgba(66, 70, 81, 0.6)`,
    // lineHeight: "1.5",
    display: "flex",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    margin: 0,
    padding: 0,
    width: "100%",
    // backgroundColor: "lightgreen",
  }))
);

const Q3Dots = animated(
  styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `4px`,
    height: `20px`,
    margin: `0px`,
  })
);

const Rectangle1 = styled("div")(({ theme }) => ({
  //   backgroundColor: theme.palette["Text"]["Primary"],
  borderRadius: `10px`,
  width: `4px`,
  height: `4px`,
  position: `absolute`,
  left: `0px`,
  top: `0px`,
}));

const Rectangle2 = styled("div")(({ theme }) => ({
  //   backgroundColor: theme.palette["Text"]["Primary"],
  borderRadius: `10px`,
  width: `4px`,
  height: `4px`,
  position: `absolute`,
  left: `0px`,
  top: `8px`,
}));

const Rectangle3 = styled("div")(({ theme }) => ({
  //   backgroundColor: theme.palette["Text"]["Primary"],
  borderRadius: `10px`,
  width: `4px`,
  height: `4px`,
  position: `absolute`,
  left: `0px`,
  top: `16px`,
}));

const Details1 = animated(
  styled("div")(({ theme }) => ({
    // textAlign: `left`,
    // fontSynthesis: `none`,
    // fontStyle: `normal`,
    // fontWeight: `400`,
    // fontSize: `16px`,
    // letterSpacing: `0.15000000596046448px`,
    // textDecoration: `none`,
    // lineHeight: `150%`,
    // textTransform: `none`,
    // alignSelf: `stretch`,
    // margin: `12px 0px 0px 0px`,
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    width: "100%",
    margin: `12px 0px 0px 0px`,
  }))
);

const ButtonContained = animated(
  styled(Button)({
    margin: `12px 0px 0px 0px`,
  })
);

export const BoatDetailCard = ({
  boatName,
  marine_city = "city",
  starRating = 0,
  priceCurrency = "SAR",
  pricePerHour = 0,
  boatMaxCapacity = "1",
  profile_image,
}) => {
  const class_name = useStyles({ min: 10, max: 30, unit: "px" });
  const { width } = useWindowDimensions();
  const [TypeQuestSpring, TypeQuestApi] = useSpring(() => ({
    config: {
      duration: 100,
      easing: easings["easeOutBack"],
    },
    delay: 0,
    from: { transform: "scale(1)" },
  }));

  const [Image1Spring, Image1Api] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9)", opacity: 0 },
  }));

  const [TitleSpring, TitleApi] = useSpring(() => ({
    config: {
      duration: 500,
      easing: easings["easeInOutExpo"],
    },
    delay: 1250,
    from: { transform: "translateX(25px)", opacity: 0 },
  }));

  const [Q3DotsSpring, Q3DotsApi] = useSpring(() => ({
    config: {
      duration: 500,
      easing: easings["easeOutExpo"],
    },
    delay: 1250,
    from: { opacity: 0 },
  }));

  const [Details1Spring, Details1Api] = useSpring(() => ({
    config: {
      duration: 500,
      easing: easings["easeInOutExpo"],
    },
    delay: 1500,
    from: { transform: "translateY(15px)", opacity: 0 },
  }));

  const [ButtonContainedSpring, ButtonContainedApi] = useSpring(() => ({
    config: {
      duration: 500,
      easing: easings["easeInOutExpo"],
    },
    delay: 1750,
    from: { transform: "translateY(15px)", opacity: 0 },
  }));

  React.useEffect(() => {
    Image1Api.start({
      ...{ transform: "scale(1)", opacity: 1 },
      delay: 1000,
      config: { duration: 750 },
    });
    TitleApi.start({
      ...{ transform: "translateX(0px)", opacity: 1 },
      delay: 1250,
      config: { duration: 500 },
    });
    Q3DotsApi.start({
      ...{ opacity: 1 },
      delay: 1250,
      config: { duration: 500 },
    });
    Details1Api.start({
      ...{ transform: "translateY(0px)", opacity: 1 },
      delay: 1500,
      config: { duration: 500 },
    });
    ButtonContainedApi.start({
      ...{ transform: "translateY(0px)", opacity: 1 },
      delay: 1750,
      config: { duration: 500 },
    });
  }, []);

  return (
    <TypeQuest
      onMouseLeave={() => {
        TypeQuestApi.start({ transform: "scale(1)" });
      }}
      onMouseEnter={() => {
        TypeQuestApi.start({ ...{ transform: "scale(1.05)" }, delay: 0 });
      }}
      // className="card-content"
      //   className={class_name.cardContent}

      style={
        width <= 790
          ? {
              ...TypeQuestSpring,
              width: width / 2.4,
            }
          : width <= 1024
          ? { ...TypeQuestSpring, width: 280 }
          : width <= 1380
          ? {
              ...TypeQuestSpring,
              width: 300,
              //   height: 400,
              // height: 400
            }
          : {
              ...TypeQuestSpring,
              width: 350,
              //   height: 400,
              // height: 400
            }
      }
    >
      <ImageFrame style={{}}>
        <Tooltip
          arrow={true}
          placement={"top"}
          title={"Click to view boat details"}
        >
          <Image1
            style={{
              ...Image1Spring,
              // backgroundImage: `url(${profile_image ?? IMAGES.APP_ICON})`,
              // backgroundSize: profile_image ? "cover" : "contain",
              backgroundImage: `url(${profile_image})`,
              backgroundSize: "cover",
            }}
            className="boat-img"
          ></Image1>
        </Tooltip>
      </ImageFrame>
      <Content className="end-details-item">
        <Details>
          <TitleTop>
            <Title style={{ ...TitleSpring }} className="boat-name-content">
              <Typography
                className="boat-name"
                style={
                  width <= 790
                    ? { fontSize: 12 }
                    : width <= 1024
                    ? { fontSize: 15 }
                    : width <= 1380
                    ? { fontSize: 18 }
                    : { fontSize: 21 }
                }
              >
                {boatName}
              </Typography>
            </Title>

            {/* <Q3Dots style={{ ...Q3DotsSpring }}>
              <Rectangle1></Rectangle1>
              <Rectangle2></Rectangle2>
              <Rectangle3></Rectangle3>
            </Q3Dots> */}
          </TitleTop>
          <TitleTop>
            <SubTitle style={{ ...TitleSpring }} className="city-name-content">
              <Typography
                className="city-name"
                style={
                  width <= 790
                    ? { fontSize: 10 }
                    : width <= 1024
                    ? { fontSize: 13 }
                    : width <= 1380
                    ? { fontSize: 16 }
                    : { fontSize: 19 }
                }
              >
                {" "}
                {marine_city}
              </Typography>
            </SubTitle>

            {/* <Q3Dots style={{ ...Q3DotsSpring }}>
              <Rectangle1></Rectangle1>
              <Rectangle2></Rectangle2>
              <Rectangle3></Rectangle3>
            </Q3Dots> */}
          </TitleTop>
          <Details1 style={{ ...Details1Spring }}>
            <StarRating rating={starRating} />
          </Details1>

          <Details1
            style={{
              ...ButtonContainedSpring,
              //   backgroundColor: "red",
              marginTop: 10,
            }}
            className="end-content"
          >
            <div className="momey-div">
              <Image1
                style={{
                  ...Image1Spring,
                  backgroundImage: `url(${IMAGES.MONEY_CARD})`,
                  marginRight: "10px",
                  // alignSelf: "center",
                  // alignContent: "center",
                  // alignItems: "center",
                  height: 20,
                  width: 20,
                }}
                className="money-icon-style"
              />
              <Typography
                style={{
                  ...ButtonContainedSpring,
                  //   alignSelf: "center",
                  //   alignContent: "center",
                  //   alignItems: "center",
                }}
                className="price-txt"
              >
                {pricePerHour} {priceCurrency}
              </Typography>
            </div>
            <div
              className="momey-div"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignSelf: "flex-end",
                alignContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Image1
                style={{
                  ...Image1Spring,
                  backgroundImage: `url(${IMAGES.GROUP})`,
                  // width: 36,
                  // height: 25,
                  //   alignSelf: "center",
                  //   alignContent: "center",
                  //   alignItems: "center",
                  // backgroundColor: "violet",
                  // marginRight: "10px",
                  height: width <= 790 ? 15 : 25,
                  width: width <= 790 ? 20 : 36,
                }}
                className="group-icon"
              />
              <Typography
                style={{
                  ...ButtonContainedSpring,
                  alignSelf: "center",
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
                className="capacity-txt"
              >
                {boatMaxCapacity}
              </Typography>
            </div>
          </Details1>
        </Details>
      </Content>
    </TypeQuest>
  );
};

const useStyles = makeStyles((theme) => ({
  cardContent: {
    // width: "375px",
    width: "200px",
    height: "auto",
    backgroundColor: "#424651",
    [theme.breakpoints.up("sm")]: {
      width: "293px",
    },
    [theme.breakpoints.up("md")]: {
      width: "290px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "375px",
    },
  },

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //  ==============================    max-width: 767
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // "@media (max-width: 767px)": {
  //   cardContent: {
  //     width: "375px",
  //     height: "auto",
  //     backgroundColor: "#424651",
  //     [theme.breakpoints.up("sm")]: {
  //       width: "300px",
  //     },
  //     [theme.breakpoints.up("md")]: {
  //       width: "300px",
  //     },
  //     [theme.breakpoints.up("lg")]: {
  //       width: "300px",
  //     },
  //   },
  // },
}));
