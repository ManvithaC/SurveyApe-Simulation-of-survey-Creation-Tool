import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import '../css/stats.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from "axios/index";
import swal from 'sweetalert';

const ROOT_URL = 'http://localhost:8080';
class UserAccount extends Component{

    constructor(props) {
        super(props);
        this.state = {
            StatsData: {
                surveyName: 'S',
                Startime: '',
                Endtime: '',
                NumberofRespondents: null,
                NumberofInvitees: null,
                Questions: [{
                    QuestionDesc: '',
                    Answers: [{
                        label:'',
                        count:0
                    },
                        {
                            label:'',
                            count:0
                        },
                        {
                            label:'',
                            count:0
                        },
                        {
                            label:'',
                            count:0
                        }],

                }]


            }
        }
    }

    componentWillMount(){

        if (this.props.location.state) {
            var SurveyID =this.props.location.state.surveyId;
            //alert(SurveyID);
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/getStats/`+SurveyID, axiosConfig)
            .then(response => {
                //alert(response.data.code);

                if(response.data.code==200){
                    //alert("responseee "+response.data);
                    this.setState({'StatsData':response.data})
                }
                else if(response.data.code==404){
                    swal("Not Available","Sorry, Statistics cannot be viewed fot the survey that has fewer than 2 respondents.","warning");
                    this.props.history.push("/Surveys");
                }
                else{
                    swal("There seems to be some error.");
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    render(){

        return (
            <div className={"Questrial"}>
                <div className="row">
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row justify-content-center boxHeading">
                            Survey Name
                        </div>
                        <div className="row justify-content-center boxText">
                            {this.state.StatsData.surveyName}
                        </div>

                    </div>
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row justify-content-center boxHeading">
                            {this.state.StatsData.Startime}
                        </div>
                        <div className="row justify-content-center boxText">
                            05-06-2018 12:40
                        </div>

                    </div>
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row  justify-content-center  boxHeading">
                            End Time
                        </div>
                        <div className="row justify-content-center boxText">
                            {this.state.StatsData.Endtime}
                        </div>

                    </div>
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row justify-content-center boxHeading">
                            Number Of Respondents
                        </div>
                        <div className="row justify-content-center boxText">
                            {this.state.StatsData.NumberofRespondents}
                        </div>

                    </div>
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row justify-content-center boxHeading">
                            Number Of Invitees
                        </div>
                        <div className="row justify-content-center boxText">
                            {this.state.StatsData.NumberofInvitees}
                        </div>

                    </div>
                    <div className="col-md-2 col-xs-12 statsBox" >
                        <div className="row justify-content-center boxHeading">
                            Number Of Submissions
                        </div>
                        <div className="row justify-content-center boxText">
                            {/*{this.state.StatsData.NumberofInvitees}*/}
                        </div>

                    </div>
                </div>

                <div className="row justify-content-center">

                    {
                        this.state.StatsData.Questions.map((question,index) => (
                            <div class="chartBox">
                                <div>
                                    <div className='row'>
                                        <p style={{'font-size':'20px','margin-left':'20px'}}>{index+1}. {question.QuestionDesc}</p>
                                    </div>
                                    <div className={" row col-md-8"}>
                                        <BarChart width={600} height={300} data={question.Answers}
                                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                            <CartesianGrid/>
                                            <XAxis dataKey="label"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Legend />
                                            <Bar dataKey="count" fill="#ba68c8" />
                                        </BarChart>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

        )
    }
}

export default withRouter(UserAccount);
