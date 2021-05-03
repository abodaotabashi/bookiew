import React from 'react';
import './Contact.css';
import ContactImage from "../../../assets/images/contactCommunity.png";

const Contact = () => {
    return(
        <div id='contact' className='landingContact'> 
            <label className='landingContactLabel'> Contact </label>
            <div className='landingContactTextWrapper'>
                <p className='landingContactText'>
                    Here's the developer team behind this website.
                    You can contact us through these emails:
                    <table className='landingContactTable'>
                        &nbsp;
                        <tr>
                            <td>Betül BEIDAS:</td>
                            <td>e170503109@stud.tau.edu.tr</td>
                        </tr>
                        <tr>
                            <td>Fatma Tuğçe AKGÜL:</td>
                            <td>e160503118@stud.tau.edu.tr</td>
                        </tr>
                        <tr>
                            <td>Mahasin ELDERVİŞ:</td>
                            <td>e170503105@stud.tau.edu.tr</td>
                        </tr>
                        <tr>
                            <td>Nazlı ARAKI:</td>
                            <td>e170503107@stud.tau.edu.tr</td>
                        </tr>
                        <tr>
                            <td>Sena Nur YILMAZ:</td>
                            <td>e170503038@stud.tau.edu.tr</td>
                        </tr>
                        <tr>
                            <td>Abdurrahman ODABAŞI:</td>
                            <td>e170503108@stud.tau.edu.tr</td>
                        </tr>
                    </table> 
                </p>
                <img src={ContactImage} className='landingContactLogo'/>
            </div>
            
        </div>
    )
}

export default Contact;