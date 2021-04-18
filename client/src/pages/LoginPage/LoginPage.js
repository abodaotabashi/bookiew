import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../containers/LoginRegisterForm/LoginRegisterForm';

const LoginPage = (props) => {
    return(
        <div>
            <Navbar />
            <LoginRegisterForm />
            <Footer />
        </div>
    );
}


export default LoginPage;