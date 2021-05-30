import React, { useReducer } from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";
import {useTranslation} from "react-i18next";
const AdminLogin = (props) => {
    const {t} = useTranslation();
    return(
        <form className='adminFormContainer'>
            <div className='adminFormType'>
                {t('admin_login.title')}
            </div>
            <label className='formLabel'>{t('admin_login.email')}</label>
            <input  className='formInputText' 
                    type='text' 
                    name='' 
                    placeholder='Your Email' 
                    autoFocus
                    required value={props.emailInputValue} 
                    onChange={props.emailInputChanged}/>
            <p className='formErrorMessage'>{props.emailErrorMessage}</p>
            <label className='formLabel'>{t('admin_login.password')}</label>
            <input  className='formInputText' 
                    type='password' 
                    name='' 
                    placeholder='Your Password' 
                    required value={props.passwordInputValue} 
                    onChange={props.passwordInputChanged} />
            <p className='formErrorMessage'>{props.passwordErrorMessage}</p>
            <div className='formButtonsContainer'>
                <button className='formButtonLogin' onClick={props.loginClicked}>{t('admin_login.login')}</button>
            </div>
        </form>
    );
}

export default AdminLogin;