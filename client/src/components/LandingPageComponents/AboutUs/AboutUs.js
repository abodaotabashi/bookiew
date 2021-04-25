import React from 'react';
import './AboutUs.css';

const AboutUs = () => {

    return(
        <div id='aboutUs' className='AboutUs'>
            <label className='labelUs'> About Us</label>
            <p className='pUs'> 
                What about us?
                <br></br>

                We are computer science students, all in our junior year at the Turkish-German university, 
                who came up with this idea for our software engineering course. 
                The idea came from looking at the technology age we are in and one of the main effects of it: 
                not being able to read many books as expected. The difference we try to make is to 
                give the reviewers a limit of words and rank these reviews by the score given, again by you, so that the next person
                viewing the book will spend not much of a time searching for what they have wished. 
                
            </p>
        </div>
    )


}

export default AboutUs;