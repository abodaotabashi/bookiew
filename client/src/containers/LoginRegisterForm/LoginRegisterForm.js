import React, { Component } from 'react';
import "./LoginRegisterForm.css";
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {Link} from 'react-router-dom';
import axios from 'axios';

import PageContainer from '../../components/PageContainer/PageContainer';


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

    handleLogin = async () => {
        this.clearErrors();
        //TODO
        const result = await axios.post("http://localhost:3000/login",{
            email:this.state.email,
            password:this.state.password
        })
        if(result.data.response){
            console.log("Hooray you did it")
            return;
        }

        console.log("BOOO!",result.data)
        return;

    }

    handleRegister = async () => {
        this.clearErrors();
        //TODO
        const result = await axios.post("http://localhost:3000/register",{
            firstname: this.state.firstname,
            surname: this.state.surname,
            birthdate: this.state.birthdate,
            gender: this.state.gender,       //TRUE for FEMALE, FALSE for MALE
            email: this.state.email,
            password: this.state.password,
            hasAccount: this.state.hasAccount
        });
        if(result.data.response){
            console.log("Hooray you did it")
            return;
        }
        console.log("BOOO!", result.data)
        return;
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