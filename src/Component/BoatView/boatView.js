import React from 'react'
import './boatView.css'
import Backgroundimg from "../../assets/Images/bg_img.png";
import data from "../../boatDetailsViewsJson.json";
import { Container } from "react-bootstrap"; 
import { FaMoneyBill } from "react-icons/fa";
import { FaUsers } from "react-icons/fa"; 
import { StarRating } from "../../UI kit/5Star/StarRating";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const boatView = () => {
  const boatImages = data.parameters.boats_image; 
  const imageBox = [
    {
      id: 1,
      reviewCount:"(30 reviews)",
      price: "Estimate Price",
      hour: "per  hour",
      starCount: 5,
      money: "750 SAR",
    },
  ];

  return (
    <div className="boatView">
      <Container>
        <div className='d-flex '>
        <Row>
        <Col>
        <div className='d-flex gap-3 boat-view-scroll imageScroll'>
          {boatImages.map((image) => (
          <div key={image.id} >
            <img src={image.path} alt="carousal_img" className='boatViewImage' />
          </div>
        ))}
        </div>
        </Col>
        <Col>
        <div className="review">
        {imageBox.map((item) => (
          <Card style={{ borderRadius: 0, width: 300 }} key={item.id}>
            <Card.Body>
              <div className="star_ratings d-flex" >
                <StarRating rating={item.starCount} />
                <Card.Text className="review_count">{item.reviewCount}</Card.Text>
              </div>
              <Card.Title className="price">{item.price}</Card.Title>
              <div className='d-flex gap-2'>
                <Card.Text className="Sar">{item.money}</Card.Text>
                <Card.Text className="Sar_hour">{item.hour}</Card.Text>
              </div>
              <div className='btn btn-primary book-btn '>
                <h6 className='text-white pt-2'>Send a Book Request</h6>
              </div>
              
            </Card.Body>
          </Card>
        ))}
        </div>
        </Col>
        </Row>
        </div>
        
      </Container>
    </div>
  )
}

export default boatView;