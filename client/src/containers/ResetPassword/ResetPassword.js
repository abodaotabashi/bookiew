import React, { Component } from 'react';
import "./ResetPassword.css";

import PageContainer from '../../components/PageContainer/PageContainer';


class ResetPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        passwordErrorMessage: ''
    }

    validate = () =>{
        if (this.state.password.length < 6) {
            this.setState({ passwordErrorMessage: 'Password must contain more than 6 characters' });
            return false;
        }
        if(this.state.confirmPassword !== this.state.password) {
            this.setState({ passwordErrorMessage : 'Those passwords didn’t match. Try again!' });
            return false;
        }
        return true;
    }

    handleResetPassword = async () => {
        //TODO
    }

    
    render(){
        return( 
            <PageContainer>
                <div className='ResetPasswordContainer'>
                    <div className='ResetPasswordContainerBackgroundFilter'>
                        <form className='ResetPasswordWrapper'>
                            <p className='ResetPasswordHeader'>
                                Reset your Password
                            </p>
                            <p className='ResetPasswordSpan'>Please enter your new password!</p>
                            <label className='ResetPasswordLabel'>Password</label>
                            <input  className='ResetPasswordInputText' 
                                    type='password' 
                                    name='' 
                                    placeholder='Your Password' 
                                    required value={this.state.password} 
                                    onChange={(event) => this.setState({ password : event.target.value })} />
                            <label className='ResetPasswordLabel'>Confirm Password</label>
                            <input  className='ResetPasswordInputText' 
                                    type='password' 
                                    name='' 
                                    placeholder='Confirm Your Password' 
                                    required value={this.state.confirmPassword} 
                                    onChange={(event) => this.setState({ confirmPassword : event.target.value })} />
                            <p className='ResetPasswordErrorMessage'>{this.state.passwordErrorMessage}</p>
                            <button className='ResetPasswordButton' onClick={this.handleResetPassword}>Reset Password</button>
                        </form>
                    </div>
                </div>
            </PageContainer>
        )
    }
}

export default ResetPassword;