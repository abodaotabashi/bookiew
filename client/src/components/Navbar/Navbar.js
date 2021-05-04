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
                    <img src={MiniLogo} className='navbarLogoImage' alt='Bookiew Logo'/>
                    <img src={TextLogo} className='navbarLogoText' alt='Bookiew Logo'/>
                </div>
            </section>
            <section className='navbarMiddleSection'>
                <div className='navLinksContainer'>
                    <ul className='navLinksWrapper'>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Scrolllink 
                                    className='navLink'
                                    activeClass="active"
                                    to="aboutBookiew"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500} >
                                    About
                                </Scrolllink>
                            </a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Scrolllink
                                    className='navLink'
                                    activeClass="active"
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500}>
                                    Contact
                                </Scrolllink>
                            </a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Scrolllink 
                                    className='navLink'
                                    activeClass="active"
                                    to="partners"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500} >
                                    Partners
                                </Scrolllink>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                <div className='accessibilityContainer'>
                    <button className='navbarLoginButton'>
                        <a className='navLink' href="">
                            <Link 
                                className='navLink'
                                activeClass="active"
                                to="/login"
                                spy={true}
                                smooth={true}
                                offset={-20}
                                duration={500}> 
                                Login
                            </Link>
                        </a>
                    </button>
                    <button className='navbarRegisterButton'>
                        <a className='navLink' href="">
                            <Link 
                                className='navLink'
                                activeClass="active"
                                to="/register"
                                spy={true}
                                smooth={true}
                                offset={-20}
                                duration={500}> 
                                Register
                            </Link>
                        </a>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Navbar;