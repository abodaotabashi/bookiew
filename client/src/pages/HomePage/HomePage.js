import React from 'react';
import NavbarWithUser from '../../components/NavbarWithUser/NavbarWithUser';
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Home from '../../containers/Home/Home';

const HomePage = (props) => {
    return(
        <div>
            <NavbarWithUser userName="Abdurrahman" />
            <Home />
            <MiniFooter />
        </div>
    );
}


export default HomePage;