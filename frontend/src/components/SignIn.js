import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';
class Homepage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-6 indexZ" style={{'opacity':'0.4'}}>
                        <img src={signupimage} className={"indexZ"}/>
                    </div>

                    <div className="col-md-4 cardbox">
                        <h4 className='Questrial' style={{'margin-bottom':'10px','text-align':'center'}}>SIGN IN</h4>
                        <input type = "email" className="inputfield" placeholder="Email"/><br/>
                        <input type = "password" className="inputfield" placeholder="Password"/><br/>
                        <div className="row justify-content-center">
                            <button className="ybutton"onClick={() => {
                                this.props.history.push("/signIn");
                            }}>SIGN IN</button>
                        </div>
                        <div className="row justify-content-center">
                            <button className="ybuttonSecondary" onClick={() => {
                                this.props.history.push("/signUp");
                            }}>or SIGN UP</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Homepage);
