import React, { Component } from 'react';
import "./LoginRegisterForm.css";
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import PageContainer from '../../components/PageContainer/PageContainer';

//import users from 'server/collections/users';


class LoginRegisterForm extends Component {
    state = {
        firstname: '',
        surname: '',
        birthdate: null,
        gender: true,       //TRUE for FEMALE, FALSE for MALE
        email: '',
        password: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        nameErrorMessage: '',
        hasAccount: true
    }

    handleLogin = () => {
        this.clearErrors();
        //TODO
    }

    handleRegister = () => {
        this.clearErrors();
        //TODO
        //var newUser =new users( this.state.firstname, this.state.surname, this.state.email, this.state.password, this.state.birthdate, this.state.gender, '');
        
    }

    handleForgotPassword = () => {
        //TODO
    }

    checkEmailValidility = () => {
        //TODO
    }

    checkPasswordValidility = () => {
        //TODO
    }

    checkNameValidility = () => {
        //TODO
    }

    getSelectedDate = (date) => {
        this.setState({birthdate: date});
    }

    clearInputs = () => {
        this.setState({
            emailErrorMessage: '',
            passwordErrorMessage: ''    
        });
    }

    clearErrors = () => {
        this.setState({
            email: '',
            password: '',
            firstname: '',
            surname: '',
            birthdate: null,
            gender: ''
        });
    }

    render(){
        let formType = null;

        if(this.state.hasAccount) {
            formType=(<LoginForm    emailInputValue={this.state.email} 
                                    emailInputChanged={(event) => this.setState({ email: event.target.value})}
                                    emailErrorMessage={this.state.emailErrorMessage}
                                    passwordInputValue={this.state.password} 
                                    passwordInputChanged={(event) => this.setState({ password: event.target.value})}
                                    passwordErrorMessage={this.state.passwordErrorMessage}
                                    loginClicked={this.handleLogin}
                                    forgotPasswordClicked={this.handleForgotPassword}
                                    changeFormToRegisterClicked={() => {
                                        this.clearInputs();
                                        this.clearErrors();
                                        this.setState({ hasAccount: false});}
                                    }
                                    />);
        }else {
            formType=(  <RegisterForm   firstnameInputValue={this.state.firstname}
                                        firstnameInputChanged={(event) => this.setState({ firstname: event.target.value})}
                                        surnameInputValue={this.state.surname}
                                        surnameInputChanged={(event) => this.setState({surname: event.target.value})}
                                        nameErrorMessage={this.state.nameErrorMessage}
                                        emailInputValue={this.state.email} 
                                        emailInputChanged={(event) => this.setState({email: event.target.value})}
                                        emailErrorMessage={this.state.emailErrorMessage}
                                        passwordInputValue={this.state.password} 
                                        passwordInputChanged={(event) => this.setState({password: event.target.value})}
                                        passwordErrorMessage={this.state.passwordErrorMessage}
                                        registerClicked={this.handleRegister}
                                        changeFormToLoginClicked={() => {
                                            this.clearInputs();
                                            this.clearErrors();
                                            this.setState({ hasAccount: true});}
                                        }
                                        birthdate={this.state.birthdate}
                                        birthdateChanged={(date) => this.setState({ birthdate: date})}
                                        femaleSelected={(event) => this.setState({gender: true})}
                                        maleSelected={(event) => this.setState({gender: false})}
                        />);
        }

        return(
            <PageContainer>
                <div className='LoginRegisterForm'>
                    <div className='formBackgroundFilter'>
                        {formType}
                    </div>
                </div>
            </PageContainer>
        )
    }
}

export default LoginRegisterForm;