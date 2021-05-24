import React from 'react';
import AdminLoginForm from '../../containers/AdminLoginForm/AdminLoginForm';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminLoginPage = (props) => {
    return(
        <div>
            <AdminNavbar />
            <PageContainer>
                <AdminLoginForm  />
            </PageContainer>
        </div>
    );
}


export default AdminLoginPage;