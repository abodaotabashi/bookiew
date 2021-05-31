import React from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {useTranslation} from "react-i18next";

const RegisterForm = (props) => {
    const {t} = useTranslation();
    const BirthdatePicker = (
        <DatePicker className="formBirthdatePicker"
                    selected={props.birthdate}
                    onChange={(date) => props.birthdateChanged(date)}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date()}
                    scrollableMonthYearDropdown
                    scrollableYearDropdown
                    showYearDropdown
                    required
                    placeholderText='Date of birth'
        />
    );
    return(
        <form className='formContainer'>
            <div className='formType'>
                {t('register.title')}
            </div>
            <div className='formNameContainer'>
                <input  className='formNameInputText' 
                        type='text' 
                        name='' 
                        placeholder='First name' 
                        autoFocus
                        required value={props.firstnameInputValue} 
                        onChange={props.firstnameInputChanged}/>
                <input  className='formNameInputText' 
                        type='text' 
                        name='' 
                        placeholder='Surname' 
                        required value={props.surnameInputValue} 
                        onChange={props.surnameInputChanged}/>
            </div>
            <p className='formErrorMessage'>{props.nameErrorMessage}</p>
            <input  className='formInputText' 
                    type='text' 
                    name='' 
                    placeholder='Email' 
                    required value={props.emailInputValue} 
                    onChange={props.emailInputChanged}/>
            <p className='formErrorMessage'>{props.emailErrorMessage}</p>
            <input  className='formInputText' 
                    type='password' 
                    name='' 
                    placeholder='Password' 
                    required value={props.passwordInputValue} 
                    onChange={props.passwordInputChanged} />
            <p className='formErrorMessage'>{props.passwordErrorMessage}</p>
            <div className='formNameContainer'>
                {BirthdatePicker}
                <div className='formGenderBox'>
                    <p className='formGenderText'>{t('register.female')}</p>
                    <input type="radio" name="sex" value="female" required onClick={props.femaleSelected}/>
                    &nbsp;
                    <p className='formGenderText'>{t('register.male')}</p>
                    <input type="radio" name="sex" value="male" required onClick={props.maleSelected}/>
                </div>
            </div>
            <div className='formButtonsContainer'>
                <button className='formButtonRegister' onClick={props.registerClicked}>{t('register.create')}</button>
                <hr className='formBreakline'/>
                <p className='formAlternativeText'>{t('register.have')}
                    <span className='formAlternativeSpan' onClick={props.changeFormToLoginClicked}>{t('register.login')}</span>
                </p>
            </div>
        </form>
    );
}

export default RegisterForm;