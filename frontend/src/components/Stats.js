import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import '../css/stats.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from "axios/index";

const ROOT_URL = 'http://localhost:8080';
class UserAccount extends Component{

    constructor(props) {
        super(props);
        this.state = {
            StatsData: null,
        }
    }

    componentWillMount(){

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": true
            }
        };

        axios.create({withCredentials: true})
            .post(`${ROOT_URL}/getStats/10`, axiosConfig)
            .then(response => {
                if(response.data.code==200){
                    alert("responseee "+response.data);
                    this.setState({'StatsData':response.data})
                }
                else{
                    alert("elsee ");
                }
            })
            .catch(error => {
                //swal("got error");
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
                           Start Time
                        </div>
                        <div className="row justify-content-center boxText">
                            {this.state.StatsData.Startime}
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
