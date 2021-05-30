import axios from 'axios';
import React, { Component } from 'react';
import "./ForgotPassword.css";
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';


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
        console.log("I'm in forgot")
        //TODO
        const isValid = this.validate();
        if(isValid) {
            const result = await axios.post("http://localhost:3000/forgotPassword", {
                email: this.state.email
            })
            if(result.data.response) {
                console.log("Reset link sent to "+ this.state.email);
                this.props.history.push({
                    pathname:'/login'
                });
                return;
            }
        }
    }
    
    render(){
        if(localStorage.getItem('isUserAuthenticated')){
            this.goToHome();
        }
        const {t} = this.props;
        return( 
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContainerBackgroundFilter'>
                    <form className='forgotPasswordWrapper'>
                        <p className='forgotPasswordHeaderOne'>
                            {t('frogot_password.message')}
                        </p>
                        <p className='forgotPasswordHeaderTwo'>
                            {t('frogot_password.dont_worry')}
                        </p>
                        <p className='forgotPasswordSpan'>{t('frogot_password.we_will')}</p>
                        <label className='ForgotPasswordEmailLabel'>{t('frogot_password.email')}</label>
                        <input  className='ForgotPasswordEmailInputText' 
                                type='text' 
                                name='' 
                                placeholder='Your Email' 
                                autoFocus
                                required value={this.state.email} 
                                onChange={(event) => this.setState({ email: event.target.value})}/>
                        <p className='ForgotPasswordEmailErrorMessage'>{this.state.emailErrorMessage}</p>
                        <button className='sendLinkButton' onClick={this.handleForgotPassword}>{t('frogot_password.send_me')}</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ForgotPassword));