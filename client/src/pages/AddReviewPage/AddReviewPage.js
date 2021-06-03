import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import AddReview from '../../containers/AddReview/AddReview';

import PageContainer from '../../components/PageContainer/PageContainer';

const AddReviewPage = (props) => {
    return(
        <div>
            <NavbarWithUser/>
            <PageContainer>
                <AddReview user={props.location.state.user} book={props.location.state.book} bookID={props.location.state.bookID} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default AddReviewPage;