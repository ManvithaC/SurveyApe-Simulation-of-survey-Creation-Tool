import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/surveys.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/image/edit';

const style = {
    marginLeft: 300,

};

class Surveys extends Component{
    constructor(props){
        super(props);
        this.state={
            surveysCreated:[
                {
                    name : 'Customer Feedback',
                    expiryDate:'06-06-2018'
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
                                        <FloatingActionButton mini={true}
                                                              style={style}>
                                            <ContentAdd />
                                        </FloatingActionButton>
                                    </div>
                                    <div class="row">
                                        <p className="Questrial" style={{'font-size':'15px'}}>Expiry: {card.expiryDate}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div class="col-md-5 surveyBox">
                        <h4 class="Questrial">Submitted Surveys</h4>
                        <hr style=
                                {{'width':'50%','textAlign':'center'}}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Surveys);
