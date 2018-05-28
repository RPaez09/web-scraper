import React, { Component } from 'react';
import {deepOrange700} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Snackbar from 'material-ui/Snackbar';
import './App.css';

import Navbar from './components/Navbar/NavBar';
import Main from './components/main';
import Footer from './components/Footer/Footer';

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
        token: '',
        favorites: []
      },
      snackbar: {
        open: false,
        message: ''
      }
    }
  };

  componentDidMount(){
    let user = sessionStorage.getItem("hn-user");

    if( user ){
      this.setState({
        user: JSON.parse(user)
      });
    }
  }

  onLoginSuccess = (user, token, favorites) => {
    this.setState({
      user: {
        ...this.state.user,
          isLoggedIn: true,
          username: user.username,
          email: user.email,
          id: user.id,
          token: token,
          favorites: favorites
      }
    });

    this.onSnackbarMessage(`Welcome to Hacker News ${user.username}!`);

    sessionStorage.setItem("hn-user", JSON.stringify( this.state.user ));
  };

  onLogout = () => {
    this.setState({
      user: {
        ...this.state.user,
        isLoggedIn: false,
        username: '',
        email: '',
        id: '',
        token: '',
        favorites: []
      }
    });

    this.onSnackbarMessage('You have been logged out, see you soon!');

    sessionStorage.removeItem("hn-user");
  };

  handleSnackbarClose = () => {
    this.setState({ snackbar: {      
      ...this.state.snackbar,
      open: false,
      message: ''
    }});
  };

  onSnackbarMessage = message => {
    this.setState({ snackbar: {
      ...this.state.snackbar,
      open: true,
      message: message
    }});
  };

  handleSave = ( articleID ) => {
    this.setState({
      user: {
        ...this.state.user,
        favorites: this.state.user.favorites.concat( articleID )
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
                  onLoginSuccess={this.onLoginSuccess}
                  handleSave={this.handleSave}
                  onSnackbarMessage={this.onSnackbarMessage} />
            <Footer />
            <Snackbar 
                  open={this.state.snackbar.open}
                  message={this.state.snackbar.message}
                  autoHideDuration={2000}
                  onRequestClose={this.handleSnackbarClose}/>
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    );
  }
};

export default App;
