import React, { Component } from 'react';
import {deepOrange700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import Navbar from './components/Navbar/NavBar';
import Main from './components/main';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange700 }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <React.Fragment>
            <Navbar />
            <Main />
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
