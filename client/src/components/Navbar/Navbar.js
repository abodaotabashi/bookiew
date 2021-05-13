import React from 'react';
import './Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import {Link as Scrolllink} from 'react-scroll';
import {Link} from 'react-router-dom';

const Navbar = () => {

    return(
        <div className='navbar' id='nav'>
            <section className='navbarLeftSection'>
                <div className='navbarLogoWrapper'>
                    <Link 
                        className='navbarLogoWrapper'
                        to="/"
                        smooth="true"
                        offset={-80}
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
                            <Scrolllink 
                                className='navLink'
                                to="aboutBookiew"
                                smooth="true"
                                offset={-80}
                                duration={500} >
                                About
                            </Scrolllink>
                        </li>
                        <li className='navLinkItem'>
                            <Scrolllink
                                className='navLink'
                                to="contact"
                                smooth="true"
                                offset={-20}
                                duration={500}>
                                Contact
                            </Scrolllink>
                        </li>
                        <li className='navLinkItem'>
                            <Scrolllink 
                                className='navLink'
                                to="partners"
                                smooth="true"
                                offset={-20}
                                duration={500} >
                                Partners
                            </Scrolllink>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                <div className='accessibilityContainer'>
                    <button className='navbarLoginButton'>
                        <Link 
                            className='navLink'
                            to="/login"
                            smooth="true"
                            offset={-70}
                            duration={500}> 
                            Login
                        </Link>
                    </button>
                    <button className='navbarRegisterButton'>
                        <Link 
                            className='navLink'
                            to="/register"
                            smooth="true"
                            offset={-70}
                            duration={500}> 
                            Register
                        </Link>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Navbar;