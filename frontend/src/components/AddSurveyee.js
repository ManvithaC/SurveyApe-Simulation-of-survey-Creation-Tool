import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/sharesurvey.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import swal from 'sweetalert';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8080';


const styles = {
    customWidth: {
        width: 200,
    },
};

const emailList = [];

class AddSurveyee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SurveyeesEmail: [],
        }
    }

    componentDidMount() {
        this.setState({SurveyeesEmail: []});
    }

    addSurveyees = () => {
        var email = this.refs.SurveyeeField.getValue();
        emailList.push(email);
        this.setState({SurveyeesEmail: emailList});
    }

    updateSurveyeesList = () => {
        console.log("Surveyees List" + this.state.SurveyeesEmail);

        //TODO:Backend call to update the Surveyees List


        swal({
            icon: "success",
            text: "Surveyees List Updated Successfully!",
            closeModal: true,
        });

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        var toSendJSON = {
            surveyId: this.props.location.state.surveyId,
            SurveyeesEmail:this.state.SurveyeesEmail,
            SendVia:"link"
        };
        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/addInvites`, toSendJSON, axiosConfig)
            .then(response => {
                this.setState({'progress': false});
                swal("Invitations sent");
                this.props.history.push("/Surveys");
            })
            .catch(error => {
                console.log(error);
            });

        this.props.history.push("/Surveys");
    };

    render() {
        return (
            <div>

                <div class="row pt-3 justify-content-center typeOfSurvey">
                    <div>
                        <div>
                            <h3 className='Questrial'>Add Surveyees</h3>
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
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <Paper zDepth={2}>
                            <div class="p-5">
                                <h3 className='Questrial'>Surveyees List</h3>
                                <Divider/>
                                {this.state.SurveyeesEmail.map((elem, index) => (
                                    <div class="row">
                                        <span>{index + 1}.</span>
                                        <span>{elem}</span>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </div>
                    <div class="col-md-2">
                        <RaisedButton label="Update Surveyees List" onClick={this.updateSurveyeesList} fullWidth={true}
                                      className={"mb-3"} primary={true}/>
                    </div>
                </div>
                )
            </div>

        )
    }
}

export default withRouter(AddSurveyee);
