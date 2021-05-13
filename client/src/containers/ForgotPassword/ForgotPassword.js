import React, { Component } from 'react';
import "./ForgotPassword.css";

class ForgotPassword extends Component {
    state = {
        email: '',
        emailErrorMessage: ''
    }

    validate = () =>{
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!' });
            return false;
        }
        return true;
    }

    handleForgotPassword = async () => {
        //TODO
    }

    
    render(){
        
        return( 
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContainerBackgroundFilter'>
                    <form className='forgotPasswordWrapper'>
                        <p className='forgotPasswordHeaderOne'>
                            Forgot your Password?
                        </p>
                        <p className='forgotPasswordHeaderTwo'>
                            Don't Worry
                        </p>
                        <p className='forgotPasswordSpan'>We will send you a link to reset your password!</p>
                        <label className='ForgotPasswordEmailLabel'>Email</label>
                        <input  className='ForgotPasswordEmailInputText' 
                                type='text' 
                                name='' 
                                placeholder='Your Email' 
                                autoFocus
                                required value={this.state.email} 
                                onChange={(event) => this.setState({ email: event.target.value})}/>
                        <p className='ForgotPasswordEmailErrorMessage'>{this.state.emailErrorMessage}</p>
                        <button className='sendLinkButton' onClick={this.handleForgotPassword}>Send me a link</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;