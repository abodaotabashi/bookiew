import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Home from '../../containers/Home/Home';
import PageContainer from '../../components/PageContainer/PageContainer';

import {getUser} from '../../session';
import UserIcon from "../../assets/icons/user.png";

const HomePage = (props) => {
    
    const user = getUser();

    let comments=[
        { commenterIcon: UserIcon, commenterName: 'Batoul', commentText: 'That is amazing!', commentDate: '20.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Mahasin', commentText: 'Good Job', commentDate: '21.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Sena', commentText: 'Wow', commentDate: '22.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Merve', commentText: 'Nice', commentDate: '22.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Ayse', commentText: 'I dont like it', commentDate: '22.04.2021'}
    ];

    return(
        <div>
            <NavbarWithUser userName={user.firstname} />
            <PageContainer>
                <Home user={props.location.state.user} reviewComments={comments}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default HomePage;