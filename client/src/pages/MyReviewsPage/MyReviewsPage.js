import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import MyReviews from '../../containers/MyReviews/MyReviews';

import PageContainer from '../../components/PageContainer/PageContainer';

const MyReviewsPage = (props) => {
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <MyReviews />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default MyReviewsPage;