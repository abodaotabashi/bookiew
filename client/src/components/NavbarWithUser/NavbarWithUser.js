import React from 'react';
import './NavbarWithUser.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import ExpandIcon from "../../assets/icons/expand_arrow_32px.png";
import UserIcon from "../../assets/icons/user.png";
import HomeIcon from "../../assets/icons/home.png";
import EditProfileIcon from "../../assets/icons/edit_profile.png";
import LanguageIcon from "../../assets/icons/language.png";
import LogoutIcon from "../../assets/icons/logout.png";
import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const NavbarWithUser = (props) => {
    const userFirstname = localStorage.getItem('userFirstname');
    const userProfilePhotoURL = localStorage.getItem('userProfilePhotoURL');
    
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    }

    return(
        <div className='navbarWithUser'>
            <section className='navbarLeftSection'>
                <div className='navbarLogoWrapper'>
                    <Link 
                        className='navbarLogoWrapper'
                        to="/"
                        smooth="true"
                        offset={-20}
                        duration={500}> 
                        <img src={MiniLogo} className='navbarLogoImage' alt='Bookiew Logo'/>
                        <img src={TextLogo} className='navbarLogoText' alt='Bookiew Logo'/>
                    </Link>
                </div>
            </section>
            <section className='navbarMiddleSection'>
                <div className='navLinksContainer'>
                    <ul className='navLinksWrapper'>
                        <li className='navLinkItem'>
                            <Link 
                                className='navLink'
                                to="/myReviews"
                                smooth="true"
                                offset={-20}
                                duration={500}> 
                                {t('navbar.My_Reviews')}
                            </Link>
                        </li>
                        <li className='navLinkItem'>
                        <Link 
                                className='navLink'
                                to="/bookRecommendation"
                                smooth="true"
                                offset={-20}
                                duration={500}> 
                                {t('navbar.Book_Recommendation')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                <div className='navbarDropDownContainer'>
                    <img src={(userProfilePhotoURL === '') ? UserIcon : userProfilePhotoURL} className='navbarUserIcon' alt='navbarUser'/>
                    <p className='navbarUserName'>{userFirstname}</p>
                    <img src={ExpandIcon} className='navbarDropDownIcon' alt='navbarDropDownMenu'/>
                </div>
                <ul className='navbarDropDownWrapper'>
                    <li className='navbarDropDownItem'>
                        <Link 
                            className='navbarDropDownItemLink'
                            to="/home"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={HomeIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            {t('navbar.Home')}
                        </Link>
                        <div className='navbarDropDownWrapper'></div>
                    </li>
                    <li className='navbarDropDownItem'>
                        <Link 
                            className='navbarDropDownItemLink'
                            to="/editProfile"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={EditProfileIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            {t('navbar.Edit_Profile')}
                        </Link>
                    </li>
                    <li className='navbarDropDownItem' onClick={()=>changeLanguage('tr')}>
                        <div className='navbarDropDownItemLink'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LanguageIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            {t('navbar.Change_Language')}
                        </div>
                    </li>
                    <li className='navbarDropDownItem' onClick={() => {
                                                                    localStorage.setItem('isUserAuthenticated', false);
                                                                    localStorage.setItem('userID', '');
                                                                    localStorage.setItem('userFirstname', '');
                                                                    localStorage.setItem('userSurname', '');
                                                                    localStorage.setItem('userEmail', '');
                                                                    localStorage.setItem('userProfilePhotoURL', '');
                                                                    localStorage.setItem('userGender', '');
                                                                    localStorage.setItem('userBirthdate', '');
                                                                    localStorage.setItem('userPassword', '');
                                                                    }}>
                        <Link 
                            className='navbarDropDownItemLink'
                            to="/login"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LogoutIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            {t('navbar.Log_out')}
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default NavbarWithUser;
