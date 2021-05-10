import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Home from '../../containers/Home/Home';

const HomePage = (props) => {
    return(
        <div>
            <NavbarWithUser userName={props.location.state.username} />
            <Home user={props.location.state.user}/>
            <MiniFooter />
        </div>
    );
}


export default HomePage;