import React from 'react';
import Logo from "../../assets/logos/logo.png";
import InstagramIcon from "../../assets/icons/instagram_64px.png";
import FacebookIcon from "../../assets/icons/facebook_64px.png";
import TwitterIcon from "../../assets/icons/twitter_64px.png";
import LinkedinIcon from "../../assets/icons/linkedin_64px.png";
import './Footer.css';
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return(
        <div className='footer'>
            <div className='footerSectionsContainer'>
                <section className='footerLeftSection'>
                    <div className='footerNavLinksContainer'>
                        <ul className='footerNavLinksWrapper'>
                            <li className='footerNavLinkItem'>
                                <Link 
                                    className='footerNavLink'
                                    to="/"
                                    smooth="true"
                                    offset={-20}
                                    duration={500}> 
                                    {t('footer.about_us')}
                                </Link>
                            </li>
                            <li className='footerNavLinkItem'>
                                <Link 
                                    className='footerNavLink'
                                    to="/"
                                    smooth="true"
                                    offset={-20}
                                    duration={500}> 
                                    {t('footer.partners')}
                                </Link>
                            </li>
                            <li className='footerNavLinkItem'>
                                <Link 
                                    className='footerNavLink'
                                    to="/"
                                    smooth="true"
                                    offset={-20}
                                    duration={500}> 
                                    {t('footer.contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className='footerMiddleSection'>
                    <Link 
                        className='footerMiddleSection'
                        to="/"
                        smooth="true"
                        offset={-20}
                        duration={500}> 
                        <img src={Logo} className='footerLogoImage' alt='Bookiew Logo'/>
                    </Link>
                </section>
                <section className='footerRightSection'>
                <div className='footerSocialLinksContainer'>
                        <ul className='footerSocialLinksWrapper'>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' target="_blank" rel='noreferrer' href="https://twitter.com/">
                                    <img className='footerSocialLinkIcon' src={TwitterIcon} alt='twitterIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' target="_blank" rel='noreferrer' href="https://www.facebook.com/">
                                    <img className='footerSocialLinkIcon' src={FacebookIcon} alt='facebookIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' target="_blank" rel='noreferrer' href="https://www.instagram.com/">
                                    <img className='footerSocialLinkIcon' src={InstagramIcon} alt='instagramIcon'/>
                                </a>
                            </li>
                            <li className='footerSocialLinkItem'>
                                <a className='footerSocialLink' target="_blank" rel='noreferrer' href="https://www.linkedin.com/">
                                    <img className='footerSocialLinkIcon' src={LinkedinIcon} alt='linkedinIcon'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <hr className='footerBreakline' />
            <p className='footerText'>© Bookiew 2021</p>
        </div>
    );
}

export default Footer;