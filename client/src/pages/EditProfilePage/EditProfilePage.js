import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import EditProfile from '../../containers/EditProfile/EditProfile';

import PageContainer from '../../components/PageContainer/PageContainer';


const EditProfilePage = (props) => {

    let user = {
        firstname: 'Abdurrahman',
        surname: 'odabashi',
        email:'abd@gmail.com',
        password: '123456',
        numberOfReviews: 12
    };

    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <PageContainer>
                <EditProfile user={user}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default EditProfilePage;