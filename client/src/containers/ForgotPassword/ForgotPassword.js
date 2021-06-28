import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { withTranslation } from 'react-i18next';

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import "./ForgotPassword.css";

class ForgotPassword extends Component {
    state = {
        email: '',
        emailErrorMessage: '',
        openAckDialog: false
    }

    validate = () =>{
        if (this.state.email === ""){
            this.setState({ emailErrorMessage: 'Please enter your Email first!' });
            return false;
        }
        
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!' });
            return false;
        }
        return true;
    }

    handleForgotPassword = async () => {
        const isValid = this.validate();
        if(isValid) {
            const result = await axios.post("http://localhost:3000/forgotPassword", {
                email: this.state.email
            })
            if(result.data.response) {
                this.setState({openAckDialog: true});
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
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordContainerBackgroundFilter'>
                    <div className='forgotPasswordWrapper'>
                        <p className='forgotPasswordHeaderOne'>
                            {t('forgot_password.message')}
                        </p>
                        <p className='forgotPasswordHeaderTwo'>
                            {t('forgot_password.dont_worry')}
                        </p>
                        <p className='forgotPasswordSpan'>{t('forgot_password.we_will')}</p>
                        <label className='ForgotPasswordEmailLabel'>{t('forgot_password.email')}</label>
                        <input  className='ForgotPasswordEmailInputText' 
                                type='text' 
                                name='' 
                                placeholder={t('placeholders.your_email')}
                                autoFocus
                                required value={this.state.email} 
                                onChange={(event) => this.setState({ email: event.target.value})}/>
                        <p className='ForgotPasswordEmailErrorMessage'>{this.state.emailErrorMessage}</p>
                        <button className='sendLinkButton' onClick={this.handleForgotPassword}>{t('forgot_password.send_me')}</button>
                    </div>
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                            content='We have already sent a link to your email in order to reset your password!'
                                            ok="Ok"
                                            okFunction={() => { this.setState({openAckDialog: false});
                                                                this.props.history.push({ pathname: '/login' });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ForgotPassword));