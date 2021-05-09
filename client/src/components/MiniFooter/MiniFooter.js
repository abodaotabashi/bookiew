import React from 'react';
import Logo from "../../assets/logos/logo.png";
import InstagramIcon from "../../assets/icons/instagram_64px.png";
import FacebookIcon from "../../assets/icons/facebook_64px.png";
import TwitterIcon from "../../assets/icons/twitter_64px.png";
import LinkedinIcon from "../../assets/icons/linkedin_64px.png";
import './MiniFooter.css';
import {Link} from 'react-router-dom';

const MiniFooter = () => {
    return(
        <div className='minifooter'>
            <div className='minifooterSectionsContainer'>
                <section className='minifooterLeftSection'>
                    <p className='minifooterText'>© Bookiew 2021</p>
                </section>
                <section className='minifooterMiddleSection'>
                    <Link 
                        className='minifooterMiddleSection'
                        to="/"
                        smooth="true"
                        offset={-20}
                        duration={500}> 
                        <img src={Logo} className='minifooterLogoImage' alt='Bookiew Logo'/>
                    </Link>
                </section>
                <section className='minifooterRightSection'>
                    <div className='minifooterSocialLinksContainer'>
                        <ul className='minifooterSocialLinksWrapper'>
                            <li className='minifooterSocialLinkItem'>
                                <a className='minifooterSocialLink' target="_blank" rel='noreferrer' href="https://twitter.com/">
                                    <img className='minifooterSocialLinkIcon' src={TwitterIcon} alt='twitterIcon'/>
                                </a>
                            </li>
                            <li className='minifooterSocialLinkItem'>
                                <a className='minifooterSocialLink' target="_blank" rel='noreferrer' href="https://www.facebook.com/">
                                    <img className='minifooterSocialLinkIcon' src={FacebookIcon} alt='facebookIcon'/>
                                </a>
                            </li>
                            <li className='minifooterSocialLinkItem'>
                                <a className='minifooterSocialLink' target="_blank" rel='noreferrer' href="https://www.instagram.com/">
                                    <img className='minifooterSocialLinkIcon' src={InstagramIcon} alt='instagramIcon'/>
                                </a>
                            </li>
                            <li className='minifooterSocialLinkItem'>
                                <a className='minifooterSocialLink' target="_blank" rel='noreferrer' href="https://www.linkedin.com/">
                                    <img className='minifooterSocialLinkIcon' src={LinkedinIcon} alt='linkedinIcon'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MiniFooter;