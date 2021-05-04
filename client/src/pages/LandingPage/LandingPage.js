import React, {Component} from 'react';
import './LandingPage.css'
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Welcome from '../../components/LandingPageComponents/Welcome/Welcome';
import AboutBookiew from '../../components/LandingPageComponents/AboutBookiew/AboutBookiew';
import AboutUs from '../../components/LandingPageComponents/AboutUs/AboutUs';
import Contact from '../../components/LandingPageComponents/Contact/Contact';
import PartnersSpotlight from '../../components/LandingPageComponents/PartnersSpotlight/PartnersSpotlight';
import Login from '../../components/LoginForm/LoginForm';
import LoginRegister from '../../containers/LoginRegisterForm/LoginRegisterForm';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class LandingPage extends Component {
    render() {
        return(
            <Router>
            <div>
                <Navbar> </Navbar>
                <Switch>
                    <Route path='/login' exact component = {LoginRegister}/>
                    <Route path='/register' exact component = {LoginRegister}/>
                </Switch>
                <div className="LandingPageContainer">
                    <div className="LandingPageWrapper">
                        <Welcome id="welcome"></Welcome>
                        <AboutBookiew id="aboutBookiew"></AboutBookiew>
                        <AboutUs id="aboutUs"></AboutUs>
                        <Contact id="contact"></Contact>
                        <PartnersSpotlight id="partners"></PartnersSpotlight>
                    </div>
                </div>
                <Footer></Footer>
            </div>
            </Router>
    
        );
    
    };
    

}

export default LandingPage;