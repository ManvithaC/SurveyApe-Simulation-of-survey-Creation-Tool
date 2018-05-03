import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import swal from 'sweetalert';

class TakeSurvey extends Component{
    constructor(props){
        super(props);
        this.state={
            email:''
        }
    }

    sendTheLinkToEmail = () =>{
        console.log(this.state.email);
        swal('Email Sent');
    }

    render(){
        return (
            <div>
                <div>
                    <div className="row justify-content-center ">

                        <div className="col-md-6 cardbox">
                            <h2 style={{'text-align': 'center'}}>Thanks! We are excited to know opinion.</h2>
                            <br/>
                            <p style={{'text-align': 'center','font-size':'15px','color':'#424242'}}>
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
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(TakeSurvey);
