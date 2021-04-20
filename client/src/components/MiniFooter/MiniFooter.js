import React from 'react';
import Logo from "../../assets/logos/logo.png";
import InstagramIcon from "../../assets/icons/instagram_64px.png";
import FacebookIcon from "../../assets/icons/facebook_64px.png";
import TwitterIcon from "../../assets/icons/twitter_64px.png";
import LinkedinIcon from "../../assets/icons/linkedin_64px.png";
import './MiniFooter.css';


const MiniFooter = () => {
    return(
        <div className='footer'>
            <div className='footerSectionsContainer'>
                <section className='footerLeftSection'>
                    <p className='footerText'>© Bookiew 2021</p>
                </section>
                <section className='footerMiddleSection'>
                    <img src={Logo} className='footerLogoImage' alt='Bookiew Logo'/>
                </section>
                <section className='footerRightSection'>
                    <div className='footerSocialLinksContainer'>
                        <ul className='footerSocialLinksWrapper'>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' href="">
                                    <img className='footerSocialLinkIcon' src={TwitterIcon} alt='twitterIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' href="">
                                    <img className='footerSocialLinkIcon' src={FacebookIcon} alt='facebookIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' href="">
                                    <img className='footerSocialLinkIcon' src={InstagramIcon} alt='instagramIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' href="">
                                    <img className='footerSocialLinkIcon' src={LinkedinIcon} alt='linkedinIcon'/>
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