import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import * as $ from 'jquery';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import swal from 'sweetalert';
import axios from 'axios';
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');
require('rateyo/min/jquery.rateyo.min');
require('rateyo/min/jquery.rateyo.min.css');


const ROOT_URL = 'http://localhost:8080';

const styles = {
    margin: 12,
};

const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};
const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
};

var editor;

class SurveyBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: null,
            maxDate: null,
            value24:null,
            open: false,
            imageChoice:[],
            formData: '',
            surveyId: '',
            surveyName:''
        };

    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        var form;
        var formData;
        if (this.props.location.state) {
            form = [];
            this.setState({
                surveyId: this.props.location.state.surveyId
            });
            formData = JSON.stringify(this.props.location.state.data);
        }
        let fields = [{
            label: 'Star Rating',
            attrs: {
                type: 'starRating'
            },
            icon: '🌟'
        },
            {
                label: 'Image Choices',
                attrs: {
                    type: 'ImageChoice'
                },
                icon: '🏞'
            }

        ];

        let templates;
        templates = {
            starRating: function (fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function () {
                        $(document.getElementById(fieldData.name)).rateYo({
                            rating: 3.5
                        });
                    }
                };
            },
            ImageChoice: function (fieldData) {
                return {
                    field: '<span id="' + fieldData.name + '">',
                    onRender: function () {
                        $(document.getElementById(fieldData.name)).text('hi');
                    }
                };
            }
        };

        var options = {
            disableFields: ['autocomplete', 'button', 'paragraph', 'number', 'hidden', 'header', 'actionButtons'],
            showActionButtons: false
        };
        //TODO:Below code works for star rating
        editor = $("#editor").formBuilder(options);

        //TODO:Below code works for options
        //editor = $("#editor").formBuilder(options);

        setTimeout(function () {
            editor.actions.setData(formData);
        }, 50);
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

    saveTheForm = () => {
        let surveydata = editor.actions.getData('json');
        alert(surveydata);
        console.log(surveydata);
        let payload = {};
        let data = JSON.parse(surveydata);
        payload.questions = data;
        payload.surveyName = this.refs.surveyName.getValue();
        payload.surveyType = "";
        payload.isOpen = 1;
        var ts = Date.parse(this.state.minDate);
        //time stamp in milli seconds.
        payload.expiry = ts / 1000;
        payload.isPublished = 0;
        if (this.state.surveyId != '') {
            payload.surveyId = this.state.surveyId
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/survey`, payload, axiosConfig)
            .then(response => {
            })
            .catch(error => {
                swal("got error");
                console.log(error);
            });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div>
                <div class="row justify-content-end">
                    <TextField
                        hintText="Enter Survey Name"
                        maxLength="20"
                        ref="surveyName"
                        value={this.state.surveyName}
                        style={{'margin-top': '24px', 'margin-right': '5px'}}
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
                                  onClick={this.saveTheForm}
                    ></RaisedButton>
                    <RaisedButton label="Publish" style={styles} onClick={() => {
                        this.props.history.push("/ShareSurvey");
                    }}></RaisedButton>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-10 mt-2">
                        <div id="editor"></div>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <RaisedButton label="Add Image Question" style={styles} onClick={this.handleOpen}></RaisedButton>
                </div>
                <Dialog
                    title="Image Choice Question"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                ><div>
                    <TextField
                        hintText="Enter Survey Question"
                        maxLength="50"
                        ref="surveyQuestion"
                        fullWidth={true}
                        style={{'margin-top':'24px','margin-right':'5px'}}
                    /><br/>
                    <input type="file" Place/><br/>

                </div>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(SurveyBuilder);