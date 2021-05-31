import React from 'react';
import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminSearchResults from '../../containers/AdminSearchResults/AdminSearchResults';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminSearchResultsPage = (props) => {
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminSearchResults searchedBook={props.location.state.searchedBook}  />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AdminSearchResultsPage;