import React from 'react';
import './Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import EarthIcon from "../../assets/icons/earth_48px.png";
import SaudiFlag from "../../assets/icons/saudi_arabia_flag.png";
import BritainFlag from "../../assets/icons/great_britain_flag.png";
import GermanyFlag from "../../assets/icons/germany_flag.png";
import TurkeyFlag from "../../assets/icons/turkey_flag.png";
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const NavbarForAccessability = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }
    
    return(
        <div className='navbar' id='nav'>
            <section className='navbarLeftSection'>
                <div className='navbarLogoWrapper'>
                    <Link 
                        className='navbarLogoWrapper'
                        to="/"
                        smooth="true"
                        offset={0}
                        duration={500}> 
                        <img src={MiniLogo} className='navbarLogoImage' alt='Bookiew Logo'/>
                        <img src={TextLogo} className='navbarLogoText' alt='Bookiew Logo'/>
                    </Link>
                </div>
            </section>
            <section className='navbarMiddleSection'>
                
            </section>
            <section className='navbarRightSection'>
                <div className='accessibilityContainer'>
                    <div className='navbarLangButton'>
                        <img src={EarthIcon} className='navbarLangIcon' alt='navbarDropDownMenu'/>
                    </div>
                    <ul className='navbarLangDropDown'>
                        <li className='navbarLangDropDownItem' onClick={()=>changeLanguage('ar')}>
                            <div className='navbarLangDropDownItemLink'>
                                <img src={SaudiFlag} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                                العربية
                            </div>
                        </li>
                        <li className='navbarLangDropDownItem' onClick={()=>changeLanguage('de')}>
                            <div className='navbarLangDropDownItemLink'>
                                <img src={GermanyFlag} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                                Deutsch
                            </div>
                        </li>
                        <li className='navbarLangDropDownItem' onClick={()=>changeLanguage('en')}>
                            <div className='navbarLangDropDownItemLink'>
                                <img src={BritainFlag} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                                English
                            </div>
                        </li>
                        <li className='navbarLangDropDownItem' onClick={()=>changeLanguage('tr')}>
                            <div className='navbarLangDropDownItemLink'>
                                <img src={TurkeyFlag} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                                Türkçe
                            </div>
                        </li>
                        <div className='navbarLangDropDown'></div>
                    </ul>
                    <button className='navbarLoginButton'>
                        <Link 
                            className='navLink'
                            to="/login"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            {t('login.login')}
                        </Link>
                    </button>
                    <button className='navbarRegisterButton'>
                        <Link 
                            className='navLink'
                            to="/register"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            {t('register.register')}
                        </Link>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default NavbarForAccessability;