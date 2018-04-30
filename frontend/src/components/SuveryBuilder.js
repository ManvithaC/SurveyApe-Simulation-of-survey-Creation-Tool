import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as $ from 'jquery';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');

const styles = {
    margin: 12,
};

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};
class SurveyBuilder extends Component{
    constructor(props){
        super(props);

        this.state = {
            minDate: null,
            maxDate: null,
            value24:null,
        };

    }

    componentDidMount(){
        var formData = '[{"type":"text","label":"Survey Name","subtype":"text","className":"form-control","name":"text-1476748004559"}]';
        var fields = [{
            label: 'Star Rating',
            attrs: {
                type: 'starRating'
            },
            icon: '🌟'
        }];

        var templates = {
            starRating: function(fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function() {
                        $(document.getElementById(fieldData.name)).rateYo({
                            rating: 3.5
                        });
                    }
                };
            }
        };

        var options = {
            disableFields: ['autocomplete','button','paragraph','number'],
        };

        let ed = $("#editor").formBuilder({fields,templates,options});
        setTimeout(function(){ ed.actions.setData(formData); }, 50);
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
    render() {
        return (
            <div>
                <div class="row justify-content-end">
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
                    <RaisedButton label="Save" style={styles}></RaisedButton>
                    <RaisedButton label="Publish" style={styles} ></RaisedButton>
                </div>
            <div>
                <div id="editor"></div>
            </div>
            </div>
        );
    }
}

export default withRouter(SurveyBuilder);