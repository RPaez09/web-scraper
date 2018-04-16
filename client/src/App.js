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

  constructor(props){
    super(props);

    this.state = {
      user: {
        isLoggedIn: false,
        email: '',
        id: '',
        username: '',
        token: ''
      }
    }
  };

  onLoginSuccess = (user, token) => {
    this.setState({
      user: {
        ...this.state.user,
          isLoggedIn: true,
          username: user.username,
          email: user.email,
          id: user.id,
          token: token
      }
    });
  };

  onLogout = () => {
    this.setState({
      user: {
        ...this.state.user,
        isLoggedIn: false,
        username: '',
        email: '',
        id: '',
        token: ''
      }
    });
  };

  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={muiTheme}>
          <React.Fragment>
            <Navbar 
              user={this.state.user}
              onLogout={this.onLogout} />
            <Main user={this.state.user} 
                  onLoginSuccess={this.onLoginSuccess} />
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
};

export default App;
