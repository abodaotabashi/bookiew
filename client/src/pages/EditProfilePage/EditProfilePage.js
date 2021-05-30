import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import EditProfile from '../../containers/EditProfile/EditProfile';

import PageContainer from '../../components/PageContainer/PageContainer';
import { getUser, setUser } from '../../session';


const EditProfilePage = (props) => {
    const user = props.location.state.user;
    console.log(user)
    console.log(user.userID);
    setUser(user.userID, user.email, user.firstname, user.surname, 
        user.password, user.gender, user.birthdate, user.profilePhotoURL);

    const editUser = getUser();
    
    return(
        <div>
            <NavbarWithUser user={user} />
            <PageContainer>
                <EditProfile user={user}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default EditProfilePage;