import React, { Component } from 'react';
import "./LoginRegisterForm.css";
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import axios from 'axios';
import { Redirect, withRouter } from "react-router-dom";

import PageContainer from '../../components/PageContainer/PageContainer';
import HomePage from '../../pages/HomePage/HomePage';


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
        hasAccount: this.props.formType,
        formChanged: false,
        isLoggedin: false,
        isRegistered: false
    }

    validate = () =>{
        
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!' });
            return false;
        }
        

        if ( (!this.state.hasAccount && !this.state.formChanged) || (this.state.hasAccount && this.state.formChanged)) {
            if (this.state.firstname || this.state.surname) {
                if (!(/^[A-Za-z ]+$/.test(this.state.firstname)) || !(/^[A-Za-z ]+$/.test(this.state.surname))) {
                    this.setState({ nameErrorMessage: 'Invalid name!' });
                    return false;
                }
            } else {
                this.setState({ nameErrorMessage: 'Firstname and Surname cannot be empty!' });
                return false;
            }
            if (this.state.password.length < 6) {
                console.log(this.state.password.length);
                this.setState({ passwordErrorMessage: 'Password must contain more than 6 characters' });
                return false;
            }
        }
        return true;
    }

    handleLogin = async () => {
        this.clearErrors();
        const isValid = this.validate();
        if (isValid) {
            const result = await axios.post("http://localhost:3000/login",{
                email:this.state.email,
                password:this.state.password
            })
            if(result.data.response){
                console.log("Successfully logged in");
                this.setState({ isLoggedin: true});
                this.props.history.push({
                    pathname: '/home',
                    state: { username: "Nice!!!", user: null }});
                return;
            }

            console.log("Something went wrong ",result.data)
            return;
        }
    }

    handleRegister = async () => {
        this.clearErrors();
        //TODO
        const isValid = this.validate();
        if (isValid) {
            const result = await axios.post("http://localhost:3000/register",{
            firstname: this.state.firstname,
            surname: this.state.surname,
            birthdate: this.state.birthdate,
            gender: this.state.gender,       //TRUE for FEMALE, FALSE for MALE
            email: this.state.email,
            password: this.state.password,
            });
            if(result.data.response){
                console.log("Successfully registered",result.data);
                this.setState({ isRegistered: true});
                this.props.history.push({pathname: '/login'});
                
                return;
            }
            console.log("Something went wrong", result.data);
            return;
        }
    }

    handleForgotPassword = () => {
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

        if(this.state.hasAccount && !this.state.formChanged) {
            formType=(  <LoginForm    emailInputValue={this.state.email} 
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
                                        this.setState({ formChanged: true });}
                                    }
                        />);
        }else if(!this.state.hasAccount && !this.state.formChanged) {
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
                                            this.setState({ formChanged: true });}
                                        }
                                        birthdate={this.state.birthdate}
                                        birthdateChanged={(date) => this.setState({ birthdate: date})}
                                        femaleSelected={(event) => this.setState({gender: true})}
                                        maleSelected={(event) => this.setState({gender: false})}
                        />);
        }else if(this.state.hasAccount && this.state.formChanged) {
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
                                            this.setState({ formChanged: false });}
                                        }
                                        birthdate={this.state.birthdate}
                                        birthdateChanged={(date) => this.setState({ birthdate: date})}
                                        femaleSelected={(event) => this.setState({gender: true})}
                                        maleSelected={(event) => this.setState({gender: false})}
                        />);
        }else if(!this.state.hasAccount && this.state.formChanged) {
            formType=(  <LoginForm    emailInputValue={this.state.email} 
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
                                        this.setState({ formChanged: false });}
                                    }
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

export default withRouter(LoginRegisterForm);