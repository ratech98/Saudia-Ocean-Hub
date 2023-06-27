import React from "react";
import "./Banner.css";
import Header from "../Header/Header";
import { FaSearch } from "react-icons/fa";
import { Container } from "react-bootstrap";

const Banner = ({
  backgroundImage,
  content,
  title,
  showButton,
  button,
  titleStyle,
  descStyle,
  className,
  backgroundColor,
  opacity,
  extraInputValue,
  handleExtraInputChange,
  showInput,
  inputStyle,
  buttonStyle,
}) => {
  return (
    <div
      className="Banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundColor: `${backgroundColor}`,
        opacity: `${opacity}`,
      }}
    >
      <Header />
      <Container className="">
        <div className={`pt-5 ${className}`}>
          <div>
            <h1 style={titleStyle}>{title}</h1>
            <p style={descStyle}>{content}</p>
            {showButton && (
              <img style={buttonStyle} src={button} alt="banner_button" />
            )}
          </div>
        </div>
        {showInput && (
          <div className={`${className}`}>
            <div style={{ position: "relative" }}>
              <input
                style={{
                  ...inputStyle,
                  paddingLeft: "30px", // Add left padding to accommodate the search icon
                }}
                type="text"
                placeholder="Search For a City"
                value={extraInputValue}
                onChange={handleExtraInputChange}
              />
              <div
                style={{
                  position: "absolute",
                  top: "63%",
                  right: "50px",
                  // transform: 'translateY(-50%)',
                }}
              >
                <FaSearch size={24} color="#424651" />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
export default Banner;
