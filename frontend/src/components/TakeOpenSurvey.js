import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8080';


class TakeSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            typeOfSurvey: '',
            surveyID: '',
        }
    }

    sendTheLinkToEmail = () => {
        console.log(this.state.email);
        // backend call for third type of survey

        //alert("clicked button");
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        var toSendJSON = {};
        toSendJSON.email = this.state.email;
        toSendJSON.surveyID = this.state.surveyID;

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/openSendEmail`, toSendJSON, axiosConfig)
            .then(response => {
                swal('Email Sent');
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    };

    componentWillMount() {
        console.log('type of survey---' + this.props.match.params.type);
        console.log('surveyId---' + this.props.match.params.surveyId);
        this.setState({
            typeOfSurvey: this.props.match.params.type,
            surveyID: this.props.match.params.surveyId,
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div className="row justify-content-center ">
                        {
                            this.state.typeOfSurvey == 'open' || this.state.typeOfSurvey == 'general' ? (

                                <div className="col-md-6 cardbox">
                                    <h2 style={{'text-align': 'center'}}>Thanks! We are excited to know opinion.</h2>
                                    <br/>
                                    <p style={{'text-align': 'center', 'font-size': '15px', 'color': '#424242'}}>
                                        How do you want you complete the survey?
                                    </p>
                                    <div className="row justify-content-center">
                                        <button className="ybutton" onClick={() => {
                                            this.props.history.push("/signIn");
                                        }}>SIGN IN
                                        </button>
                                    </div>
                                    <div className="row justify-content-center">
                                        <button className="ybuttonEmail" onClick={() => {
                                            this.props.history.push("/signUp");
                                        }}>SIGN UP
                                        </button>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-5">
                                            <hr/>
                                        </div>
                                        <div class="col-md-2">or</div>
                                        <div class="col-md-5">
                                            <hr/>
                                        </div>
                                    </div>
                                    <br/>
                                    <input type="email" className="inputfield" placeholder="Enter email"
                                           value={this.state.email}
                                           onChange={(event) => {
                                               this.setState({
                                                       email: event.target.value
                                                   }
                                               );
                                           }}
                                    />

                                    <div className="row justify-content-center">
                                        <button className="ybutton" onClick={
                                            this.sendTheLinkToEmail}>SEND ME A UNIQUE LINK
                                        </button>
                                    </div>

                                </div>
                            ) : ''
                        }

                        {
                            this.state.typeOfSurvey == 'closed' ? (

                                <div className="col-md-6 cardbox">
                                    <h2 style={{'text-align': 'center'}}>Thanks! We are excited to know opinion.</h2>
                                    <br/>
                                    <p style={{'text-align': 'center', 'font-size': '15px', 'color': '#424242'}}>
                                        How do you want you complete the survey?
                                    </p>
                                    <div className="row justify-content-center">
                                        <button className="ybutton" onClick={() => {
                                            this.props.history.push("/signIn");
                                        }}>SIGN IN
                                        </button>
                                    </div>
                                    <div className="row justify-content-center">
                                        <button className="ybuttonEmail" onClick={() => {
                                            this.props.history.push("/signUp");
                                        }}>SIGN UP
                                        </button>
                                    </div>
                                </div>
                            ) : ''
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(TakeSurvey);
