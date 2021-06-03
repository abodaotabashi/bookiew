import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewBook from '../../containers/ViewBook/ViewBook';

import ThumbnailTest from "../../assets/images/thumbnailtest.png"
import UserIcon from "../../assets/icons/user.png";
import PageContainer from '../../components/PageContainer/PageContainer';

const ViewBookPage = (props) => {
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <ViewBook book={props.location.state.book} reviews={props.location.state.reviews} user={props.location.state.user} />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default ViewBookPage;