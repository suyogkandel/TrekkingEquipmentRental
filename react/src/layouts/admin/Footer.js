import React from 'react';


const Footer = () => {
    const date=new Date()
  const year=date.getFullYear()
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                <p className="section__description d-flex
            align-items-center justify-content-center gap-1 pt-4">
              <i className="ri-copyright-line"></i>Copyright {year},
              Developed By: 5UY0G. All rights reserved by Trekking Equipment Rental
            </p>
                    
                </div>
            </div>
        </footer>
    );
}

export default Footer;