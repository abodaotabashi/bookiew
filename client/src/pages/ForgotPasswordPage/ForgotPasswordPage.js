import React from 'react';
import Footer from '../../components/Footer/Footer';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';

const ForgotPasswordPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <ForgotPassword />
            <Footer />
        </div>
    );
}


export default ForgotPasswordPage;