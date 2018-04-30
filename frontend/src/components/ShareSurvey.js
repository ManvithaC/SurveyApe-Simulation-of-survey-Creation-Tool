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
            SurveyURL:"https://surveyape.com/r/E8R5HH"
        }
    }
    handleChange = (event, index, value) => this.setState({value});

    addSurveyees = () =>{
        var email = this.refs.SurveyeeField.getValue();
        // console.log('got the email'+this.refs.SurveyeeField.getValue());
        emailList.push(email);
        this.setState({SurveyeesEmail:emailList});
    }

    render(){
        return (
            <div>
                <div class="row start pl-5 ml-3 mt-1">
                    <div class="Questrial" style={{'font-size':'30px'}}>Select Survey Type </div>
                    <DropDownMenu
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={styles.customWidth}
                        autoWidth={true}
                    >
                        <MenuItem value={1} primaryText="Open Survey" />
                        <MenuItem value={2} primaryText="Closed Survey" />
                        <MenuItem value={3} primaryText="Weeknights" />
                    </DropDownMenu>
                </div>
                <div class="row pt-3 justify-content-center typeOfSurvey">
                    {
                        this.state.value =='1'?(
                            <div>
                                <h3 className='Questrial'>Open Survey</h3>
                                <div>The Link to Share is <span>
                                    <a class="surveyURL ml-2" href={this.state.SurveyURL}>{this.state.SurveyURL}</a>
                                </span> </div>
                            </div>
                        ):''
                    }
                    {
                        this.state.value == '2' ? (
                            <div>
                                <div>
                                    <h3 className='Questrial'>Closed Survey</h3>
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
                    this.state.value == '2' ? (
                        <div class="row justify-content-center">
                            <div class="col-md-4">
                                <Paper zDepth={2}>
                                    <div class="p-3">
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
                        </div>):''
                }
            </div>

        )
    }
}

export default withRouter(ShareSurvey);
