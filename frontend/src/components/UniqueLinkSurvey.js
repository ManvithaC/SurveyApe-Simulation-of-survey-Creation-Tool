import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as $ from "jquery";
import axios from "axios/index";
import '../css/surveys.css';

const ROOT_URL = 'http://localhost:8080';

window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');
require('formBuilder/dist/form-render.min');

class UniqueLinkSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyID: 0,
            formData: ''
        }
    }

    componentWillMount() {
        console.log('surveyId in UniqueLink--' + this.props.match.params.surveyId);
        this.setState({
            surveyID: this.props.match.params.surveyId,
        });


        //TODO:Call to backend to retrieve the JSON for form-building
    }

    componentDidMount() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        var temp = {
            'surveyId': this.props.match.params.surveyId
        };
        //var form;
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/renderSurvey`, temp, axiosConfig)
            .then(response => {
                ;(function ($) {
                    var fbRender = document.getElementById("fb-render"),
                      //  formData = '[{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1525469493377","values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1525469494997"}]';
                    formData=JSON.stringify(response.data);
                    var formRenderOpts = {
                        formData,
                        dataType: "json"
                    };
                    $(fbRender).formRender(formRenderOpts);
                })($);
            })
            .catch(error => {
                console.log(error);
            });

        // ;(function ($) {
        //     var fbRender = document.getElementById("fb-render"),
        //         formData = '[{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1525469493377","values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1525469494997"}]';
        //     //formData=this.state.formData;
        //
        //     var formRenderOpts = {
        //         formData,
        //         dataType: "json"
        //     };
        //     $(fbRender).formRender(formRenderOpts);
        // })($);

    }

    render() {
        return (
            <div>
                <div className="row  justify-content-center">
                    <h2 style={{'text-align': 'center', 'color': '#424242'}}>Survey Number :{this.state.surveyID}</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 surveyBoxUniqueSurvey">
                        <form id="fb-render"></form>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(UniqueLinkSurvey);
