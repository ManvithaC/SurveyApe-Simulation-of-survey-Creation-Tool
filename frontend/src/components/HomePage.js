import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/landingpage.css';
import homepage from '../images/homepage.jpg';
import SignUp from './SignUp';
import SignIn from './SignIn';
import inspire from '../images/inspire.jpg';
import collect from '../images/collect.jpg';
import share from '../images/share.jpg';
import $ from 'jquery';
import {jQuery} from 'jquery';

class BalloonPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var terms = ["logo designs", "favourite colors", "favourite textures"];

        function rotateTerm() {
            var ct = $("#rotate").data("term") || 0;
            $("#rotate").data("term", ct == terms.length - 1 ? 0 : ct + 1).text(terms[ct]).fadeIn()
                .delay(1300).fadeOut(200, rotateTerm);
        }

        $(rotateTerm);
    }


    render() {
        return <div>
            <div className="row">
                <div className="col-lg-7 ml-5" id="myVideo">
                    <img src={homepage}/>
                </div>
            </div>
            <div class="row justify-content-end">
                <div className="col-lg-5 mt-5">
                    <div className="mt-5 ">
                        <button className="ybutton Questrial mt-5" style={{"font-size": "1.5em"}} onClick={() => {
                            this.props.history.push("/signUp");
                        }}>SIGN UP
                        </button>
                        <br/>
                        <button className="ybutton Questrial" style={{"font-size": "1.5em"}} onClick={() => {
                            this.props.history.push("/signIn");
                        }}>SIGN IN
                        </button>
                    </div>
                </div>
            </div>

            <main role="main">

                <section className="jumbotron Questrial" style={{"background": "transparent"}}>
                    <div className="container" style={{"padding": "50px;"}}>

                        <h1 style={{
                            "color": "#424242",
                            "padding-top": "30px",
                            "text-align": "right",
                            "font-size": "3em"
                        }}>Get that Inspiration.
                        </h1>
                        <p style={{"text-align":"right","font-size": "25px"}}>Share your <span id="rotate" style={{"text-shadow": "black 0px 0px 0.1px"}}>this</span></p>
                    </div>
                </section>

                <div style={{"background-color": "#fff"}}>
                    <div className="container"
                         style={{"padding-top": "55px", "padding-bottom": "70px", "margin-top": "100px"}}>
                        <div>
                            <div id="whyMotbaord" className="container indexZ">
                                <div className="row justify-content-start">
                                    <div className="mr-5 mb-5 Questrial inspired-text">
                                        How do I get Inspired?
                                    </div>
                                    <br/>
                                </div>
                                <div className="row justify-content-center">

                                    <div className="card cardboxBottom cardbox mr-5 Questrial cardboxWidth"
                                         style={{"width": "20rem"}}>
                                        <img className="card-img-top" src={collect} alt="Card image cap"/>
                                        <div className="card-body">
                                            <p className="card-text" style={{"text-align": "center"}}>Get access to people powered data, at scale and in real time. Discover insights and new ideas to drive your business forward.</p>
                                        </div>
                                    </div>

                                    <div className="card cardboxBottom mr-5 cardbox Questrial cardboxWidth"
                                         style={{"width": "20rem"}}>
                                        <img className="card-img-top" src={share} alt="Card image cap"/>
                                        <div className="card-body">
                                            <p className="card-text" style={{"text-align": "center"}}>Get an easy, safe way to collect, review, and select the best candidates for grants, scholarships, and more.</p>
                                        </div>
                                    </div>

                                    <div className="card cardboxBottom mr-5 cardbox Questrial cardboxWidth"
                                         style={{"width": "20rem"}}>
                                        <img className="card-img-top" src={inspire} alt="Card image cap"/>
                                        <div className="card-body">
                                            <p className="card-text" style={{"text-align": "center"}}>Create a high-performance culture by truly understanding and acting on employee engagement.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>

            <footer>
                <div className="row justify-content-center footercss">
                    <div className="row mt-5">CMPE 275 Project - SPRING 2018</div>
                </div>
            </footer>
        </div>
    }
}

export default withRouter(BalloonPage);
