import React from 'react';
import './Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import {Link} from 'react-scroll';

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
                            <a className='navLink' href=""> Books </a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Link 
                                    activeClass="active"
                                    to="partners"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500} >
                                    Partners
                                </Link>
                            </a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Link 
                                    activeClass="active"
                                    to="aboutBookiew"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500} >
                                    About
                                </Link>
                            </a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">
                                <Link 
                                    activeClass="active"
                                    to="contact"
                                    spy={true}
                                    smooth={true}
                                    offset={-20}
                                    duration={500}>
                                    Contact
                                </Link>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                <div className='accessibilityContainer'>
                    <button className='navbarLoginButton'>Login</button>
                    <button className='navbarRegisterButton'>Register</button>
                </div>
            </section>
        </div>
    )
}

export default Navbar;