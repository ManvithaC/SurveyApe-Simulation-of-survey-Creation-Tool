import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/chilling.gif';
import axios from 'axios';
import swal from 'sweetalert';

const ROOT_URL = 'http://localhost:8080';

class CodeVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "code": "",
            }
        }
    }
    handleAccountSubmit(){
        const temp = this.state.userdata;
        this.props.history.push("/SignIn");
    }
    render() {
        return (
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-6 indexZ" style={{'margin-right': '10px'}}>
                        <img src={signupimage} className={"indexZ"}/>
                    </div>

                    <div className="col-md-5 cardbox">
                        <h1 className='Questrial' style={{'margin-bottom': '15px', 'text-align': 'center'}}>Verify Your Account</h1>
                        <h6 className='Questrial' style={{'margin-bottom': '20px', 'text-align': 'center'}}>We have sent a code to your Email. Please enter it to verify your account </h6>
                    <br/>
                        <input type="text" className="inputfieldCode Questrial" placeholder="Enter Verification Code"
                               style={{'margin-bottom': '30px', 'text-align': 'center'}}
                               value={this.state.userdata.code}
                               onChange={(event) => {
                                   this.setState({
                                       userdata: {
                                           ...this.state.userdata,
                                           code: event.target.value
                                       }
                                   });
                               }}
                        /><br/>

                        <div className="row justify-content-center">
                            <button className="ybutton" onClick={() => {
                                this.handleAccountSubmit();
                            }}>Verify My Account
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

export default withRouter(CodeVerify);
