import React, { useEffect, useState } from 'react';
import './Banner.css';
import Header from '../Header/Header';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FaSearch } from 'react-icons/fa';

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
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Update the window height when the window is resized
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className='Banner'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundColor: `${backgroundColor}`,
        opacity: `${opacity}`,
        height: windowHeight, 
      }}
    >
      <Header />
      <Container className=''>
        <div className={`pt-5 ${className}`}>
          <div>
            <h1 style={titleStyle}>{title}</h1>
            <p style={descStyle}>{content}</p>
            {showButton && (
              <img style={buttonStyle} src={button} alt='banner_button' />
            )}
          </div>
        </div>
        {showInput && (
          <div className={`${className}`}>
            <div style={{ position: 'relative' }}>
              <input
                style={{
                  ...inputStyle,
                  paddingLeft: '30px', // Add left padding to accommodate the search icon
                }}
                type='text'
                placeholder='Search For a City'
                value={extraInputValue}
                onChange={handleExtraInputChange}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '63%',
                  right: '50px',
                  // transform: 'translateY(-50%)',
                }}
              >
                <FaSearch size={24} color='#424651' />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Banner;
