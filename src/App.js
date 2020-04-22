import React from 'react';
//importing react routes.
import { Router, Route } from "react-router-dom";
import './App.css';
//here we are importing bootstrap, in order to handle some details.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//here we are importing our components.
import SignUpForm from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
//here we are importing our helpers.
import history from './helpers/history';


function App() {
  return (
    <Router history={history}>
  
        <Route path='/' exact component={Login} />
        <Route path="/dashboard" exact component={Home} />
        <Route path="/sign-up" component={SignUpForm} />
        
    
    </Router>
  );
}

export default App;
