import React from 'react';
import "../../containers/LoginRegisterForm/LoginRegisterForm.css";

const AdminLogin = (props) => {

    return(
        <form className='adminFormContainer'>
            <div className='adminFormType'>
                Login to Admin Panel
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
            </div>
        </form>
    );
}

export default AdminLogin;