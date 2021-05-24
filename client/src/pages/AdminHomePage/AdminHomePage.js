import React from 'react';
import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminHome from '../../containers/AdminHome/AdminHome';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminHomePage = (props) => {
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminHome />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AdminHomePage;