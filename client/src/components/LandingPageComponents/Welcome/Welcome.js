import React from 'react';
import './Welcome.css';
import {Link} from 'react-scroll';
import WelcomeImage from "../../../assets/images/welcomeBook.png";

const Welcome = () => {
    return(
        <div>
            <div className='landingWelcomeContainer'>
                <div className='landingWelcomeWrapper'>
                    <img src={WelcomeImage} className='landingWelcomeImage'/>
                    <div className='landingWelcomeTextWrapper'>
                        <label className='landingWelcomeLabel'> Welcome to Bookiew!</label>
                        <p className='landingWelcomeText'> 
                        Free your mind from the stress of having to live in this age, where there are 
                        plenty of books but rarely explanative reviews about them. 
                        </p>
                    </div>
                </div>
                <button className='landingWelcomeButtonForMore'>
                    <Link       
                        className='landingWelcomeLinkForMore'
                        activeClass="active"
                        to="aboutBookiew"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}>
                        Learn More
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Welcome;