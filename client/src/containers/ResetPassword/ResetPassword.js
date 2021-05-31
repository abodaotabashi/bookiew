import axios from 'axios';
import React, { Component } from 'react';
import "./ResetPassword.css";
import {withTranslation} from "react-i18next";
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
        const isValid = this.state.validate;
        if(isValid) {
            const location = window.location.href;
            const hash = location.slice(29);
            console.log(hash); //check if this code is getting the hash right
            const result = await axios.post("http://localhost:3000/resetPassword", {
                password: this.state.password,
                hash: hash
            })
            if(result.data.response) {
                console.log("Successfully changed the password");
                this.props.history.push({
                    pathname: '/login' });
                return;
            }
        }
    }

    goToHome = () => {
        this.props.history.push({ pathname: '/home' });
    }

    render(){
        if(localStorage.getItem('isUserAuthenticated') === 'true'){
            this.goToHome();
        }
        const {t} = this.props;
        return( 
            <div className='ResetPasswordContainer'>
                <div className='ResetPasswordContainerBackgroundFilter'>
                    <form className='ResetPasswordWrapper'>
                        <p className='ResetPasswordHeader'>
                            {t('reset_pw.title')}
                        </p>
                        <p className='ResetPasswordSpan'>{t('reset_pw.enter')}</p>
                        <label className='ResetPasswordLabel'>{t('reset_pw.password')}</label>
                        <input  className='ResetPasswordInputText' 
                                type='password' 
                                name='' 
                                placeholder='Your Password' 
                                required value={this.state.password} 
                                onChange={(event) => this.setState({ password : event.target.value })} />
                        <label className='ResetPasswordLabel'>{t('reset_pw.confirm')}</label>
                        <input  className='ResetPasswordInputText' 
                                type='password' 
                                name='' 
                                placeholder='Confirm Your Password' 
                                required value={this.state.confirmPassword} 
                                onChange={(event) => this.setState({ confirmPassword : event.target.value })} />
                        <p className='ResetPasswordErrorMessage'>{this.state.passwordErrorMessage}</p>
                        <button className='ResetPasswordButton' onClick={this.handleResetPassword}>{t('reset_pw.reset')}</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withTranslation()(ResetPassword);