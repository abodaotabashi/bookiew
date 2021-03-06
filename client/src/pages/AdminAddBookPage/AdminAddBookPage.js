import React from 'react';
import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminAddBook from '../../containers/AdminAddBook/AdminAddBook';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminAddBookPage = (props) => {
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminAddBook recommendedBook={(typeof(props.location.state) !== 'undefined') ? props.location.state.recommendedBook : null}  />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AdminAddBookPage;