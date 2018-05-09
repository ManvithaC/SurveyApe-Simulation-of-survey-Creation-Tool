import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';
import axios from 'axios';
import swal from 'sweetalert';
import CircularProgress from 'material-ui/CircularProgress';

const ROOT_URL = 'http://localhost:8080';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "email": "",
                "firstname": "",
                "lastname": "",
                "password": "",

            },
            isButtonDisabled:'',
            progress:false,
        }
    }
    handleSignUpSubmit(){
        const temp = this.state.userdata;
        this.setState({
            isButtonDisabled:'disabled',
            progress:true,
        });
        axios
            .post(`${ROOT_URL}/register`, temp)
            .then(response => {
                if(response.data.code==200) {
                    swal("Congratulations", "Account created Successfully.Please Verfiy your account.An Email is sent with Verification Code", "success")
                    console.log(this.state.userdata.email);
                    this.props.history.push({
                        pathname: '/AccountVerify',
                        state: this.state.userdata.email
                    });

                }
                else
                {
                    swal("User Already exists", "Please Sign in", "warning")
                    this.props.history.push("/signIn");
                }
            })
            .catch(error => {
                swal("Error", "Please try again", "error")
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
                            <button className="ybutton"
                                    disabled={this.state.isButtonDisabled}
                                    onClick={() => {
                                this.handleSignUpSubmit();
                            }}>{
                                this.state.progress?<CircularProgress
                                    size={50}
                                    thickness={5}
                                    color={'#ffffff'}
                                />:'SIGN UP'
                            }
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
