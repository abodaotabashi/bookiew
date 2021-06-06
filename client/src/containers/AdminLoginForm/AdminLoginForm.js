import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';

import AdminLogin from '../../components/AdminLogin/AdminLogin';

import "../LoginRegisterForm/LoginRegisterForm.css";

class AdminLoginForm extends Component {
    state = {
        email: '',
        password: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        emailErrorVisible: 'none',
        passwordErrorVisible: 'none'
    }

    validate = () =>{
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!',
                            emailErrorVisible: 'flex' });
            return false;
        }
        if (this.state.password.length < 6) {
            console.log(this.state.password.length);
            this.setState({ passwordErrorMessage: 'Password must contain more than 6 characters',
                            passwordErrorVisible: 'flex' });
            return false;
        }
        return true;
    }


    handleLogin = async () => {
        this.clearErrors();
        const isValid = this.validate();
        if (isValid) {
            const result = await axios.post("http://localhost:3000/adminPanel/login",{
                email: this.state.email,
                password: this.state.password
            })
            if (result.data.response) {
                localStorage.setItem('isAdminAuthenticated' , true);
                this.props.history.push({ pathname: '/adminpanel/'});
            } else {
                console.log("Something went wrong "+result.data);
                this.setState({ 
                    passwordErrorMessage: 'Email or Password is incorrect!',
                    passwordErrorVisible: 'flex'   
                });
            }
        }
    }

    clearErrors = () => {
        this.setState({
            emailErrorMessage: '',
            passwordErrorMessage: '',
            emailErrorVisible: 'none',
            passwordErrorVisible: 'none'
        });
    }

    goToHome = () => {
        this.props.history.push({ pathname: '/adminpanel/' });
    }

    render(){
        if(localStorage.getItem('isAdminAuthenticated') === 'true'){
            this.goToHome();
        }

        let formType=(  <AdminLogin     emailInputValue={this.state.email} 
                                        emailInputChanged={(event) => this.setState({ email: event.target.value})}
                                        emailErrorMessage={this.state.emailErrorMessage}
                                        passwordInputValue={this.state.password} 
                                        passwordInputChanged={(event) => this.setState({ password: event.target.value})}
                                        passwordErrorMessage={this.state.passwordErrorMessage}
                                        loginClicked={this.handleLogin}
                                        emailErrorVisible={this.state.emailErrorVisible}
                                        passwordErrorVisible={this.state.passwordErrorVisible}
                        />);
        
        return( 
            <div className='adminForm'>
                <div className='adminFormBackgroundFilter'>
                    {formType}
                </div>
            </div>
        )
    }
}

export default withRouter(AdminLoginForm);