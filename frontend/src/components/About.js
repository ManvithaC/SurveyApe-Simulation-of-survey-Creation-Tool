import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import about from '../images/about.jpg';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';
class About extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div class="row">
                    <div class="col-md-5 ml-5">
                        <img src={about} alt="Card image cap"/>
                    </div>
                    <div class="col-md-6 pt-5 mt-5 Questrial" style={{'color':'#424242','font-size':'1.5em'}}>
                        <b>SurveyApe</b> allows surveyors to create surveys with different types of questions, makes them available to surveyees to take, and gathers and reports the results.
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(About);
