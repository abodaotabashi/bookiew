import React from 'react';
import './Welcome.css';
import {Link} from 'react-scroll';
import WelcomeImage from "../../../assets/images/welcomeBook.png";
import {useTranslation} from "react-i18next";
const Welcome = () => {
    const {t} = useTranslation();
    return(
        <div>
            <div className='landingWelcomeContainer'>
                <div className='landingWelcomeWrapper'>
                    <div className='landingWelcomeImageWrapper'>
                        <img src={WelcomeImage} className='landingWelcomeImage' alt='WelcomeImage'/>
                    </div>
                    <div className='landingWelcomeTextWrapper'>
                        <label className='landingWelcomeLabel'><p>{t('landing.welcome')}</p></label>
                        <p className='landingWelcomeText'> 
                        {t('landing.welcome_text')} 
                        </p>
                    </div>
                </div>
                <button className='landingWelcomeButtonForMore'>
                    <Link       
                        className='landingWelcomeLinkForMore'
                        to="aboutBookiew"
                        smooth="true"
                        offset={-80}
                        duration={500}>
                        {t('landing.welcome_more')}
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Welcome;