import React from 'react';
import './AboutBookiew.css'
import MiniLogo from "../../../assets/logos/minilogo.png";

const AboutBookiew = () => {

    return(
        <div id='aboutBookiew' className='landingAboutBookiew'>
            <label className='landingAboutBookiewLabel'> About Bookiew</label>
            <div className='landingAboutBookiewTextWrapper'>
                <p className='landingAboutBookiewText'>
                In today's multitude of knowledge regarding books, either physical or electrical, 
                it becomes more difficult for us to keep up with that content. 
                Bookiew is a platform that tries to solve this problem in the easiest and most time-saving way possible, 
                so that you can read reviews from all over the world on books that you have requested, 
                rate them and even contribute by making comments or writing your own.
                In todays multitude of knowledge in aspect of books, either through physical or electrical, it becomes harder for us
                to catch up with these contents. Bookiew is a platform that tries to ease this problem in the easiest and 
                most time-sparing manner, such that reviews coming from all around the world about books you requested 
                will be under your hand for you to read, score and even contribute by commenting or writing your own one.
                </p>
                <img src={MiniLogo} className='landingAboutBookiewLogo' alt='BookiewLogo'/>
            </div>
        </div>


    )


}

export default AboutBookiew;