import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import MyReviews from '../../containers/MyReviews/MyReviews';

const MyReviewsPage = (props) => {
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <MyReviews />
            <MiniFooter />
        </div>
    );
}


export default MyReviewsPage;