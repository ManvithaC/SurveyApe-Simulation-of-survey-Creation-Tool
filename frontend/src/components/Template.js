import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/signup.css';
import signupimage from '../images/signup.jpg';
class UserAccount extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div>

            </div>

        )
    }
}

export default withRouter(UserAccount);
