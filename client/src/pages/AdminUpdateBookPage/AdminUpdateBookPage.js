import React from 'react';

import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminUpdateBook from '../../containers/AdminUpdateBook/AdminUpdateBook';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminUpdateBookPage = (props) => {
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminUpdateBook book={ props.location.state.book } />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}

export default AdminUpdateBookPage;