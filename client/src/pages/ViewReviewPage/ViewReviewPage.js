import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewReview from '../../containers/ViewReview/ViewReview';
import PageContainer from '../../components/PageContainer/PageContainer';


const ViewReviewPage = (props) => {
    const reviewID = props.location.state.reviewID;
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <ViewReview reviewID={reviewID}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default ViewReviewPage;