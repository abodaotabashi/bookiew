import React from 'react';
import Footer from '../../components/Footer/Footer';
import LoginRegisterForm from '../../containers/LoginRegisterForm/LoginRegisterForm';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';
import PageContainer from '../../components/PageContainer/PageContainer';

const RegisterPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <PageContainer>
                <LoginRegisterForm formType={false} />
            </PageContainer>
            <Footer />
        </div>
    );
}


export default RegisterPage;