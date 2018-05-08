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
            StatsData: {
                surveyName: 'SJSU Library Survey',
                Startime: '05-06-2018 12:40',
                Endtime: '06-06-2018 22:40',
                NumberofRespondents: 7,
                NumberofInvitees: 20,
                Questions: [{
                    QuestionDesc: 'What is your Favourite color?',
                    Answers: [{
                        label:'Yellow',
                        count:3
                    },
                        {
                            label:'Blue',
                            count:2
                        },
                        {
                            label:'Black',
                            count:1
                        },
                        {
                            label:'White',
                            count:1
                        }],

                },
                    {
                        QuestionDesc: 'What is your Favorite food?',
                        Answers: [{
                            label:'Biryani',
                            count:3
                        },
                            {
                                label:'Sandwich',
                                count:0
                            },
                            {
                                label:'Pizza',
                                count:2
                            },
                            {
                                label:'White',
                                count:1
                            }],

                    }]


            }
        }
    }

    componentWillMount(){

        alert("CWM - STATS");

        const headers = {
            'Accept': 'application/json'
        };

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         "Access-Control-Allow-Origin": true
        //     }
        // };
        // axios.create({withCredentials: true})
        //     .get(`${ROOT_URL}/getStats/10`, axiosConfig)
        //     .then(response => {
        //         alert("response data from stats "+response.data);
        //         // this.setState({
        //         //     surveyId:response.data.surveyId
        //         // });
        //
        //         //swal("Save Successfull")
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        const getStats = () =>
            fetch(`${ROOT_URL}/getStats/10`, {
                method: 'GET',
                headers: {
                    ...headers,
                },
                credentials:'include'
            }).then(res => {
                return res.json();
            }).catch(error => {
                console.log("uploadFile - This is error");
                return error;
            });

        getStats()
            .then((data) => {
                alert("data from backend"+data);
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
