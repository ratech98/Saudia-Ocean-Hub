import React from 'react'
import Navbar from '../Navbar/Navbar';

const Header = ({link1,link2,link3,showItem,href1,href2,href3,showLogin,showProfile,num,num1,backgroundColor}) => {
 
  const opacity  = 1;
  return (
    <div>
      <Navbar opacity={opacity} link1={link1} link2={link2} link3={link3} showItem={showItem} href1={href1} href2={href2} href3={href3} showLogin={showLogin} showProfile={showProfile}
        num={num} num1={num1} backgroundColor={backgroundColor}
      />
    </div>
  )
}

export default Header;

