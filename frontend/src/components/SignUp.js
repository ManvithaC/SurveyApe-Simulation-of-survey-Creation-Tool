import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';
import axios from 'axios';
import swal from 'sweetalert';

const ROOT_URL = 'http://localhost:8080';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "email": "",
                "firstname": "",
                "lastname": "",
                "password": ""
            }
        }
    }
    handleSignUpSubmit(){
     alert("inside signuopi");
        const temp = this.state.userdata;
        axios
            .post(`${ROOT_URL}/register`, temp)
            .then(response => {
                swal("Successfully Created Account Please click verify");
                this.props.history.push("/CodeVerify");
            })
            .catch(error => {
                swal("Signup/ Invalid Credentials");
                console.log("send error");
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
                        <h4 className='Questrial' style={{'margin-bottom': '30px', 'text-align': 'center'}}>SIGN UP</h4>
                        <input className="inputfield" placeholder="First Name"
                               value={this.state.userdata.firstname}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           firstname: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
                        <input className="inputfield" placeholder="Last Name"
                               value={this.state.userdata.lastname}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           lastname: event.target.value
                                       }
                                   });
                               }}
                        /><br/>
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
                                this.handleSignUpSubmit();
                            }}>SIGN UP
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="ybuttonSecondary" onClick={() => {
                                this.props.history.push("/signIn");
                            }}>or SIGN IN
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Homepage);
