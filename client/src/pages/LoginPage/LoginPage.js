import React from 'react';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../containers/LoginRegisterForm/LoginRegisterForm';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';
import PageContainer from '../../components/PageContainer/PageContainer';

const LoginPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <PageContainer>
                <LoginRegisterForm  formType={true} />
            </PageContainer>
            <Footer />
        </div>
    );
}


export default LoginPage;