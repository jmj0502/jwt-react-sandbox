//here we are importing react in order to built our components.
import React from "react";
import { Link } from "react-router-dom";
//here we are importing our history helper.
import history from '../helpers/history';

//here we are building our component.
class InnerNavigation extends React.Component {
    constructor(props) {
        super (props);
    }

    render () {
        return(
            <div className="navbar-fixed">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">
                        LoginApp
                    </Link>
                    <div className="navbar-collapse collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item active">
                                <Link className="nav-link" to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="navbar-item active">
                                <button 
                                className='btn btn-logout nav-link'
                                onClick={() => {
                                    history.push('/');
                                    localStorage.clear();
                                    
                                }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

//here we are exporting our component.
export default InnerNavigation;