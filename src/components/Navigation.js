//here we are importing react in order to built our components.
import React from "react";
import { Link } from "react-router-dom"

//here we are building our component.
class Navigation extends React.Component {
    render () {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    LoginApp
                </Link>
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item active">
                            <Link className="nav-link" to="/sign-up">
                                Sign Up
                            </Link>
                        </li>
                        <li className="navbar-item active">
                            <Link className="nav-link" to="/">
                                Sign-In
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

//here we are exporting our component.
export default Navigation;