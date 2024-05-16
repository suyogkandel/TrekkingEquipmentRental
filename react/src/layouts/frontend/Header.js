import React from 'react'
import{Container,Row,Col} from "reactstrap";
import {Link}from "react-router-dom";
import '../../styles/header.css'
import Logo from '../../assets/logo/logo.png'


const Header = () => {


  return <header className="header">

    <div className="header__top">
      {/*-----------header top--------------*/}
    <Container>
      <Row>
        <Col lg='6' md='6'sm='6'>
          <div className="header__top__left">
            <span>Need Help?</span>
            <span className='header__top__help'>
              <Link to='/contact'>
              <i className="ri-customer-service-2-line">+977-9846872569</i> 
              </Link>
            </span>
          </div>
        </Col>
        
        <Col lg='6' md='6'sm='6'>
        {/* <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
            <Link to='/login' className='d-flex align-items-center gap-1'>
              <i className="ri-login-box-fill"></i> Login
            </Link>
            <Link to='/register' className='d-flex align-items-center gap-1'>
              <i className="ri-file-user-fill"></i> Register
            </Link>
          </div> */}
        </Col>
      </Row>
    </Container>
    </div>

    {/*----------header middle------------*/}
    <div className="header__middle">
      <Container>
        <Row>
          <Col lg='3' md='3' sm='4'>
            <div className="logo">
              <h1>
                <a href='/' className="header__logo d-flex align-items-center gap-2">
                <img  src={Logo} alt="" />
                {/* <span>Rent Gears<br/> Service</span> */}
                </a>
              </h1>
            </div>
          </Col>

          <Col lg='3' md='3' sm='4'>
            <div className="header__location d-flex align-items-center gap-1">
                <span><i className="ri-earth-fill"></i></span>
                <div className="header__location-content">
                  <h4>Nepal</h4>
                  <h6>Chitwan,Nepal</h6>
                </div>
            </div>
          </Col>

          <Col lg='3' md='3' sm='4'>
            <div className="header__location d-flex align-items-center gap-1">
                <span><i className="ri-time-line"></i></span>
                <div className="header__location-content">
                  <h4>Sunday To Friday</h4>
                  <h6>10am - 5pm</h6>
                </div>
            </div>
          </Col>

          <Col lg='3' md='3' sm='0' className="d-flex align-items-center justify-content-end">
            <button className="header__btn btn">
              <a href='/contact'>
              <i className="ri-phone-line"></i> Request a call
              </a>
            </button>
          </Col>
        </Row>
      </Container>
    </div>

    {/*----------------main navigation---------------*/}
    
    
    </header>
}

export default Header;