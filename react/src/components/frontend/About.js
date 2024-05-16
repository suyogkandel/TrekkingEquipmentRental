import React from 'react';
import Helmet from '../../components/Helmet/Helmet' 
import AboutSection from '../../components/UI/AboutSection' 
import CommonSection from '../../components/UI/CommonSection' 
import OurMembers from '../../components/UI/OurMembers' 
import { Container,Row,Col } from 'reactstrap'
import equipment from '../../assets/all-images/all.jpg'
import '../../styles/about.css'



function About() {
    return  (
        <>
         <Helmet title='About' >
         <CommonSection title='About Us'/>
         <AboutSection  aboutClass='aboutPage'/>

                <section className='about__page-section mt-5'>
            <Container>
                <Row>
                <Col lg='6' md='6' sm='12'>
                    <div className="about__page-img">
                    <img src={equipment} alt="" className='w-100 rounded-3'/>
                    </div>
                </Col>

                <Col lg='6' md='6' sm='12'>
                    <div className="about__page-content">
                    <h2 className="section__title">We are commited to provide
                    quality and buget friendly produts.</h2>
                    <p className="section__description">
                    As we know trekking is becoming more frequent and popular these days. But the cost for buying trekking equipment’s can be quite expensive.
                    As the name suggest Trekking equipment rental is an online shop where people can rent the equipment as their needs and affordability.
                    </p>

                    <p className="section__description">
                    As we know trekking is becoming more frequent and popular these days. But the cost for buying trekking equipment’s can be quite expensive.
                    As the name suggest Trekking equipment rental is an online shop where people can rent the equipment as their needs and affordability.
                    </p>

                    <div className='d-flex align-items-center gap-3 mt-4'>
                        <span className='fs-4'>
                        <i className="ri-phone-line"></i>
                        </span>

                        <div>
                        <h6 className="section__subtitle">Need Any Help?</h6>
                        <h4>+977-9846872569</h4>
                        </div>
                    </div>
                    </div>
                </Col>
                </Row>
            </Container>
            </section>

            <section>
            <Container>
                <Row>
                <Col lg='12' className='mt-5 mb-5 text-center'>
                    <h6 className="section__subtitle">Experts</h6>
                    <h2 className="section__title">Our Members</h2>
                </Col>
                <OurMembers/>
                </Row>
            </Container>
            </section>
         </Helmet>
        


        </>
    )
}

export default About;
