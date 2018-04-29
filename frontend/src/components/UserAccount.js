import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Avatar from 'material-ui/Avatar';
import DP from '../images/manvi.png';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Surveys from './Surveys';
class UserAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }
    handleClick = (event) => {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    render(){
        return (
            <div>
                <Avatar src={DP} onClick={this.handleClick} />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem primaryText="My Surveys" onClick={() => {
                            this.props.history.push("/Surveys");}}/>
                        <MenuItem primaryText="My Account" />
                        <MenuItem primaryText="Sign out" onClick={() => {
                            this.props.history.push("/");}}/>
                    </Menu>
                </Popover>
            </div>


        )
    }
}

export default withRouter(UserAccount);
