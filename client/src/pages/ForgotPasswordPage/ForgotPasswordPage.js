import React from 'react';
import Footer from '../../components/Footer/Footer';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';
import PageContainer from '../../components/PageContainer/PageContainer';

const ForgotPasswordPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <PageContainer>
                <ForgotPassword />
            </PageContainer>
            <Footer />
        </div>
    );
}


export default ForgotPasswordPage;