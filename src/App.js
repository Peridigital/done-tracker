import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Route} from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Home from './Home'
import Admin from './Admin'

class App extends Component {

  

  render() {

   

    return (
      <div className='site-background'>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        <Route exact path="/" component={Home}/>
      </div>
    );
  }
}

export default withRouter(App);
