import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import AcknowledgementDialog from '../../components/Dialogs/AcknowledgementDialog';

import "./LoginRegisterForm.css";

class LoginRegisterForm extends Component {
    state = {
        firstname: '',
        surname: '',
        birthdate: null,
        gender: null,       //TRUE for FEMALE, FALSE for MALE
        email: '',
        password: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        nameErrorMessage: '',
        hasAccount: this.props.formType,
        formChanged: false,
        isLoggedin: false,
        isRegistered: false,
        loading: false,
        openAckDialog: false
    }

    validate = () =>{
        if (this.state.email === ""){
            this.setState({ emailErrorMessage: 'Please enter your Email first!' });
            return false;
        }
        
        if (!this.state.email.includes('@')) {
            this.setState({ emailErrorMessage: 'Invalid Email!', loading: false });
            return false;
        }
        
        if (this.state.password.length < 6) {
            console.log(this.state.password.length);
            this.setState({ passwordErrorMessage: 'Password must contain more than 6 characters', loading: false });
            return false;
        }

        if ( (!this.state.hasAccount && !this.state.formChanged) || (this.state.hasAccount && this.state.formChanged)) {
            if (this.state.firstname || this.state.surname) {
                if (!(/^[A-Za-z ]+$/.test(this.state.firstname)) || !(/^[A-Za-z ]+$/.test(this.state.surname))) {
                    this.setState({ nameErrorMessage: 'Invalid name!', loading: false });
                    return false;
                }
            } else {
                this.setState({ nameErrorMessage: 'Firstname and Surname cannot be empty!' });
                return false;
            }

            if(this.state.birthdate === null) {
                this.setState({ passwordErrorMessage: 'Please enter your Birthdate!', loading: false });
                return false;
            }

            if(this.state.gender === null) {
                this.setState({ passwordErrorMessage: 'Please enter your Gender!', loading: false });
                return false;
            }
        }
        return true;
    }

    handleLogin = async () => {
        this.setState({loading: true});
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
                const newUser = result.data.user;
                localStorage.setItem('isUserAuthenticated' , true);
                localStorage.setItem('userID', newUser.userID);
                localStorage.setItem('userFirstname',  newUser.firstname);
                localStorage.setItem('userSurname',  newUser.surname);
                localStorage.setItem('userEmail',  newUser.email);
                localStorage.setItem('userProfilePhotoURL',  newUser.profilePhotoURL);
                localStorage.setItem('userGender',  newUser.gender);
                localStorage.setItem('userBirthdate',  newUser.birthdate);
                localStorage.setItem('userPassword',  newUser.password);
                this.setState({loading: false});
                this.goToHome();
                return;
            } else {
                console.log("Something went wrong "+result.data);
                this.setState({passwordErrorMessage: 'Email or Password is incorrect!', loading: false});
                return;
            }
        }
    }

    handleRegister = async () => {
        this.clearErrors();
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
                this.setState({openAckDialog: true});
            } else {
                console.log("Something went wrong"+ result.data);
            }
        }
    }

    getSelectedDate = (date) => {
        this.setState({birthdate: date});
    }

    goToHome = () => {
        this.props.history.push({ pathname: '/home' });
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
        if(localStorage.getItem('isUserAuthenticated') === 'true'){
            this.goToHome();
        }

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
            <div className='LoginRegisterForm'>
                <div className='formBackgroundFilter'>
                    {formType}
                    <AcknowledgementDialog  openAckDialog={this.state.openAckDialog}
                                            content= {t('dialogs.login_register')}
                                            ok="Ok"
                                            okFunction={() => { this.setState({openAckDialog: false, isRegistered: true});
                                                                this.props.history.push({ pathname: '/login' });}}>
                    </AcknowledgementDialog>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginRegisterForm);