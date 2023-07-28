import React from "react";
import "./BoatView.css";
import data from "../boatDetailsViewsJson.json";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StarRating } from "../../../../UI kit/5Star/StarRating";
import { animated, easings, useSpring } from "react-spring";
import { styled } from "@mui/material/styles";
import { Tooltip, Button } from "@mui/material";
import IMAGES from "../../../Images";

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
    width: "414px", // Set the width to 300px
    // height: "400px", // Set the height to 400px
  }))
);

const Title = animated(
  styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    // fontStyle: `bold`,
    fontSize: "18px",
    fontFamily: `Poppins`,
    fontWeight: `normal`,
    letterSpacing: `normal`,
    textTransform: `none`,
    margin: `0px`,
    lineHeight: "1.5",
    color: "rgba(66, 70, 81, 0.8)",
  }))
);

const MoneyHour = animated(
  styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    fontStyle: `bold`,
    fontSize: "20px",
    fontFamily: `Poppins`,
    fontWeight: `600`,
    letterSpacing: `normal`,
    textTransform: `none`,
    margin: `0px`,
    lineHeight: "1.5",
    color: "#424651",
  }))
);

const ButtonContained = animated(
  styled(Button)({
    margin: `26px 0px 0px 0px`,
    backgroundColor: "#3973a5",
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    fontSynthesis: `none`,
    fontStyle: `bold`,
    fontSize: "20px",
    fontFamily: `Poppins`,
    fontWeight: `normal`,
    letterSpacing: `normal`,
    textTransform: `none`,
    lineHeight: "1.5",
    color: "#f6f6f6",
    borderRadius: "10px",
    padding: "10px 30px",
  })
);

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

export const BoatView = ({ boatData }) => {
  // console.log("boatData", boatData);
  const boatImages = data.parameters.boats_image;
  const imageBox = [
    {
      id: 1,
      reviewCount: "(30 reviews)",
      price: "Estimate Price",
      hour: "per  hour",
      starCount: 5,
      money: "750 SAR",
    },
  ];
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
  const [Image1Spring, Image1Api] = useSpring(() => ({
    config: {
      duration: 750,
      easing: easings["easeInOutQuint"],
    },
    delay: 1000,
    from: { transform: "scale(0.9)", opacity: 0 },
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
    ButtonContainedApi.start({
      ...{ transform: "translateY(0px)", opacity: 1 },
      delay: 1750,
      config: { duration: 500 },
    });
  }, []);

  // <div key={image.id}>
  //   <img
  //     src={image.path}
  //     alt="carousal_img"
  //     className="boatViewImage"
  //   />
  // </div>
  return (
    <div className="boatView">
      <Container>
        <div className="d-flex ">
          <Row>
            <Col>
              <div className="d-flex gap-3 boat-view-scroll imageScroll">
                {boatImages.map((image) => (
                  <ImageFrame>
                    <Tooltip
                      arrow={true}
                      placement={"top"}
                      // title={"This is an Image"}
                    >
                      {/* <Image1
                        style={{
                          ...Image1 Spring,
                          // backgroundImage: `url(${image?.path})`,
                          backgroundImage: `url(${IMAGES.boat1})`,
                        }}
                      /> */}
                      <img
                        src={image.path}
                        alt="carousal_img"
                        className="boatViewImage"
                        style={{
                          ...Image1Spring,
                        }}
                      />
                    </Tooltip>
                  </ImageFrame>
                ))}
              </div>
            </Col>
            <Col>
              <div className="review">
                {imageBox.map((item) => (
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
                    style={{
                      ...TypeQuestSpring,
                      borderRadius: 0,
                      width: "100%",
                      padding: "35px",
                    }}
                    key={item.id}
                  >
                    <Card.Body>
                      <div className="star_ratings d-flex">
                        <StarRating rating={item.starCount} />
                        <Card.Text className="review_count">
                          {item.reviewCount}
                        </Card.Text>
                      </div>
                      {/* <Card.Title className="price">{item.price}</Card.Title> */}
                      <Title style={{ ...TitleSpring }}>
                        {"Estimated Price:"}
                      </Title>
                      <div className="d-flex gap-2">
                        {/* <Card.Text className="Sar">{item.money}</Card.Text> */}
                        {/* <Card.Text className="Sar_hour">{item.hour}</Card.Text> */}
                        <MoneyHour style={{ ...TitleSpring }}>
                          {boatData?.price_per_hour} {boatData?.price_currency}{" "}
                          {item.hour}
                        </MoneyHour>
                      </div>
                      {/* <div className="btn btn-primary book-btn ">
                        <h6 className="text-white pt-2">Send a Book Request</h6>
                      </div> */}
                      <ButtonContained
                        variant="contained"
                        size="large"
                        color="primary"
                        // onClick={fns.handleButtonClick}
                        style={{ ...ButtonContainedSpring }}
                      >
                        Send a Book Request
                      </ButtonContained>
                    </Card.Body>
                  </TypeQuest>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};
