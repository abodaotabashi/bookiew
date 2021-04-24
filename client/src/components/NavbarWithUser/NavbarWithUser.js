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
var express = require('express');
var router = express.Router();
const NavbarWithUser = (props) => {
    const logout = () => {
        router.post('/logout');
    }
    return(
        <div className='navbar'>
            <section className='navbarLeftSection'>
                <div className='navbarLogoWrapper'>
                    <img src={MiniLogo} className='navbarLogoImage' alt='Bookiew Logo'/>
                    <img src={TextLogo} className='navbarLogoText' alt='Bookiew Logo'/>
                </div>
            </section>
            <section className='navbarMiddleSection'>
                <div className='navLinksContainer'>
                    <ul className='navLinksWrapper'>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">My Reviews</a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">Book Recommendation</a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                <div className='navbarDropDownContainer'>
                    <img src={UserIcon} className='navbarUserIcon' alt='navbarUser'/>
                    <p className='navbarUserName'>{props.userName}</p>
                    <img src={ExpandIcon} className='navbarDropDownIcon' alt='navbarDropDownMenu'/>
                </div>
                <ul className='navbarDropDownWrapper'>
                    <li className='navbarDropDownItem'>
                        <a className='navbarDropDownItemLink' href='#'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={HomeIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Home
                        </a>
                        <div className='navbarDropDownWrapper'></div>
                    </li>
                    <li className='navbarDropDownItem'>
                        <a className='navbarDropDownItemLink' href='#'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={EditProfileIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Edit Profile
                        </a>
                    </li>
                    <li className='navbarDropDownItem'>
                        <a className='navbarDropDownItemLink' href='#'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LanguageIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Change Language
                        </a>
                    </li>
                    <li className='navbarDropDownItem' onClick = 'logout();'>
                        <a className='navbarDropDownItemLink' href='#'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LogoutIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Log out
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default NavbarWithUser;
