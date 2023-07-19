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
  link1,link2,link3,showItem,href1,href2,href3,showLogin,showProfile,num,num1
}) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

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
      <Header link1={link1} link2={link2} link3={link3} showItem={showItem} href1={href1} href2={href2} href3={href3} showLogin={showLogin} showProfile={showProfile} num={num} num1={num1}
        backgroundColor={backgroundColor}
      />
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
