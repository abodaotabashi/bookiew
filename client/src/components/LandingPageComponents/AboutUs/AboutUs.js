import React from 'react';
import './AboutUs.css';
import AboutImage from "../../../assets/images/aboutTeam.png";
import {useTranslation} from "react-i18next";
const AboutUs = () => {
    const {t} = useTranslation();
    return(
        <div id='aboutUs' className='landingAboutUs'>
            <label className='landingAboutUsLabel'> About Us</label>
            <div className='landingAboutUsTextWrapper'>
                <p className='landingAboutUsText'> 
                    {t('landing.what')}
                    <br/>
                    {t('landing.about_us')}
                </p>
                <img src={AboutImage} className='landingAboutUsLogo' alt='AboutUsLogo'/>
            </div>
        </div>
    )


}

export default AboutUs;