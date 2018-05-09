import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/chilling.gif';
import axios from 'axios';
import swal from 'sweetalert';
import CircularProgress from 'material-ui/CircularProgress';

const ROOT_URL = 'http://localhost:8080';

class CodeVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                "code": "",
                "username": this.props.location.state
            },
            isButtonDisabled:'',
            progress:false,
        }
    }

    handleAccountSubmit() {
      const temp = this.state.userdata;
        this.setState({
            isButtonDisabled:'disabled',
            progress:true,
        });
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        console.log(temp);
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/verifyaccount`, temp, axiosConfig)
            .then(response => {
                if (response.data.code == 200) {
                    swal("Congratulations", "Account Verified Successfully.Please Sign in.", "success")
                    this.props.history.push("/SignIn");
                }
                else if (response.data.code == 400) {
                    swal("Already Verified", "Account Verified already.Please Sign in.", "warning")
                    this.props.history.push("/SignIn");
                }
                else {
                    swal("Invalid User", "Please Sign up.", "error")
                    this.props.history.push("/SignUp");
                }
            })
            .catch(error => {
                console.log(error);
                console.log('hk')
            });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-6 indexZ" style={{'margin-right': '10px'}}>
                        <img src={signupimage} className={"indexZ"}/>
                    </div>

                    <div className="col-md-5 cardbox">
                        <h1 className='Questrial' style={{'margin-bottom': '15px', 'text-align': 'center'}}>Verify Your
                            Account</h1>
                        <h6 className='Questrial' style={{'margin-bottom': '20px', 'text-align': 'center'}}>We have sent
                            a code to your Email. Please enter it to verify your account </h6>
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
                            }}>{
                                this.state.progress?<CircularProgress
                                    size={50}
                                    thickness={5}
                                    color={'#ffffff'}
                                />:'Verify My Account'
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

export default withRouter(CodeVerify);
