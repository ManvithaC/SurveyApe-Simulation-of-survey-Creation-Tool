import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as $ from "jquery";
import axios from "axios/index";
import '../css/surveys.css';
import swal from "sweetalert";
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {FlatButton, TextField} from "material-ui";

const ROOT_URL = 'http://localhost:8080';
const customContentStyle = {
    width: '50%',
    maxWidth: 'none',
};
const styles = {
    customWidth: {
        width: 150,
    },
};
window.jQuery = $;
window.$ = $;
require('jquery-ui-sortable');
require('formBuilder');
require('formBuilder/dist/form-render.min');

class RenderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyID: 0,
            formData: '',
            open: false,
            value: 1,
            isEmail:false,
        }
    }

    componentWillMount() {
        //     console.log('surveyId in UniqueLink--' + this.props.match.params.surveyId);

        //TODO:Call to backend to retrieve the JSON for form-building


        this.setState({
            surveyID: JSON.stringify(this.props.location.state.surveyId.surveyId),
        });

    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleChange = (event, index, value) => {
        this.setState({value});
        if(value){
            this.setState({isEmail:true})
        }

    }
    componentDidMount() {
        this.setState({
            surveyID: JSON.stringify(this.props.location.state.surveyId.surveyId),
        });

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        var temp = {
            'surveyId': JSON.stringify(this.props.location.state.surveyId.surveyId)
        };

        //var form;
        var originalFormData;
        var field;
        var t = JSON.stringify(this.props.location.state.surveyId.surveyId);
        //    alert(JSON.stringify(this.props.location.state.surveyId.surveyId));
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/renderSurvey`, {'surveyId': JSON.stringify(this.props.location.state.surveyId.surveyId)}, axiosConfig)
            .then(response => {
                console.log(response);
                ;(function ($) {
                    var fbRender = document.getElementById("fb-render"),
                        //  formData = '[{"type":"checkbox-group","label":"Checkbox Group","name":"checkbox-group-1525469493377","values":[{"label":"Option 1","value":"option-1","selected":true}]},{"type":"date","label":"Date Field","className":"form-control","name":"date-1525469494997"}]';
                        formData = JSON.stringify(response.data);
                    originalFormData = (response.data);
                    var formRenderOpts = {
                        formData: formData,
                        dataType: "json"
                    };
                    let fields = [{
                        label: 'Star Rating',
                        attrs: {
                            type: 'starRating'
                        },
                        icon: '⭐'
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
                        }
                    };
                    $(fbRender).formRender(formRenderOpts);
                    document.getElementById('get-formdata').onclick = function () {

                        var formData = new FormData(fbRender);
                        function getObj(objs, key, val) {
                            val = val.replace('[]', '');
                            return objs.filter(function (obj) {
                                var filter = false;
                                if (val) {
                                    filter = (obj[key] === val);
                                } else if (obj[key]) {
                                    filter = true;
                                }
                                return filter;
                            });
                        }

                        function setValue(name, value) {
                            field = getObj(originalFormData, 'name', name)[0];
                            if (!field) {
                                return;
                            }
                            if (['select', 'checkbox-group', 'radio-group'].indexOf(field.type) !== -1) {
                                for (var fieldOption of field.values) {
                                    if (value.indexOf(fieldOption.value) !== -1) {
                                        fieldOption.selected = true;
                                    }
                                }
                            } else {

                                //    alert("insied the text value");
                                //    alert(value);
                                field.value = value;
                            }
                        }

                        for (var key of formData.keys()) {
                            setValue(key, formData.getAll(key));
                        }
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                "Access-Control-Allow-Origin": true
                            }
                        };
                        var payload = {data: originalFormData};
                        console.log(payload);
                        axios.create({withCredentials: true})
                            .post(`${ROOT_URL}/submitsurvey/` + t, payload, axiosConfig)
                            .then(response => {
                                swal("successfully submited");
                                console.log(response);
                            })
                            .catch(error => {
//                                swal("got error");
                                console.log(error);
                            });
                        console.log('Updated formData: ', originalFormData);
                    };
                })($);
            })
            .catch(error => {
                console.log(error);
            });

    }

    submitForm =() => {
        console.log("Do you want to get a confirmation mail?"+this.state.value);//true for yes and false for no

        swal("All done","A confirmation email has been sent.","success");
        this.setState({open:false});
        this.props.history.push("/Surveys");
    }

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
                onClick={this.submitForm}
            />,
        ];
        return (
            <div>
                <div className="row  justify-content-center Questrial">
                    <h2 style={{'text-align': 'center', 'color': '#424242'}}>Survey Number :{this.state.surveyID}</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 surveyBoxUniqueSurvey">
                        <form id="fb-render"></form>
                        <div className={"row justify-content-center"}>
                            {/*<RaisedButton className={"Questrial"}*/}
                                          {/*id="save-formdata"  style={{'padding': '10px', 'margin': '10px'}}>Save</RaisedButton>*/}
                            <RaisedButton className={"Questrial"} style={{'padding': '10px', 'margin': '10px'}}
                                          id="get-formdata" onClick={this.handleOpen}>Submit</RaisedButton>

                        </div>
                    </div>
                </div>
                <Dialog
                    title="Yay! Thanks for Submitting the survey"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                    <label>Do you want to get a confirmation mail?</label>
                    <div>
                        <SelectField
                            floatingLabelText="Select"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={null} primaryText="" />
                            <MenuItem value={false} primaryText="No" />
                            <MenuItem value={true} primaryText="Yes" />
                        </SelectField>
                    </div>
                    {
                        this.state.isEmail?(
                            <TextField
                                hintText="Enter Email ID"
                                fullWidth={true}
                                ref="EmailId"
                            />
                        ):''
                    }
                </Dialog>
            </div>

        )
    }
}

export default withRouter(RenderForm);