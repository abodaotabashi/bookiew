import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import EditReview from '../../containers/EditReview/EditReview';

import PageContainer from '../../components/PageContainer/PageContainer';

const EditReviewPage = (props) => {
    let review = props.location.state.review;
    
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <EditReview review={review} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default EditReviewPage;