import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import '../css/createSurvey.css';
const styles = {
    margin: 12,
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    customContentStyle : {
        width: '50%',
        maxWidth: 'none',
    }
};


class CreateNewSurvey extends Component{
    constructor(props){
        super(props);
        this.state={
            radioButton:false,
            dialogSelection: false,
            radioButtonArray:[{
                value:1,
                label:'<input type={"text"} placeholder={"Option1"} class={"AnswerInput"}></input>'
            }],
        };

    }
    dialogSelectionOpen = () => {
        this.setState({dialogSelection: true});
    };

    dialogSelectionClose = () => {
        this.setState({dialogSelection: false});
    };
    getSelectedQType = (event) =>{
        this.setState({dialogSelection: false});
        //console.log("Selected q type" + event.target.value);
        var QType= event.target.value;
        switch(QType){
            case 'Radio': this.createRadioButtonQuestion();
        }

    }
    createRadioButtonQuestion = () =>{
        this.setState({radioButton:true});
    };
    saveSurvey=()=>{
        var SurveyJson={
            "surveyType":"general",
            "isOpen":1,
            "expiray":"10-25-2018",
            "isPublished":1,
            "surveyorId":"Gets from session",
            "questions":[
                {
                    "questionType":"MCQ",
                    "questionDescription":"what are your goals",
                    "options":[
                        {
                            "value":"first option"
                        },
                        {
                            "value":"second option"
                        },
                        {
                            "value":"third option"
                        }
                    ]
                },
                {
                    "questionType":"text",
                    "questionDescription":"what is the prject",
                    "options":[]
                }

            ]

        }
    }
    render(){
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.dialogSelectionClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.dialogSelectionClose}
            />,
        ];
        return (
            <div>
                <div class="row justify-content-center">
                    <div class="col-md-7 ml-5 pl-5">
                        <input type="text" placeholder="Enter Survey Name" class="inputInCreateSurvey"></input>
                        <RaisedButton label="New Question" style={styles}
                            onClick={this.dialogSelectionOpen}>
                        </RaisedButton>
                        <RaisedButton label="Save" style={styles}
                                      onClick={this.saveSurvey}>
                        </RaisedButton>
                        <RaisedButton label="Publish" style={styles} ></RaisedButton>
                    </div>
                </div>
                <div style={{overflowY: 'auto'}}>
                    {
                        this.state.radioButton ? (
                            <div class="card-box QuestionBox">
                            <input type={"text"} placeholder="Enter your Question" class="QuestionInput"/><br/>
                                <div>
                                    <RadioButtonGroup name="Q1" defaultSelected="not_light">
                                        <RadioButton
                                            value={"Option"+this.state.radioButtonArray.length}
                                            label={<input type={"text"} placeholder={"Option1"+this.state.radioButtonArray.length} class={"AnswerInput"}></input>}
                                            style={styles.radioButton}
                                        />
                                    </RadioButtonGroup>
                                </div>
                            </div>

                        ):''
                    }
                </div>
                <div>
                    <Dialog
                        title="Dialog With Custom Width"
                        actions={actions}
                        modal={true}
                        contentStyle={styles.customContentStyle}
                        open={this.state.dialogSelection}
                    >

                        <RadioButtonGroup name="questionType" onChange={this.getSelectedQType}>
                            <RadioButton
                                value="Radio"
                                label="Radio"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Dropdown"
                                label="Dropdown List"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="Text"
                                label="Text"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </Dialog>
                </div>
            </div>

        )
    }
}

export default withRouter(CreateNewSurvey);
