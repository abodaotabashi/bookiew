import React from 'react';
import './Contact.css';

const Contact = () => {
    return(
        <div id='contact' className='Contact'> 
            <label className='labelContact'> Contact </label>
            <p className='pContact'>
                <ul className="ul">
                    Here's the developer team behind this website.
                    You can contact us through these emails:
                    
                    <li>
                        Abdurrahman ODABAŞI: e170503108@stud.tau.edu.tr 
                        
                    </li>
                    <li>
                        Betül BEIDAS: e170503109@stud.tau.edu.tr 
                    </li>
                    <li>
                        Fatma Tuğçe AKGÜL: e160503118@stud.tau.edu.tr
                    </li>
                    <li>
                        Mahasin ELDERVİŞ: e170503105@stud.tau.edu.tr
                    </li>
                    <li>
                        Nazlı ARAKI: e170503107@stud.tau.edu.tr
                    </li>
                    <li>
                        Sena Nur YILMAZ: e170503038@stud.tau.edu.tr
                    </li>
                    
                    
                </ul>
                
                
            </p>
         </div>
    )
}

export default Contact;