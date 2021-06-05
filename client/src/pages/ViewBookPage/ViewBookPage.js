import React from 'react';

import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import ViewBook from '../../containers/ViewBook/ViewBook';
import PageContainer from '../../components/PageContainer/PageContainer';

const ViewBookPage = (props) => {
    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <ViewBook book={ props.location.state.book } />
            </PageContainer>
            <MiniFooter />
        </div>
    );
}

export default ViewBookPage;