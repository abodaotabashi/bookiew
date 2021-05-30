import React from 'react';
import './LandingPage.css'
import MiniFooter from '../../components/MiniFooter/MiniFooter';
import Navbar from '../../components/Navbar/Navbar';
import Welcome from '../../components/LandingPageComponents/Welcome/Welcome';
import AboutBookiew from '../../components/LandingPageComponents/AboutBookiew/AboutBookiew';
import AboutUs from '../../components/LandingPageComponents/AboutUs/AboutUs';
import Contact from '../../components/LandingPageComponents/Contact/Contact';
import PartnersSpotlight from '../../components/LandingPageComponents/PartnersSpotlight/PartnersSpotlight';
import PageContainer from '../../components/PageContainer/PageContainer';

const LandingPage = (props) => {
        return(
            <div>
                <Navbar/>
                <PageContainer>
                    <div className="LandingPageContainer">
                        <div className="LandingPageWrapper">
                            <Welcome id="welcome"></Welcome>
                            <AboutBookiew id="aboutBookiew"></AboutBookiew>
                            <AboutUs id="aboutUs"></AboutUs>
                            <Contact id="contact"></Contact>
                            <PartnersSpotlight id="partners"></PartnersSpotlight>
                        </div>
                    </div>
                </PageContainer>
                <MiniFooter/>
            </div>
        );
    
}

export default LandingPage;