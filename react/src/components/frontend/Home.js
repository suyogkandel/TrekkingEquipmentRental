import React from 'react';
import { Container, Row,Col } from 'reactstrap'
import Helmet from '../Helmet/Helmet' 
import AboutSection from '../UI/AboutSection' 
import HeroSlider from '../UI/HeroSlider' 
import Testimonial from '../UI/Testimonial' 


    
function Home() {
    return  (
        <>
         <Helmet title='Home' >
                {/*-----------hero section------------*/}
                <section className="p-0 hero__slider-section">
                <HeroSlider />
                </section>
                
                {/*-------------about section------*/}
                <AboutSection/>

                {/*---------testimonial- section------*/}
                <section className='mb-5'>
                    <Container>
                    <Row>
                        <Col lg="12" className="mb-2 mt-5 text-center">
                        <h6 className="section__subtitle">Our clients says</h6>
                        <h2 className="section__title">Testimonials</h2>
                        </Col>
                        <Testimonial />
                    </Row>
                    </Container>
                </section>
         </Helmet>
         
        </>
       
        
    )
}

export default Home;
