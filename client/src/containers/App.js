import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "./App.css";

import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/HomePage/HomePage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import MyReviewsPage from '../pages/MyReviewsPage/MyReviewsPage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';

class App extends Component {
  
  render(){
    return (
      <Router>
        <div className="App">
          <Switch>
              <Route path='/login' exact component = {LoginPage}/>
              <Route path='/register' exact component = {RegisterPage}/>
              <Route path='/' exact component = {LandingPage}/>
              <Route path='/home' exact component = {HomePage}/>
              <Route path='/forgotPassword' exact component = {ForgotPasswordPage}/>
              <Route path='/resetPassword' exact component = {ResetPasswordPage}/>
              <Route path='/myReviews' exact component = {MyReviewsPage}/>
              <Route path='/search' exact component = {SearchResultsPage}/>
          </Switch>
        </div>
      </Router>
    );
  };
}

export default App;
