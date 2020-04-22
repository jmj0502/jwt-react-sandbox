//here we are going to create our home component.
import React from "react";
import Axios from "axios";
//imooirting our inner navigation
import InnerNavigation from './InnerNavigation';
//importing our main navigation.
import Navigation from './Navigation';

//here we are setting up our component.
class Home extends React.Component {
    //here we are going to setup a simple constructor which will receive props (in case we need it).
    constructor(props) {
        super(props);
        this.state = {
            userdata: {},
            isAuth: true
        };
    };

    //here we are using axios to pass a get request.
    async componentDidMount() {
        try {
            const res = await Axios.get('http://localhost:4000/api/me', {
                headers: {"x-access-token": localStorage.getItem('token')}
            });
            console.log(res.data);
            if (res.data.name) {
                this.setState({
                   isAuth: false
                });
            } else {
                this.setState({
                    userdata: res.data 
                });
            }
                 
        } catch (err) {
            console.log(err);
        }
    }

    //here we are rendering our views.
    render() {
        if ( this.state.isAuth) { 
            return (
                <div>
                    <InnerNavigation />
                    <div className="container mt-4">
                        <div className="card">
                            <div className="card-header md-4">
                                <h6>
                                    {this.state.userdata.username}
                                </h6>
                            </div>
                            <div className="card-body">
                                <p>{this.state.userdata._id}</p>
                            </div>
                            <div className="card-footer">
                                <h6>{this.state.userdata.password} </h6>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navigation />
                    <div className="container mt-4 btn-danger">
                        <h6 style={{paddingTop: '10px', paddingBottom: '10px', textAlign: 'center'}}>You should't be here!</h6>
                    </div>
                </div>
            )
        }
    };
};

//here we are exporting our module.
export default Home;