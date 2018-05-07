import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as $ from 'jquery';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');
require('rateyo/min/jquery.rateyo.min');
require('rateyo/min/jquery.rateyo.min.css');

const styles = {
    margin: 12,
};

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};
var editor;
class EditSurvey extends Component{
    constructor(props){
        super(props);

        this.state = {
            minDate: null,
            maxDate: null,
            value24:null,
        };

    }

    componentDidMount(){
        //TODO:Need to add a backend call that gets the data of the form to be edited
        //TODO:Fill the survey name text input with value
        //TODO:Fill the expiry values based on the json that is retrieved from backend
        ;(function($) {
            var fbRender = document.getElementById("fb-render"),
                formData =
                    '[{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1525469493377","values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1525469494997"}]';

            var formRenderOpts = {
                formData,
                dataType: "json"
            };

            $('#fb-edit').formBuilder(formRenderOpts);
        })($);

    }

    handleChangeMinDate = (event, date) => {
        this.setState({
            minDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
            maxDate: date,
        });
    };

    handleChangeTimePicker24 = (event, date) => {
        this.setState({value24: date});
    };
    EditTheForm = () =>{
        console.log('surveyName: '+this.refs.surveyName.getValue());
        alert(editor.actions.getData('json'));
    }
    render() {
        return (
            <div>
                <div class="row justify-content-end">
                    <TextField
                        hintText="Enter Survey Name"
                        maxLength="20"
                        ref="surveyName"
                        style={{'margin-top':'24px','margin-right':'5px'}}
                    />
                    <DatePicker
                        onChange={this.handleChangeMinDate}
                        autoOk={true}
                        floatingLabelText="Pick Expiry Date"
                    />
                    <TimePicker
                    autoOk={true}
                    format="24hr"
                    hintText="Pick Expiry Time"
                    value={this.state.value24}
                    onChange={this.handleChangeTimePicker24}
                    defaultTime={null}
                    style={{'margin-top':'24px','margin-right':'5px'}}
                    textFieldStyle={{'width':'150px'}}
                    />
                    <RaisedButton label="Save" style={styles}
                        onClick={this.EditTheForm}
                    ></RaisedButton>
                    <RaisedButton label="Publish" style={styles} onClick={() => {
                        this.props.history.push("/ShareSurvey");}}></RaisedButton>
                </div>
            <div class="row justify-content-center">
                <div class="col-md-10 mt-2">
                    <form id="fb-edit"></form>
                </div>
            </div>
            </div>
        );
    }
}

export default withRouter(EditSurvey);