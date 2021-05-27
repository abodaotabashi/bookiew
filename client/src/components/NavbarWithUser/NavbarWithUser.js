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

const NavbarWithUser = (props) => {
    return(
        <div className='navbarWithUser'>
            <section className='navbarLeftSection'>
                <div className='navbarLogoWrapper'>
                    <Link 
                        className='navbarLogoWrapper'
                        to="/"  /*"/home"
                        params={{ username: "User" }}*/
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
                                My Reviews
                            </Link>
                        </li>
                        <li className='navLinkItem'>
                        <Link 
                                className='navLink'
                                to="/bookRecommendation"
                                smooth="true"
                                offset={-20}
                                duration={500}> 
                                Book Recommendation
                            </Link>
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
                        <Link 
                            className='navbarDropDownItemLink'
                            to="/home"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={HomeIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Home
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
                            Edit Profile
                        </Link>
                    </li>
                    <li className='navbarDropDownItem'>
                        <div className='navbarDropDownItemLink'>
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LanguageIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Change Language
                        </div>
                    </li>
                    <li className='navbarDropDownItem'>
                        <Link 
                            className='navbarDropDownItemLink'
                            to="/"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            <div className='navbarDropDownItemIconWrapper'>
                                <img src={LogoutIcon} className='navbarDropDownItemIcon' alt='navbarDropDownItemIcon'/>
                            </div>
                            Log out
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default NavbarWithUser;
