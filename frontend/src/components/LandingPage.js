import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/landingpage.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import HomePage from './HomePage';
import UserAccount from './UserAccount';
import Team from './Team';
import Surveys from "./Surveys";
import SurveyBuilder from "./SuveryBuilder";
import ShareSurvey from "./ShareSurvey";
import TakeSurvey from "./TakeOpenSurvey";
import UniqueLinkSurvey from "./UniqueLinkSurvey";
import About from "./About";
import swal from 'sweetalert';
import EditSurvey from "./EditSurvey";
import CodeVerify from "./CodeVerify";
import AddSurveyee from "./AddSurveyee";
import Radium, {StyleRoot} from 'radium';
import {slideInRight, slideInLeft, fadeInUp,fadeIn,fadeInDown} from 'react-animations';
import Stats from "./Stats";

const styles = {
    slideInRight: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(slideInRight, 'slideInRight'),
    },
    slideInLeft: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(slideInLeft, 'slideInLeft'),
    },
    fadeInUp: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeInDown: {
        animation: 'x 0.8s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
    },
    fadeIn: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    }
}

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
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {
                                    this.props.history.push("/SurveyBuilder");
                                }}><button class="signupnav">CREATE A SURVEY</button></a>
                            </li>
                            <li className="nav-item mynav ">
                                <a className="nav-link pointer signIn" style={{'font-size':'1em','color':'black'}} onClick={() => {console.log('User Account');
                                }}><UserAccount/></a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="pt-5 mt-5">
                    <Route exact path="/" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <HomePage/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/signUp" render={() => (
                        <StyleRoot>
                            <div className="fadeInUp" style={styles.fadeInUp}>
                                <SignUp/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/signIn" render={() => (
                        <StyleRoot>
                            <div className="fadeInDown" style={styles.fadeInDown}>
                                <SignIn/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/Surveys" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <Surveys/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/SurveyBuilder" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <SurveyBuilder/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/ShareSurvey" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <ShareSurvey/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path='/takeSurvey/:type/:surveyId' render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <TakeSurvey {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path='/takeSurvey/u/:surveyId' render={(props) => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <UniqueLinkSurvey {...props}/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/Team" render={() => (
                        <StyleRoot>
                            <div className="slideInRight" style={styles.slideInRight}>
                                <Team/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/editSurvey" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <EditSurvey/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/About" render={() => (
                        <StyleRoot>
                            <div className="slideInRight" style={styles.slideInRight}>
                                <About/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/AccountVerify" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <CodeVerify/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/AddSurveyee" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <AddSurveyee/>
                            </div>
                        </StyleRoot>
                    )}/>
                    <Route exact path="/Stats" render={() => (
                        <StyleRoot>
                            <div className="fadeIn" style={styles.fadeIn}>
                                <Stats/>
                            </div>
                        </StyleRoot>
                    )}/>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage);
