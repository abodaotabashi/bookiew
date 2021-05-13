import React from 'react';
import Footer from '../../components/Footer/Footer';
import ResetPassword from '../../containers/ResetPassword/ResetPassword';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';
import PageContainer from '../../components/PageContainer/PageContainer';

const ResetPasswordPage = (props) => {
    return(
        <div>
            <NavbarForAccessability />
            <PageContainer>
                <ResetPassword />
            </PageContainer>
            <Footer />
        </div>
    );
}


export default ResetPasswordPage;