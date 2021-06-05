import React, { Component } from 'react';
import "../LoginRegisterForm/LoginRegisterForm.css";
import AdminLogin from '../../components/AdminLogin/AdminLogin';
import { withRouter } from "react-router-dom";
import axios from 'axios';


class AdminLoginForm extends Component {
    state = {
        email: '',
        password: '',
        emailErrorMessage: '',
        passwordErrorMessage: '',
        errorMessage: '',
        errorVisible: 'none'
    }

    handleLogin = async() => {
        this.setState({loading: true});
        this.clearErrors();
        
        const result = await axios.post("http://localhost:3000/login2",{
            email:this.state.email,
            password:this.state.password
        })
        console.log(result)
            
            if(result.data.response){
                this.setState({ isLoggedin: true});
                const newUser = result.data.user;
                localStorage.setItem('isUserAuthenticated' , true);
                localStorage.setItem('userID', newUser.adminID);
                localStorage.setItem('userEmail',  newUser.adminEmail);
                localStorage.setItem('userPassword',  newUser.adminPassword);
                this.props.history.push({ pathname: '/adminpanel/'});
            } else {
                console.log("Something went wrong "+result.data);
                this.setState({ 
                    errorMessage: 'Email or Password is incorrect!',
                    errorVisible: 'flex'   
                }, ()=>{console.log(this.state.errorMessage)});
                
            }
            
        
    }

    clearErrors = () => {
        this.setState({
            errorMessage: '',
            errorVisible: 'none'
        });
    }

    render(){
        let formType = null;
        
        formType=(  <AdminLogin     emailInputValue={this.state.email} 
                                    emailInputChanged={(event) => this.setState({ email: event.target.value})}
                                    emailErrorMessage=""
                                    passwordInputValue={this.state.password} 
                                    passwordInputChanged={(event) => this.setState({ password: event.target.value})}
                                    passwordErrorMessage={this.state.errorMessage}
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