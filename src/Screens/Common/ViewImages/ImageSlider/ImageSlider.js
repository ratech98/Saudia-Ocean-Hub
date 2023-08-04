import { useEffect, useRef, useState } from "react";
import "./ImageSlider.css";
import IMAGES from "../../../Images";
import { animated } from "react-spring";
const baseUrl = `http://localhost:3000/`;

const slideStyles = {
  display: "flex",

  width: "100%",
  height: "650px",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ImageSlider = ({ slides, show, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: slides[currentIndex]?.path
      ? `url(${baseUrl + slides[currentIndex].path})`
      : `url(${IMAGES.APP_ICON})`,
  };

  const handleContentClick = (event) => {
    // Prevent propagation of click events to the parent elements
    event.stopPropagation();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={handleContentClick}>
          <div className="slider-styles">
            <div>
              <div onClick={goToPrevious} className="left-arrow">
                ❰
              </div>
              <div onClick={goToNext} className="right-arrow">
                ❱
              </div>
            </div>
            <div style={slideStylesWidthBackground} className="slide-styles" />

            {/* <div className="dots-container-styles">
              {slides?.length ? (
                <>
                  {slides.map((slide, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={() => goToSlide(slideIndex)}
                      className={
                        currentIndex === slideIndex
                          ? "selected-dots"
                          : "dot-style"
                      }
                    >
                      ●
                    </div>
                  ))}
                </>
              ) : null}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;

{
  /*
  
   const slideTransitions = useTransition(slides[currentIndex], {
    from: { opacity: 0, transform: "translateX(100%)" }, // Change translateX to 100%
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" }, // Change translateX to -100%
  });



  {slideTransitions((styles, item) => (
            <animated.div
              key={item?.id}
              style={{
                ...styles,
                ...slideStyles,
                flexDirection: "row",
                backgroundImage: item?.path
                  ? `url(${baseUrl + item.path})`
                  : `url(${IMAGES.APP_ICON})`,
              }}
              className="slide-styles"
            />
          ))} */
}
