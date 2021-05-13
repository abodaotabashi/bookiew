import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import BookRecommendation from '../../containers/BookRecommendation/BookRecommendation';

import PageContainer from '../../components/PageContainer/PageContainer';


const BookRecommendationPage = (props) => {

    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <BookRecommendation />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default BookRecommendationPage;