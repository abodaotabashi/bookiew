import React from 'react';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../containers/LoginRegisterForm/LoginRegisterForm';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';

const LoginPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <LoginRegisterForm  formType={true} />
            <Footer />
        </div>
    );
}


export default LoginPage;