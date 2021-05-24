import React from 'react';
import '../Navbar/Navbar.css';
import MiniLogo from "../../assets/logos/minilogo.png";
import TextLogo from "../../assets/logos/textlogo.png";
import AdminPanelLogo from "../../assets/logos/adminpanellogo.png";
import {Link} from 'react-router-dom';

const AdminNavbar = () => {

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
                <img src={AdminPanelLogo} className='AdminPanelLogo' alt='Bookiew AdminPanel Logo'/>
            </section>
        </div>
    )
}

export default AdminNavbar;