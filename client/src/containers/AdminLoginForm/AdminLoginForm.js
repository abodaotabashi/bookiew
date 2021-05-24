import React, { Component } from 'react';
import "../LoginRegisterForm/LoginRegisterForm.css";
import AdminLogin from '../../components/AdminLogin/AdminLogin';
import { withRouter } from "react-router-dom";


class AdminLoginForm extends Component {
    state = {
        email: '',
        password: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        isLoggedin: false
    }

    validate = () =>{
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!' });
            return false;
        }
        if (this.state.password.length < 6) {
            console.log(this.state.password.length);
            this.setState({ passwordErrorMessage: 'Password must contain more than 6 characters' });
            return false;
        }
        return true;
    }

    handleLogin = async () => {
        this.clearErrors();
        //TODO
    }

    clearInputs = () => {
        this.setState({
            email: '',
            password: ''
        });
    }

    clearErrors = () => {
        this.setState({
            emailErrorMessage: '',
            passwordErrorMessage: ''    
        });
    }

    render(){
        let formType = null;

        formType=(  <AdminLogin     emailInputValue={this.state.email} 
                                    emailInputChanged={(event) => this.setState({ email: event.target.value})}
                                    emailErrorMessage={this.state.emailErrorMessage}
                                    passwordInputValue={this.state.password} 
                                    passwordInputChanged={(event) => this.setState({ password: event.target.value})}
                                    passwordErrorMessage={this.state.passwordErrorMessage}
                                    loginClicked={this.handleLogin}
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