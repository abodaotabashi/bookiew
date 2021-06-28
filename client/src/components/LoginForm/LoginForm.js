import React from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";
import {Link} from 'react-router-dom';
import {useTranslation} from "react-i18next";
const LoginForm = (props) => {
    const {t} = useTranslation();
    return(
        <form className='formContainer'>
            <div className='formType'>
                {t('login.title')}
            </div>
            <label className='formLabel'>{t('login.email')}</label>
            <input  className='formInputText' 
                    type='text' 
                    name='' 
                    placeholder={t('placeholders.your_email')} 
                    autoFocus
                    required value={props.emailInputValue} 
                    onChange={props.emailInputChanged}/>
            <p className='formErrorMessage'>{props.emailErrorMessage}</p>
            <label className='formLabel'>{t('login.password')}</label>
            <input  className='formInputText' 
                    type='password' 
                    name='' 
                    placeholder={t('placeholders.your_password')} 
                    required value={props.passwordInputValue} 
                    onChange={props.passwordInputChanged} />
            <p className='formErrorMessage'>{props.passwordErrorMessage}</p>
            <div className='formButtonsContainer'>
                <button className='formButtonLogin' onClick={props.loginClicked}>{t('login.login')}</button>
                <Link 
                    className='formForgotPasswordSpan'
                    to="/forgotPassword"
                    smooth="true"
                    offset={-20}
                    duration={500}> 
                    <p className='formForgotPasswordSpan'>{t('login.forgot_pw')}</p>
                </Link>
                <hr className='formBreakline'/>
                <p className='formAlternativeText'>{t('login.dont_have')} 
                    <span className='formAlternativeSpan' onClick={props.changeFormToRegisterClicked}>{t('login.register')}</span>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;