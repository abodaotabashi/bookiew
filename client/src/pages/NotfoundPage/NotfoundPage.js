import React from 'react';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Notfound from '../../components/Notfound/Notfound';
import NavbarForAccessability from '../../components/Navbar/NavbarForAccessability';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import PageContainer from '../../components/PageContainer/PageContainer';

const NotfoundPage = (props) => {
    let navbar = null;
    if (localStorage.getItem('isUserAuthenticated') === 'false') {
        navbar = (
            <NavbarForAccessability />
        );
    } else {
        navbar = (
            <NavbarWithUser />
        );
    }
    return(
        <div>
            {navbar}
            <PageContainer>
                <Notfound />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default NotfoundPage;