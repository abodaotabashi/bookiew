import React from 'react';

import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewOtherReview from '../../containers/ViewReview/ViewOtherReview';
import PageContainer from '../../components/PageContainer/PageContainer';

const ViewOtherReviewPage = (props) => {
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <ViewOtherReview review={ props.location.state.review } book={ props.location.state.book } user={ props.location.state.user } />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}

export default ViewOtherReviewPage;