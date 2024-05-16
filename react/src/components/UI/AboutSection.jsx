import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import '../../styles/about-section.css'
import aboutImg from'../../assets/all-images/gears-img/boot-offer.png'
const AboutSection = ({aboutClass}) => {
  return (
   <section className='about__section' style={
    aboutClass === "aboutPage"
   ? { marginTop: "0px" }
   : { marginTop: "40px" }}>
    <Container>
        <Row>
            <Col lg='6' md='6'>
                <div className="about__section-content mt-5">
                    <h4 className="section__subtitle ">About Us</h4>
                    <h2 className="section__title">Welcome to Trekking Equipment Rental Service</h2>
                    <p className="section__description">
                        As we know trekking is becoming more frequent and popular these days. 
                    But the cost for buying trekking equipment’s can be quite expensive. 
                    As the name suggest Trekking gears rental is an online shop where people can rent the equipment as their needs and affordability. 
                    </p>
                    <div className="about__section-item d-flex align-item-center gap-3">
                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Welcome to Trekking Equipment Rental.
                     </p>

                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Come and book quality products.
                     </p>
                    </div>

                    <div className="about__section-item d-flex align-item-center gap-4">
                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Explore best products from us.
                     </p>

                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Easy access to variety of products.
                     </p>
                    </div>
                </div>
            </Col>

            <Col lg='6' md='6'>
                <div className="about__img mt-5">
                    <img src={aboutImg}
                    alt="" className='w-100'/>
                </div>
            </Col>
        </Row>
    </Container>
   </section>
  )
}

export default AboutSection
