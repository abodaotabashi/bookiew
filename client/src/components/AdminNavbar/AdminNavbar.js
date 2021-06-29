import React from 'react';
import '../Navbar/Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import EarthIcon from "../../assets/icons/earth_48px.png";
import SaudiFlag from "../../assets/icons/saudi_arabia_flag.png";
import BritainFlag from "../../assets/icons/great_britain_flag.png";
import GermanyFlag from "../../assets/icons/germany_flag.png";
import TurkeyFlag from "../../assets/icons/turkey_flag.png";
import AdminPanelLogo from "../../assets/logos/adminpanellogo.png";
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";

const AdminNavbar = () => {
    const { i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    return(
        <div className='navbarAdmin' id='nav'>
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
                <img src={AdminPanelLogo} className='AdminPanelLogo' alt='Bookiew AdminPanel Logo'/>
            </section>
        </div>
    )
}

export default AdminNavbar;