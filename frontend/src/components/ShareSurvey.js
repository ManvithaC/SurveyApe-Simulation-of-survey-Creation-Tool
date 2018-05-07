import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../css/sharesurvey.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import axios from 'axios';
const ROOT_URL = 'http://localhost:8080';

const styles = {
    customWidth: {
        width: 200,
    },
};

const emailList = [];
class ShareSurvey extends Component{
    constructor(props){
        super(props);
        this.state={
            SurveyType : 'open',
            SurveyeesEmail:[],
            value: 0,
            SurveyURL:"E8R5HH"
        }
    }


    componentDidMount(){
        console.log('Routerrrr'+this.props.location.search);
    }
    handleChange = (event, index, value) => {
        this.setState({value});
        this.setState({SurveyeesEmail:[]});
    }


    addSurveyees =()=>{
        var email = this.refs.SurveyeeField.getValue();
        emailList.push(email);
        this.setState({SurveyeesEmail:emailList});
    }

    addLinkSurveyees = () =>{

        var surveyType;
        if(this.state.value == '1'){
            surveyType = 'General Survey'
        }
        else if (this.state.value == '2'){
            surveyType = 'Closed Survey'
        }
        else if (this.state.value == '3'){
            surveyType = 'Open Unique Survey'
        }
        var toSendJSON = {
            'SurveyType' : surveyType,
            'SendVia' : 'link',
            'SurveyeesEmail':this.state.SurveyeesEmail,
            'surveyId':this.props.location.state
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/generalSurvey`,toSendJSON, axiosConfig)
            .then(response => {
                //  console.log(response);

            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });




        console.log(toSendJSON);
    };

    addQRCodeSurveyees = () =>{

        var surveyType;
        if(this.state.value == '1'){
            surveyType = 'General Survey'
        }
        else if (this.state.value == '2'){
            surveyType = 'Closed Survey'
        }
        else if (this.state.value == '3'){
            surveyType = 'Open Unique Survey'
        }

        var toSendJSON = {
            'SurveyType' : surveyType,
            'SendVia' : 'QRCode',
            'SurveyeesEmail':this.state.SurveyeesEmail,
            'surveyId':this.props.location.state
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/generalSurvey`,toSendJSON, axiosConfig)
            .then(response => {
                //  console.log(response);

            })
            .catch(error => {
                //swal("got error");
                console.log(error);
            });
        console.log(toSendJSON);
    }

    render(){
        return (
            <div>
                    <div class="row start pl-5 ml-3 mt-1">
                        <div class="Questrial" style={{'font-size': '30px'}}>Select Survey Type</div>
                        <DropDownMenu
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={styles.customWidth}
                            autoWidth={true}
                        >
                            <MenuItem value={1} primaryText="General Survey"/>
                            <MenuItem value={2} primaryText="Closed Survey"/>
                            <MenuItem value={3} primaryText="Open Unique Survey"/>
                        </DropDownMenu>
                    </div>

                <div class="row pt-3 justify-content-center typeOfSurvey">
                    {
                        this.state.value =='3'?(
                            <div>
                                <h3 className='Questrial'>Open Unique Survey</h3>
                                <div>The Link to Share is <span>
                                    <a class="surveyURL ml-2" href={this.state.SurveyURL}>{this.state.SurveyURL}</a>
                                </span> </div>
                            </div>
                        ):''
                    }
                    {
                        this.state.value == '2' || this.state.value == '1' ? (
                            <div>
                                <div>

                                    <h3 className='Questrial'>
                                        {
                                            this.state.value == '1'?'General Survey':'Closed Survey'

                                        }
                                    </h3>
                                    <div className="mr-5 pr-5 pb-1">
                                        <TextField
                                            hintText="Add Email"
                                            fullWidth={true}
                                            ref="SurveyeeField"
                                        />
                                    </div>
                                    <RaisedButton label="Add Surveyee" onClick={this.addSurveyees} fullWidth={true}/>
                                </div>
                            </div>
                        ) : ''
                    }
                </div>
                {
                    this.state.value == '2' || this.state.value == '1'  ? (
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <Paper zDepth={2}>
                                    <div class="p-5">
                                        <h3 className='Questrial'>Surveyees List</h3>
                                        <Divider />
                                        {this.state.SurveyeesEmail.map((elem, index) => (
                                            <div class="row">
                                                <span>{index+1}.</span>
                                                <span>{elem}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            </div>
                            <div class="col-md-2">
                                <RaisedButton label="Send link in Email" onClick={this.addLinkSurveyees} fullWidth={true} className={"mb-3"} primary={true}/>
                                <RaisedButton label="Send QR Code in Email" onClick={this.addQRCodeSurveyees} fullWidth={true} className={"mb-3"} primary={true}/>
                            </div>
                        </div>):''
                }
            </div>

        )
    }
}

export default withRouter(ShareSurvey);
