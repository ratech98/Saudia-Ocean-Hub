import React from "react";
import "./Navabr.css";
import Logo from "../../assets/Logo/logo.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import searchIcon from '../../assets/Icons/search.svg'
import mail from '../../assets/Icons/mail-svgrepo-com.png'
import bell from '../../assets/Icons/bell.svg'
import Ellipse from "../../assets/Images/bg_img.png";

const Navbar = ({link1,link2,link3,showItem,href1,href2,href3,showLogin,showProfile,num,num1,backgroundColor}) => {
  const navigate = useNavigate();
  return (
    <div className="navbar" style={{
      backgroundColor: `${backgroundColor}`,
    }}>
      <Container className="w-100 d-inline">
        <Row>
          <Col sm={3}>
            <Nav>
              <Nav.Item>
                <Nav.Link>
                  <img src={Logo} className="site_logo_img" alt="logo" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={num} className="d-flex align-items-center">
            <Nav>
              <Nav.Item>
                <Nav.Link href="/DashBoard">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" href={href1}>{link1}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={href2} >{link2}</Nav.Link>
              </Nav.Item>
              {showItem && (
                <Nav>
                  <Nav.Item>
                    <Nav.Link href={href3}>{link3}</Nav.Link>
                  </Nav.Item>
                </Nav>
              )}
            </Nav>
          </Col>
          <Col sm={num1} className="d-flex align-items-center justify-content-end">
          {showLogin && (
            <Nav>
              <Nav.Item>
                <Nav.Link href="/logIn">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" href="/userChoice">
                  SignUp
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
          {showProfile && (
            <div className="d-flex">
            <Nav>
              <Nav.Item>
                <Nav.Link>
                <img src={searchIcon} className="search_img" alt="search" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <img src={mail} className="mail_img" alt="mail" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <img src={bell} className="bell_img" alt="mail" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <img src={Ellipse} className="ellipse_img" alt="mail" />
                </Nav.Link>
              </Nav.Item>
            </Nav>
              
              
            </div>
          )}
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
