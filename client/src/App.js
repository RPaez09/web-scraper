import React, { Component } from 'react';
import {deepOrange700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepOrange700 }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar
            title="Hacker News"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
