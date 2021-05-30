import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import EditProfile from '../../containers/EditProfile/EditProfile';

import PageContainer from '../../components/PageContainer/PageContainer';


const EditProfilePage = (props) => {

    let user = {
        numberOfReviews: 12
    };

    return(
        <div>
            <NavbarWithUser />
            <PageContainer>
                <EditProfile user={user}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default EditProfilePage;