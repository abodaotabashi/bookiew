import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Home from '../../containers/Home/Home';
import PageContainer from '../../components/PageContainer/PageContainer';

import {getUser, setUser} from '../../session';
import UserIcon from "../../assets/icons/user.png";

const HomePage = (props) => {
    let user =null;
    if(props.location.user){
        
        user = props.location.user;
        console.log(" user coming from editprofile" + user.firstname)
    }else{
        user = props.location.state.user;
        
        console.log(" user coming from login " + user.firstname)
    }
    

    

    let comments=[
        { commenterIcon: UserIcon, commenterName: 'Batoul', commentText: 'That is amazing!', commentDate: '20.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Mahasin', commentText: 'Good Job', commentDate: '21.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Sena', commentText: 'Wow', commentDate: '22.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Merve', commentText: 'Nice', commentDate: '22.04.2021'},
        { commenterIcon: UserIcon, commenterName: 'Ayse', commentText: 'I dont like it', commentDate: '22.04.2021'}
    ];

    return(
        <div>
            <NavbarWithUser user={user} />
            <PageContainer>
                <Home user={user} reviewComments={comments}/>
            </PageContainer>
            <MiniFooter />
        </div>
    );
}


export default HomePage;