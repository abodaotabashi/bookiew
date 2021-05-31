import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import EditReview from '../../containers/EditReview/EditReview';

import PageContainer from '../../components/PageContainer/PageContainer';

const EditReviewPage = (props) => {
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <EditReview review={props.location.state.review} book={props.location.state.book} reviewText={props.location.state.reviewText} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default EditReviewPage;