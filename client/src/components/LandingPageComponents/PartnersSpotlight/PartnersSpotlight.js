import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PartnersSpotlight.css';
import Slider from "react-slick";
import Partner1 from "../../../assets/images/partners/Partner1.png";
import Partner2 from "../../../assets/images/partners/Partner2.png";
import Partner3 from "../../../assets/images/partners/Partner3.png";
import Partner4 from "../../../assets/images/partners/Partner4.png";
import Partner5 from "../../../assets/images/partners/Partner5.png";

const PartnersSpotlight = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "40px",
        slidesToShow: 4,
        speed: 500
    };
    
    return( 
        <div id='partners' className='landingPartnersSpotlightContainer'>
            <label className='landingPartnersSpotlightLabel'> Partners </label>
            <br/><br/>
            <div className="landingPartnersSpotlightCarousel">
                <Slider {...settings}>
                    <div className="landingPartnersSpotlightImageWrapper">
                        <img src={Partner2} className='landingPartnersSpotlightImage' alt='ReactJS'/>
                    </div>
                    <div className="landingPartnersSpotlightImageWrapper">
                        <img src={Partner5} className='landingPartnersSpotlightImage' alt='NodeJS, ExpressJS'/>
                    </div>
                    <div className="landingPartnersSpotlightImageWrapper">
                        <img src={Partner3} className='landingPartnersSpotlightImage' alt='KTB'/>
                    </div>
                    <div className="landingPartnersSpotlightImageWrapper">
                        <img src={Partner1} className='landingPartnersSpotlightImage' alt='DAAD'/>
                    </div>
                    <div className="landingPartnersSpotlightImageWrapper">
                        <img src={Partner4} className='landingPartnersSpotlightImage' alt='TAÜ'/>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default PartnersSpotlight;