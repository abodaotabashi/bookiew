import React from 'react';
import {withTranslation} from "react-i18next";
import {Link} from 'react-router-dom';

import "./Notfound.css";
import Fournullfour from "../../assets/images/404.png"; 

const Notfound = (props) => {
    const {t} = props;
    return(
        <div className='nfBackgroundSection'>
            <div className='nfBackgroundFilterSection'>
                <div className='nfContainer'>
                    <div className='nfTextSection'>
                        <div className='nfGIFLogoWrapper'>
                            <img className='nfGIFLogo' src='https://media.giphy.com/media/PkRpXNHxzNY0M03wen/giphy.gif' alt="404" />
                            <img className='nfLogo' src={Fournullfour} alt="404"/>
                        </div>
                        <div className='nfText'>
                        {t('notfound.page_not_found')}
                        </div>
                        <Link 
                            className='nfGoHomeButton'
                            to="/"
                            smooth="true"
                            offset={-20}
                            duration={500}>
                            {t('notfound.go_to_home')} ▶
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(Notfound); 