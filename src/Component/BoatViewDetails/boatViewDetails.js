import React,{useState} from 'react';
import './boatViewDetails.css';
import Banner from '../Banner/Banner';
import BoatView from '../BoatView/boatView';
import Backgroundimg from "../../assets/Images/bg_img.png";
import Footer from '../Footer/Footer';
import Imagebox from '../ImageBox/Imagebox';
import { Container } from "react-bootstrap"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import data from "../../boatDetailsViewsJson.json";
import Policy from '../CancelationPolicy/Policy';
import Client_review from '../Testimonial/Client_review'
import {FaCheck,FaAngleRight} from "react-icons/fa";
import CalendarComponent from '../../Screens/Common/Calendar/CalendarComponent';
import Map from '../../Screens/Common/map/Map';
import locationIcon from '../../assets/Icons/location.svg';
import { current } from '@reduxjs/toolkit';



const boatViewDetails = () => {
    const link1 ='Boat Offers';
    const link2 = 'My Listings';
    const link3 = 'List a Boat Offer';
    const href1 ='#';
    const href2 ='#';
    const href3 = '#';
    const num = '5';
    const num1 = '4'
    const showItem = true;
    const showLogin = false;
    const showProfile = true;
    const backgroundImage = Backgroundimg;
    const content =
      "Riyadh";
    const title = "Night Light";
    const titleStyle = {
        // width: 472,
        // height: 119,
        marginTop: 150,
        fontFamily: 'Poppins',
        fontSize: 85,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.51,
        letterSpacing: 'normal',
        textAlign: '-webkit-center',
        color: '#424651',
      };
      const descStyle = {
        // width: 239,
        // height: 84,
        fontFamily: "Poppins",
        fontSize: 60,
        fontWeight: 500,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.5,
        letterSpacing: "normal",
        textAlign: "center",
        color: "#424651",
        marginTtop: 35,
      };
    const backgroundColor = '#fff ';
    const numBorder = 10;
    const numHeight = 257;
    const numWidth = 375;
    const showPlaceName = false;
    const desc = data.parameters.greeting_message;
    const className = 'text';
    const backgroundColors ='#ff';
    const clientPadding  = 0 ;
    const Client_Title_Show = false;
    const scrollingTop = 50;
    const reviewCard_color = 'rgba(102, 155, 195, 0.1)'
    const reviewCard_height = 299;
    const reviewCard_width = 425;
    const reviewCard_center = 'center'

    const handleClick = () => {
      const imageBoxElement = document.querySelector(".imageBoxViews");
      if (imageBoxElement) {
        imageBoxElement.scrollLeft = 200;
        console.log('it work')
      }
    };
    // 

    const handleScroll = () => {
      const imageBoxElement = document.querySelector('.imageBoxViews');
      if (imageBoxElement) {
        imageBoxElement.scrollLeft = 200;
        console.log('it works');
      }
    };


  return (
    <div className="boatViewDetails">
        <Banner link1={link1} link2={link2} link3={link3} showItem={showItem} href1={href1} href2={href2} href3={href3} showLogin={showLogin} showProfile={showProfile} num={num} num1={num1}
         backgroundImage={backgroundImage} titleStyle={titleStyle} descStyle={descStyle}
        content={content}
        title={title} backgroundColor={backgroundColor} className={className}></Banner>
        <div >
        <Container style={{backgroundColor:'#fff',padding:'0px 60px'}}>
        <div>
          <BoatView />
        </div>
        <div className='line'>
          <hr style={{color:'rgba(66, 70, 81, 1)',width:'100%',justifyContent:'center',margin:'auto'}}></hr>
        </div>
        <div className=''>
          <Row>
            <Col xs={1}>
              <img src={Backgroundimg} style={{width:50 , height:50,borderRadius:50}} />
            </Col>
            <Col xs={11} className='boatOwner'>
              <h5>{data.parameters.owner_name}</h5>
              <h6>Boat Owner</h6>
              <div >
                <h3 className='greetingMsg'>{desc}</h3>
              </div>
            </Col>
          </Row>
        </div>
        <div className='line'>
          <hr style={{color:'rgba(66, 70, 81, 1)',width:'100%',justifyContent:'center',margin:'auto'}}></hr>
        </div>
        <div style={{marginTop:70,marginBottom:70}}>
          <Row>
            <Col>
              <h5 className='boat_details'>Boat Details</h5>
              {data.parameters.boats_details.map((item)=>(
                <div>
                  <Row>
                    <Col> 
                      <h5 className='boat_label'>{item.details_label}</h5>
                    </Col>
                    <Col>
                      <h5 className='boat_Value'>{item.details_value}</h5>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
            <Col>
              <h5 className='boat_services'>Services</h5>
              {data.parameters.boats_service.map((item)=>(
                <Row>
                  <Col xs={1}>
                    <FaCheck className='icons' />
                  </Col>
                  <Col xs={11}>
                  <h6 style={{marginLeft:-10}} className='service_label'>{item.service_label}</h6>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </div>
        <div>
          <div>
            <h4 className='avalibility'>Check Avaliability</h4>
          </div>
          <div>
            <Row>
              <Col>
                <CalendarComponent />
              </Col>
              <Col>
                <CalendarComponent />
              </Col>
            </Row>
            
          </div>
        </div>
        <div>
          <div>
            <h4 className='bestlocation'>Best Location</h4>
          </div>
          <div className='map'>
            <Map />
          </div>
          <div>
            <Row style={{alignItems:'center'}}>
              <Col xs={1}>
                <img src={locationIcon} alt='location_img' style={{width:35}} />
              </Col>
              <Col xs={11} style={{marginLeft:-10}}>
                <h4 className='latitude'>{data.parameters.latitude}</h4>
                <h6 className='longtitude'>{data.parameters.longtitude}</h6>
              </Col>
            </Row>
          </div>
        </div>
        <div>
          <div className='client_review_title'>
            <h3 className='client_review_title_text'>What customers say about this boat</h3>
          </div>
          <div>
            <Row className='align-items-center'>
              <Col xs={11} style={{width:'95%'}} className='reviewScroll'>
                <Client_review  backgroundColors={backgroundColors} clientPadding={clientPadding} Client_Title_Show={Client_Title_Show} scrollingTop={scrollingTop}
                reviewCard_color={reviewCard_color} reviewCard_height={reviewCard_height} reviewCard_width={reviewCard_width}  reviewCard_center={reviewCard_center}
              />
              </Col>
              <Col xs={1} style={{width:'5%'}} className='text-end'>
                <FaAngleRight size={35} onClick={handleScroll}/>
              </Col>
            </Row>
            
          </div>
        </div>
        <div>
          <div className='policy_title'>
            <h3 className='policy_title_text'>Cancellation Policy</h3>
          </div>
          <Policy />
        </div>
        <div className='imageBoxViews' >
          <h3 className='imageBoxTitle'>Other Boats for {data.parameters.owner_name}</h3> 
          <div >
            <Row className='align-items-center'>
              <Col xs={11} style={{width:'98%'}}>
                <Imagebox style={{width:'350px !important'}} numBorder={numBorder} numWidth={numWidth} numHeight={numHeight} showPlaceName={showPlaceName}/>
              </Col>
              <Col  xs={1} style={{width:'2%'}} className='text-end'>
                <FaAngleRight size={35} onClick={handleClick}/>
              </Col>
            </Row>
            
          </div>
        </div>
        </Container>
        </div>
        
        <div>
          <Footer />
        </div>
        
    </div>
  )
}
export default boatViewDetails;