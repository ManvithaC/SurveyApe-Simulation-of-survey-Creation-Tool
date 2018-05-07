import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/surveys.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import AddSurveyee from 'material-ui/svg-icons/social/group-add';

const style = {
    marginLeft: 250,
    textAlign: 'right',
};

const styleAdd ={
    height: 30,
    width:30,
    color:'#424242',
    marginLeft:10,
}

class Surveys extends Component{
    constructor(props){
        super(props);
        this.state={
            surveysCreated:[
                {
                    name : 'Customer Feedback',
                    expiryDate:'06-06-2018',
                    status:'published'
                },
                {
                    name : 'Interview Feedback',
                    expiryDate:'06-06-2018',
                    status:'Saved'
                }
            ],
            surveysToSubmit:[
                {
                    name : 'SJSU Library Feedback',
                    expiryDate:'06-07-2018',
                    status:'Saved'
                },
                {
                    name : 'Event Feedback',
                    expiryDate:'06-05-2018',
                    status:'Submitted'
                }
            ],
        }
    }

    render(){
        return (
            <div>
                <div class="row">
                    <div class="col-md-5 surveyBox">
                        <h4 class="Questrial">Created Surveys</h4>
                        <hr style=
                                {{'width':'50%','textAlign':'center'}}/>
                        {
                            this.state.surveysCreated.map((card, index) => (
                                <div className="EachSurveyBox">
                                    <div class="row">
                                        <b><div className="Questrial" style={{'font-size':'20px'}}>{card.name}</div></b>
                                        {
                                            card.status == 'Saved' ? (
                                                <FloatingActionButton mini={true}
                                                                      style={style}
                                                >
                                                    <ContentEdit />
                                                </FloatingActionButton>
                                            ) : (
                                                <FloatingActionButton mini={true}
                                                                      style={style}
                                                                      disabled={true}
                                                >
                                                    <ContentEdit />
                                                </FloatingActionButton>
                                            )
                                        }
                                        {
                                            card.status == 'published' ? (
                                                <AddSurveyee style={styleAdd}
                                                             className={"pointer"}
                                                             onClick={() => {
                                                                 this.props.history.push("/AddSurveyee");
                                                             }}
                                                />) : ''
                                        }
                                    </div>
                                    <div class="row">
                                        <p className="Questrial" style={{'font-size':'15px'}}>Expiry: {card.expiryDate}</p>
                                        <div className="Questrial ml-5" style={{'font-size':'15px'}}>Status: <b>{card.status}</b></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div class="col-md-5 surveyBox">
                        <h4 class="Questrial">Submitted Surveys</h4>
                        <hr style=
                                {{'width':'50%','textAlign':'center'}}/>
                        {
                            this.state.surveysToSubmit.map((card, index) => (
                                <div className="EachSurveyBox">
                                    <div class="row">
                                        <b><div className="Questrial" style={{'font-size':'20px'}}>{card.name}</div></b>
                                        {
                                            card.status == 'Saved' ? (
                                                <FloatingActionButton mini={true}
                                                                      style={style}
                                                >
                                                    <ContentEdit />
                                                </FloatingActionButton>
                                            ) : (
                                                <FloatingActionButton mini={true}
                                                                      style={style}
                                                                      disabled={true}
                                                >
                                                    <ContentEdit />
                                                </FloatingActionButton>
                                            )
                                        }

                                    </div>
                                    <div class="row">
                                        <p className="Questrial" style={{'font-size':'15px'}}>Expiry: {card.expiryDate}</p>
                                        <div className="Questrial ml-5" style={{'font-size':'15px'}}>Status: <b>{card.status}</b></div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Surveys);
