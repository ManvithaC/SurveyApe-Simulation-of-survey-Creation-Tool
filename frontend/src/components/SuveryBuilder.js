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
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add-circle-outline';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
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
    width: '50%',
    maxWidth: 'none',
};
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};
var editor;

class SurveyBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minDate: null,
            maxDate: null,
            value24: null,
            open: false,
            snackBarOpen: false,
            imageChoice:[1],
            formData: '',
            surveyId: '',
            surveyName:'',
            ImageOptionType:1,
            ImageOptionsArray:[]
        };

    }

    handleOpen = () => {
        this.setState({
            open: true,
            ImageOptionsArray:[],
        });

    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleClick = () => {
        this.setState({
            snackBarOpen: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            snackBarOpen: false,
        });
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
            console.log(formData);
        }
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

        var options = {
            disableFields: ['autocomplete', 'button', 'paragraph', 'number', 'hidden', 'header', 'actionButtons','file'],
            showActionButtons: false
        };

        var editor_t = $("#editor_t").formBuilder({fields, templates});

        $("#editor_t").hide();

        editor = $("#editor").formBuilder(options);
        setTimeout(function () {
            editor.actions.setData(formData);
            //editor.actions.setData(options);
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
                this.setState({
                    surveyId:response.data.surveyId
                });
                swal("Save Successfull")
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    };

    addImageOption =() =>{

        var newInput = this.state.imageChoice;
        newInput.push(1);
        this.setState({
            imageChoice:newInput
        });
    }

    handleChange = (event, index, ImageOptionType) => {
        this.setState({ImageOptionType});
    }

    uploadTheImages = (event) =>{
        const payload = new FormData();
        payload.append("name",event.target.files[0].name);
        payload.append("file", event.target.files[0]);
        payload.append('username', this.state.username);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/uploadImage`, payload, axiosConfig)
            .then(response => {
                console.log("File Path "+response.data.UploadedFilePath);
                this.handleClick();
                var Images = this.state.ImageOptionsArray;
                Images.push(response.data.UploadedFilePath);
                this.setState({
                    ImageOptionsArray: Images
                })
            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
    }
    SaveImageQuestion =() =>{

        this.handleClose();

        var temp ={
            "type":"",
            "label":"",
            "name":this.refs.surveyQuestion.getValue(),
            "values":[]
        }
        if(this.state.ImageOptionType == '1'){

            this.state.ImageOptionsArray.map((image,index) =>(
                temp.values.push({
                    "value":"Option "+(index+1),
                    "label":'<img height=70 width=70 src="'+image+'"/>'
                })
            ))
            var ImageOptionTypeToAdd={
                "type":"checkbox-group",
                "label":temp.name,
                "name":"Checkbox Group",
                "values":temp.values
            }

            //console.log('Json To add to Survey Builder'+ JSON.stringify(ImageOptionTypeToAdd));
        }
        else if (this.state.ImageOptionType == '2'){
            this.state.ImageOptionsArray.map((image,index) =>(
                temp.values.push({
                    "value":"Option "+(index+1),
                    "label":'<img height=70 width=70 src="'+image+'"/>'
                })
            ))
            var ImageOptionTypeToAdd={
                "type":"radio-group",
                "label":temp.name,
                "name":temp.name,
                "values":temp.values
            }

        }

        var alreadyBuiltForm = JSON.parse(editor.actions.getData('json'));
       alreadyBuiltForm.push(ImageOptionTypeToAdd);
        editor.actions.setData(JSON.stringify(alreadyBuiltForm));

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
                onClick={this.SaveImageQuestion}
            />,
        ];
        return (
            <div>
                <div class="row justify-content-end">
                    <TextField
                        hintText="Enter Survey Name"
                        maxLength="20"
                        ref="surveyName"

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
                        style={{'margin-top': '24px', 'margin-right': '5px'}}
                        textFieldStyle={{'width': '150px'}}
                    />
                    <RaisedButton label="Save" style={styles}
                                  onClick={this.saveTheForm}
                    />
                    <RaisedButton label="Publish" style={styles} onClick={() => {
                        this.props.history.push({
                            pathname: '/ShareSurvey',
                            state: this.state.surveyId
                        })

                    }}/>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-10 mt-2">
                        <div id="editor"></div>
                        <div id="editor_t"></div>
                    </div>
                </div>
                <div class="row col-md-11 justify-content-end">
                    <RaisedButton label="Add Image Question" style={styles} onClick={this.handleOpen}></RaisedButton>
                </div>
                <Dialog
                    title="Image Choice Question"
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                ><div>
                    <div class="row">
                        <TextField
                            hintText="Enter Survey Question"
                            maxLength="50"
                            ref="surveyQuestion"
                            fullWidth={true}
                            style={{'margin-top':'14px','margin-right':'5px','margin-bottom':'10px'}}
                        />
                        <div class="Questrial" style={{'font-size': '15px'}}>Select Question Type</div>
                        <DropDownMenu
                            value={this.state.ImageOptionType}
                            onChange={this.handleChange}
                            style={styles.customWidth}
                            autoWidth={true}
                        >
                            <MenuItem value={1} primaryText="CheckBox"/>
                            <MenuItem value={2} primaryText="Radio Button"/>
                        </DropDownMenu>
                    </div>
                    <br/>
                    {
                        this.state.imageChoice.map((image,index)=>(
                            <div key={index}>
                                {index+1}. <input type="file" style={{'margin-bottom':'10px'}} onChange={this.uploadTheImages}/>
                            </div>
                        ))
                    }
                    <IconButton tooltip="Add Option" touch={true} tooltipPosition="bottom-right">
                        <ContentAdd onClick={()=>{this.addImageOption()}}/>
                    </IconButton>
                    {console.log("ImagesArray"+this.state.ImageOptionsArray)}
                    <Snackbar
                        open={this.state.snackBarOpen}
                        message="Image has been Added Successfully"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}
                    />

                </div>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(SurveyBuilder);