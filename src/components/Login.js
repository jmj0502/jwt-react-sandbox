//here we are creating our login component.
import React from "react";
import { Link } from "react-router-dom";
//here we are importing jwt.
import jwt from "jsonwebtoken";
//here we are importing our story helper.
import history from '../helpers/history';
//importing our navigation
import Navigation from './Navigation'
import axios from "axios";

//here we are creating our component.
class LoginForm extends React.Component {
    
    //here we are creatiung a constructor which will receive our props, in case we have them.
    constructor (props) {
        super (props);
        this.state = {
            username: '',
            password: '',
        };
    };

    //here we are going to create a method which will allow us to receive the data from our users.
    onFormChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    //on form submit
    onFormSubmit = async e => {
        try {    
            e.preventDefault();
            const User = {
                username: this.state.username,
                password: this.state.password        
            };
            if (User.username === '') {
                console.log('You must fill every field');
            }
            if (User.password === '') {
                console.log('You must enter your password');
            }
            const res = await axios.post('http://localhost:4000/api/login', User);
            const token = (res.data.token).replace(/"/g, '');
            
            /* This is usefull is you want to replicate the req.user parameter provided by  other auth methods (while using sessions for auth).
            const decoded = jwt.decode(token, 'mytoken');

            console.log(decoded.username);
            */

            localStorage.setItem('token', token);
            history.push('/dashboard');
        } catch (err) {
            console.log(err);
        };
    };

    //here we are creating a single logging form.
    render () {
        return ( 
            <div>
                <Navigation />
                <div className="card mt-4 ml-4 mr-4">
                    <div className="card-body">
                        <div className="form-group">
                            <label> Username</label>
                            <input type="text" placeholder="Add your username" className="form-control" name="username" onChange={this.onFormChange} />
                        </div>
                        <div className="form-group">
                            <label> Password</label>
                            <input type="password" placeholder="Add your password" className="form-control" name="password" onChange={this.onFormChange} />
                        </div>
                        <form onSubmit={this.onFormSubmit}>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                        <p>Don't you have and account? <Link to='/sign-up'>Create one then!</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

//here we are exporting our component.
export default LoginForm;