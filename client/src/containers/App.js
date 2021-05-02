import React, { Component } from 'react';
import "./App.css";

import LoginPage from '../pages/LoginPage/LoginPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import HomePage from '../pages/HomePage/HomePage';

class App extends Component {
  
  render(){
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  };
}

export default App;
