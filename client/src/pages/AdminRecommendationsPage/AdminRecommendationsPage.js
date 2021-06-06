import React from 'react';

import AdminNavbarWithUser from '../../components/AdminNavbar/AdminNavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AdminRecommendations from '../../containers/AdminRecommendations/AdminRecommendations';
import PageContainer from '../../components/PageContainer/PageContainer';

const AdminRecommendationsPage = (props) => {
    return(
        <div>
            <AdminNavbarWithUser />
            <PageContainer>
                <AdminRecommendations />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AdminRecommendationsPage;