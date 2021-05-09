import React from 'react';
import Footer from '../../components/Footer/Footer';
import ResetPassword from '../../containers/ResetPassword/ResetPassword';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';

const ResetPasswordPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <ResetPassword />
            <Footer />
        </div>
    );
}


export default ResetPasswordPage;