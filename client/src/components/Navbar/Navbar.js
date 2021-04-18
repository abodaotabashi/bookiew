import React from 'react';
import './Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
//import SearchIcon from "../../assets/icons/search_30px.png";

const Navbar = () => {

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
                            <a className='navLink' href="">Books</a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">Partners</a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">About Us</a>
                        </li>
                        <li className='navLinkItem'>
                            <a className='navLink' href="">Contact</a>
                        </li>
                    </ul>
                </div>
            </section>
            <section className='navbarRightSection'>
                {/*<div className='searchBoxContainer'>
                    <div className='searchBox'>
                        <input className='searchBoxText' type='text' name='' placeholder='Search' />
                        <a className='searchBoxButton' href='#'>
                            <img src={SearchIcon} alt='Search'/>
                        </a>
                    </div>
                </div>
                */}
                <div className='accessibilityContainer'>
                    <button className='navbarLoginButton'>Login</button>
                    <button className='navbarRegisterButton'>Register</button>
                </div>
            </section>
        </div>
    )
}

export default Navbar;