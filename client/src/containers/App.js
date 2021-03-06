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
import ViewReviewPage from '../pages/ViewReviewPage/ViewReviewPage';
import ViewOtherReviewPage from '../pages/ViewOtherReviewPage/ViewOtherReviewPage';
import ViewBookPage from '../pages/ViewBookPage/ViewBookPage';
import EditReviewPage from '../pages/EditReviewPage/EditReviewPage';
import AddReviewPage from '../pages/AddReviewPage/AddReviewPage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';
import EditProfilePage from '../pages/EditProfilePage/EditProfilePage';
import BookRecommendationPage from '../pages/BookRecommendationPage/BookRecommendationPage';
import AdminLoginPage from '../pages/AdminLoginPage/AdminLoginPage';
import AdminAddBookPage from '../pages/AdminAddBookPage/AdminAddBookPage';
import AdminSearchResultsPage from '../pages/AdminSearchResultsPage/AdminSearchResultsPage';
import AdminHomePage from '../pages/AdminHomePage/AdminHomePage';
import AdminUpdateBookPage from '../pages/AdminUpdateBookPage/AdminUpdateBookPage';
import AdminRecommendationsPage from '../pages/AdminRecommendationsPage/AdminRecommendationsPage';
import NotfoundPage from '../pages/NotfoundPage/NotfoundPage';

class App extends Component {
  
  render(){
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/login' exact component = {LoginPage}/>
            <Route path='/register' exact component = {RegisterPage}/>
            <Route path='/' exact component = {LandingPage}/>
            <Route path='/home' exact component = {HomePage}/>
            <Route path='/forgotPassword' exact component = {ForgotPasswordPage}/>
            <Route path='/resetPassword/:token' exact component = {ResetPasswordPage}/>
            <Route path='/myReviews' exact component = {MyReviewsPage}/>
            <Route path='/searchResults' exact component = {SearchResultsPage}/>
            <Route path='/editProfile' exact component = {EditProfilePage}/>
            <Route path='/bookRecommendation' exact component = {BookRecommendationPage}/>
            <Route path='/viewReview' exact component = {ViewReviewPage}/>
            <Route path='/viewBook' exact component = {ViewBookPage}/>
            <Route path='/editReview' exact component = {EditReviewPage}/>
            <Route path='/addReview' exact component = {AddReviewPage}/>
            <Route path='/viewReviewOfOther' exact component = {ViewOtherReviewPage}/>
            <Route path='/adminpanel/login' exact component = {AdminLoginPage}/>
            <Route path='/adminpanel/addBook' exact component = {AdminAddBookPage}/>
            <Route path='/adminpanel/searchResults' exact component = {AdminSearchResultsPage}/>
            <Route path='/adminpanel/' exact component = {AdminHomePage}/>
            <Route path='/adminpanel/updateBook' exact component = {AdminUpdateBookPage}/>
            <Route path='/adminpanel/recommendations' exact component = {AdminRecommendationsPage}/>
            <Route component={NotfoundPage} />
          </Switch>
        </Router>
      </div>
    );
  };
}

export default App;
