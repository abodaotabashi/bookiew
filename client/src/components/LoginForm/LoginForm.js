import React from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";

const LoginForm = (props) => {

    return(
        <form className='formContainer'>
            <div className='formType'>
                Login to Bookiew
            </div>
            <label className='formLabel'>Email</label>
            <input  className='formInputText' 
                    type='text' 
                    name='' 
                    placeholder='Your Email' 
                    autoFocus
                    required value={props.emailInputValue} 
                    onChange={props.emailInputChanged}/>
            <p className='formErrorMessage'>{props.emailErrorMessage}</p>
            <label className='formLabel'>Password</label>
            <input  className='formInputText' 
                    type='password' 
                    name='' 
                    placeholder='Your Password' 
                    required value={props.passwordInputValue} 
                    onChange={props.passwordInputChanged} />
            <p className='formErrorMessage'>{props.passwordErrorMessage}</p>
            <div className='formButtonsContainer'>
                <button className='formButtonLogin' onClick={props.loginClicked}>Login</button>
                <p className='formForgotPasswordSpan' onClick={props.forgotPasswordClicked}>Forgot Password?</p>
                <hr className='formBreakline'/>
                <p className='formAlternativeText'>Don't have an account? 
                    <span className='formAlternativeSpan' onClick={props.changeFormToRegisterClicked}>Register now</span>
                </p>
            </div>
        </form>
    );
}

export default LoginForm;