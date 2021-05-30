import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewReview from '../../containers/ViewReview/ViewReview';
import PageContainer from '../../components/PageContainer/PageContainer';
import { withRouter } from "react-router-dom";


const ViewReviewPage = async (props) => {
    //const reviewID = props.location.state.reviewID;
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <ViewReview />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default withRouter(ViewReviewPage);