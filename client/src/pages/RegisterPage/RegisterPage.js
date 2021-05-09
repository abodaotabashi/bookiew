import React from 'react';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../containers/LoginRegisterForm/LoginRegisterForm';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';

const RegisterPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <LoginRegisterForm formType={false} />
            <Footer />
        </div>
    );
}


export default RegisterPage;