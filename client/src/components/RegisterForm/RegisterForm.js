import React from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const RegisterForm = (props) => {
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
                Create New Account
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
                    <p className='formGenderText'>Female</p>
                    <input type="radio" name="sex" value="female" required onClick={props.femaleSelected}/>
                    &nbsp;
                    <p className='formGenderText'>Male</p>
                    <input type="radio" name="sex" value="male" required onClick={props.maleSelected}/>
                </div>
            </div>
            <div className='formButtonsContainer'>
                <button className='formButtonRegister' onClick={props.registerClicked}>Create New Account</button>
                <hr className='formBreakline'/>
                <p className='formAlternativeText'>Have an account? 
                    <span className='formAlternativeSpan' onClick={props.changeFormToLoginClicked}>Login</span>
                </p>
            </div>
        </form>
    );
}

export default RegisterForm;