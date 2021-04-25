import React, {Component} from 'react';
import './Welcome.css';
import {Link} from 'react-scroll';

class Welcome extends Component {
  
render() {


    return(
        <div>
            <form className='Container'>
                <label className='labelWelcome'> Welcome to Bookiew!</label>
                <p className='pWelcome'> 
                Free your mind from the stress of having to live in this age, where there are 
                plenty of books but rarely explanative reviews about them. 
                </p>
                
                <button className='buttonForMore' href="">
                    <Link       
                        className='linkForMore'
                        activeClass="active"
                        to="aboutBookiew"
                        spy={true}
                        smooth={true}
                        offset={-20}
                        duration={500}
                        >
                         Learn More
                    </Link>
                   
                </button>
               
            </form>
            
            
        </div>
    )
}
    

 

}

export default Welcome;