import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/landingpage.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import HomePage from './HomePage';
import CreateNewSurvey from './CreateNewSurvey';
class LandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <header >
                    <nav style={{'background-color':'#ffffff'}} className="navbar navbar-expand-lg navbar-dark fixed-top mb-5" id="mainNav">
                        <a className="navbar-brand d-flex align-items-center pointer " onClick={() => {
                            this.props.history.push("/");
                        }}>
                            <span className="righteous purple pt-3 pl-5 " style={{'font-size':'2em'}}>Survey Ape</span>
                        </a>
                        <ul className="navbar-nav text-uppercase ml-auto">
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/About");
                                }}>About</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/Team");
                                }}>Team</a>
                            </li>
                            <li className="nav-item mynav">
                                <a className="nav-link pointer mr-2" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignIn");
                                }}>Sign in</a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SignUp");
                                }}><button class="signupnav">SIGN UP</button></a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn mr-5" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/CreateNewSurvey");
                                }}><button class="signupnav">CREATE A SURVEY</button></a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="pt-5 mt-5">
                    <Route exact path="/" render={() => (
                        <div>
                            <HomePage/>
                        </div>
                    )}/>
                    <Route exact path="/About" render={() => (
                        <div>

                        </div>
                    )}/>
                    <Route exact path="/signUp" render={() => (
                        <div>
                            <SignUp/>
                        </div>
                    )}/>
                    <Route exact path="/signIn" render={() => (
                        <div>
                            <SignIn/>
                        </div>
                    )}/>
                    <Route exact path="/CreateNewSurvey" render={() => (
                        <div>
                            <CreateNewSurvey/>
                        </div>
                    )}/>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage);
