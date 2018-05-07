import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import manvi from '../images/manvi.png';
import sanjay from '../images/sanjay.jpg';
import nikila from '../images/nikila.jpg';
import hari from '../images/hari.jpg';
import '../css/team.css';

class Team extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container" style={{"padding-bottom":"55px"}}>
                <div>
                    <div id="whyMotbaord" className="container indexZ">
                        <div className="row justify-content-end ">
                                <div>
                                    <p className="mr-5 mb-3 Questrial inspired" style={{'text-align':'center','font-size':'40px'}}>
                                        The brains behind surveyApe.
                                    </p>
                                </div>
                            <br/>
                        </div>
                        <div className="row justify-content-center">

                            <div className="card cardboxBottom mr-4 Questrial cardboxWidth" style={{"width": "15rem","border":"none"}}>
                                <img className="card-img-top bandw" style={{"border-radius": "50%"}} src={nikila} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{"text-align":"center","font-size":"30px","color":"#DBB747"}}>Nikhila</h5>
                                    <p className="card-text" style={{"text-align":"center"}}>Go ahead, get inspired. Think left and think right and think low and think high and of course, think diagonal! </p>
                                </div>
                            </div>

                            <div className="card cardboxBottom mr-4 Questrial cardboxWidth" style={{"width": "15rem","border":"none"}}>
                                <img className="card-img-top bandw" style={{"border-radius": "50%"}} src={manvi} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{"text-align":"center","font-size":"30px","color":"#DBB747"}}>Manvitha</h5>
                                    <p className="card-text" style={{"text-align":"center"}}>I am a digital nomad passionate about web development.I am always inspired by random things like the precision of spider web, beautiful sunrise and motivational quotes.</p>
                                </div>
                            </div>

                            <div className="card cardboxBottom  mr-4 Questrial cardboxWidth" style={{"width": "15rem","border":"none"}}>
                                <img className="card-img-top bandw" style={{"border-radius": "50%"}} src={sanjay} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{"text-align":"center","font-size":"30px","color":"#DBB747"}}>Sanjay</h5>
                                    <p className="card-text" style={{"text-align":"center"}}>Go ahead, get inspired. Think left and think right and think low and think high and of course, think diagonal! </p>
                                </div>
                            </div>

                            <div className="card cardboxBottom mr-4 Questrial cardboxWidth" style={{"width": "15rem","border":"none"}}>
                                <img className="card-img-top bandw" style={{"border-radius": "50%"}} src={hari} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{"text-align":"center","font-size":"30px","color":"#DBB747"}}>Hari Krishna</h5>
                                    <p className="card-text" style={{"text-align":"center"}}>Go ahead, get inspired. Think left and think right and think low and think high and of course, think diagonal! </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Team);