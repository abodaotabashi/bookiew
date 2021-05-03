import React from 'react';
import './AboutUs.css';
import AboutImage from "../../../assets/images/aboutTeam.png";

const AboutUs = () => {

    return(
        <div id='aboutUs' className='landingAboutUs'>
            <label className='landingAboutUsLabel'> About Us</label>
            <div className='landingAboutUsTextWrapper'>
                <p className='landingAboutUsText'> 
                    What about us?
                    <br/>
                    We are computer science students, all in our junior year at the Turkish-German University, 
                    who came up with this idea for our software engineering course. 
                    The idea came from looking at the technology age we are in and one of the main effects of it: 
                    not being able to read many books as expected. The difference we try to make is to 
                    give the reviewers a limit of words and rank these reviews by the score given, again by you, so that the next person
                    viewing the book will spend not much of a time searching for what they have wished. 
                </p>
                <img src={AboutImage} className='landingAboutUsLogo'/>
            </div>
        </div>
    )


}

export default AboutUs;