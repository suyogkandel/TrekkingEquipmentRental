import React from 'react'
import { Container,Row,Col,ListGroup,ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const quickLinks=[
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/orders',
    display:'My Orders'
  },
  {
    path:'/collections',
    display:'Category'
  },
  {
    path:'/contact',
    display:'Contact'
  },
  {
    path:'/cart',
    display:'Cart'
  },
  
];
const Footer = () => {

  const date=new Date()
  const year=date.getFullYear()
  return (
  <footer className='footer'>
    <Container>
      <Row>
        <Col lg='4' md='4' sm='12'>
        <div className="logo footer__logo">
              <h1>
                <a href='/home' className="d-flex align-items-center gap-2">
                <i className="ri-home-gear-fill"></i>
                <span>Rent Equipments<br/> Service</span>
                </a>
              </h1>
            </div>
            <p className="footer__logo-content">
            This website provides a wide variety of choices as per desire and affordability. 
            This site also provides the package system in which there are almost all of the basic gears that are required while trekking such as 
            hiking bag, shoes, stick, down jacket. Other items can also be added as per needs of the customer. 
            </p>
        </Col>
        <Col lg='2' md='4' sm='6'>
          <div className="mb-4">
            <h5 className="footer__link-title">Quick Links</h5>
             <ListGroup>
              {
                quickLinks.map((item,index)=>(
                  <ListGroupItem key={index} className='p-0 mt-3 quick__link'>
                  <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
             </ListGroup>
          </div>
        </Col>
        <Col lg='3' md='4' sm='6'>
          <div className="mb-4">
          <h5 className="footer__link-title mb-4">Head Office</h5>
          <p className="office__info">Bharatpur F125, Chitwan, Nepal</p>
          <p className="office__info">Phone: +977-9846872569</p>
          <p className="office__info">Email: suyog.info.np@gmail.com</p>
          <p className="office__info">Office Time: 10am - 5pm</p>
          </div>
        </Col>
        <Col lg='3' md='4' sm='6'>
        <div className="mb-4">
          <h5 className="footer__link-title">Newsletter</h5>
          <p className="section__description">Subscribe to our newsletter</p>
           <div className="newsletter">
            <input type="email" placeholder='Email'/>
            <span>
              <i className="ri-send-plane-line"></i>
            </span>
           </div>
        </div>
        </Col>
        <Col lg='12'>
          <div className="footer__bottom">
            <p className="section__description d-flex
            align-items-center justify-content-center gap-1 pt-4">
              <i className="ri-copyright-line"></i>Copyright {year},
              Developed By: 5UY0G. All rights reserved
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
  )
};

export default Footer;
