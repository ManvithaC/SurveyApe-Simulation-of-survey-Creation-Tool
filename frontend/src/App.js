import React, { Component } from 'react';
import Landing_Page from './components/LandingPage';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#ba68c8',
    },
});
class App extends Component {
  render() {
    return (
        <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <BrowserRouter>
                    <Landing_Page/>
                </BrowserRouter>
            </MuiThemeProvider>
        </div>
    );
  }
}

export default App;
