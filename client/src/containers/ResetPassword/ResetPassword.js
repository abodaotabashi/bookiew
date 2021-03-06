import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {withTranslation} from "react-i18next";

import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import "./ResetPassword.css";

class ResetPassword extends Component {
    state = {
        password: '',
        confirmPassword: '',
        passwordErrorMessage: '',
        token: this.props.match.params.token,
        openAckDialog: false
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
        const isValid = this.validate;
        if(isValid) {
            const result = await axios.post("http://localhost:3000/resetPassword", {
                password: this.state.password,
                token: this.state.token
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
            <div className='ResetPasswordContainer'>
                <div className='ResetPasswordContainerBackgroundFilter'>
                    <div className='ResetPasswordWrapper'>
                        <p className='ResetPasswordHeader'>
                            {t('reset_pw.title')}
                        </p>
                        <p className='ResetPasswordSpan'>{t('reset_pw.enter')}</p>
                        <label className='ResetPasswordLabel'>{t('reset_pw.password')}</label>
                        <input  className='ResetPasswordInputText' 
                                type='password' 
                                name='' 
                                placeholder={t('placeholders.your_password')}
                                required value={this.state.password} 
                                onChange={(event) => this.setState({ password : event.target.value })} />
                        <label className='ResetPasswordLabel'>{t('reset_pw.confirm')}</label>
                        <input  className='ResetPasswordInputText' 
                                type='password' 
                                name='' 
                                placeholder={t('placeholders.confirm_your_pwd')}
                                required value={this.state.confirmPassword} 
                                onChange={(event) => this.setState({ confirmPassword : event.target.value })} />
                        <p className='ResetPasswordErrorMessage'>{this.state.passwordErrorMessage}</p>
                        <button className='ResetPasswordButton' onClick={this.handleResetPassword}>{t('reset_pw.reset')}</button>
                    </div>
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                            content= {t('dialogs.reset_pass')}
                                            ok="Ok"
                                            okFunction={() => { this.setState({openAckDialog: false});
                                                                this.props.history.push({ pathname: '/login' });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ResetPassword));