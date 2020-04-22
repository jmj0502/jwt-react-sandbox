//here we are importing react, in ordert o create our register component.
import React from "react";
import { Redirect } from "react-router-dom";
//here we are importing axios.
import axios from "axios";
//importing our components.
import Navigation from './Navigation';
//importing our helpers.
import history from '../helpers/history';

//here we are creating our SignUp component.
class SignUpForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            username: '',
            password: '',
            error: []
        }; 
    };

    //here we are going to create a method which will allow us to get the data from our username field
    getUsernameData = e => {
        this.setState({
            username: e.target.value 
        });
    };

    //here we are going to create a method which will allow us to get the data from our password field
    getPasswordData = e => {
        this.setState({
            password:e.target.value
        });
    };

    //Here we are going to create the method which will send the registration data to the user.
    onFormSubmit = async e => {
        try {
            e.preventDefault();
            const newUser = {
                username: this.state.username,
                password: this.state.password
            };
            if (newUser.username.length < 4) {
                this.setState({
                    error: 'Your username need more characters'
                });
            }
            if (newUser.password.length < 4){
                this.setState({
                    error: 'Your password need more characters'
                });
            }

            const res = await axios.post('http://localhost:4000/api/register', newUser);
            const token = (res.data.token).replace(/"/g, '');
            localStorage.setItem('token', token);
            history.push('/dashboard');

        } catch (err) {
            console.log(err);
        };
    };

    //here we are building our register form.
    render() {
        return (
            <div>
                <Navigation />
                <div className="card mt-4">
                    <div>{this.state[0]} </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label> Username</label>
                            <input 
                            type="text" 
                            placeholder="Add your username"
                            className="form-control" 
                            onChange={this.getUsernameData} 
                            />
                        </div>
                        <div className="form-group">
                            <label> Password</label>
                            <input 
                            type="password" 
                            placeholder="Add your password" 
                            className="form-control" 
                            onChange={this.getPasswordData} 
                            />
                        </div>
                        <form onSubmit={this.onFormSubmit}>
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

//here we are exporting our signup form.
export default SignUpForm;