import React from 'react';
import './Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import {Link} from 'react-router-dom';

const NavbarForAccessability = () => {

    return(
        <div className='navbar' id='nav'>
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
                
            </section>
            <section className='navbarRightSection'>
                <div className='accessibilityContainer'>
                    <button className='navbarLoginButton'>
                        <Link 
                            className='navLink'
                            to="/login"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            Login
                        </Link>
                    </button>
                    <button className='navbarRegisterButton'>
                        <Link 
                            className='navLink'
                            to="/register"
                            smooth="true"
                            offset={-20}
                            duration={500}> 
                            Register
                        </Link>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default NavbarForAccessability;