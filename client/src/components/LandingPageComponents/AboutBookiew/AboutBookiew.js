import React from 'react';
import './AboutBookiew.css'
import MiniLogo from "../../../assets/logos/minilogo.png";
import {useTranslation} from "react-i18next";

const AboutBookiew = () => {
    const {t} = useTranslation();
    return(
        <div id='aboutBookiew' className='landingAboutBookiew'>
            <label className='landingAboutBookiewLabel'> {t('landing.about_bookiew')}</label>
            <div className='landingAboutBookiewTextWrapper'>
                <p className='landingAboutBookiewText'>
                    {t('landing.about_bookiew_text')}
                </p>
                <img src={MiniLogo} className='landingAboutBookiewLogo' alt='BookiewLogo'/>
            </div>
        </div>
    )
}

export default AboutBookiew;