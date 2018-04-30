import axios from 'axios';
import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';

import swal from 'sweetalert';

const ROOT_URL = 'http://localhost:8080';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "email": "",
                "password": ""
            },
            "isLoggedin": ""
        };
    }

    handleSignInSubmit() {
        // alert("inside sigin");
        const temp = this.state.userdata;
        axios
            .post(`${ROOT_URL}/login`, temp)
            .then(response => {
                if (response.data.code == 201) {
                   swal("please verify the account");
                }
                    else {
                    swal("Successfully Signed");
                    this.setState(
                        {
                            "isLoggedin": true
                        }
                    )
                }
            })
            .catch(error => {
                swal("Login Failed");
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-6 indexZ" style={{'opacity': '0.4'}}>
                        <img src={signupimage} className={"indexZ"}/>
                    </div>

                    <div className="col-md-4 cardbox">
                        <h4 className='Questrial' style={{'margin-bottom': '10px', 'text-align': 'center'}}>SIGN IN</h4>
                        <input type="email" className="inputfield" placeholder="Email"
                               value={this.state.userdata.email}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           email: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
                        <input type="password" className="inputfield" placeholder="Password"
                               value={this.state.userdata.password}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           password: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
                        <div className="row justify-content-center">
                            <button className="ybutton" onClick={() => {
                                this.handleSignInSubmit();
                            }}>SIGN IN
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="ybuttonSecondary" onClick={() => {
                                this.props.history.push("/signUp");
                            }}>or SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Homepage);
