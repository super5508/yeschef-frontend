import React, { Component } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import ChefHomePage from './pages/ChefHomePage';
import SignIn from './components/SignIn';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './assets/site.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignOut from './components/SignOut';

const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      text: { // Name of the rule
        //color: 'white', // Some CSS
      },
    }
  },
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    // background:{paper:'#000'},
    // action: { disabled: '#fff5' },
    //  primary: { main: '#333', contrastText: '#fff' },
    // secondary: { main: '#ff007f', contrastText: '#fff' },
    //  text:{ 
    //    primary:'#fff',
    //    secondary:'#fff',
    //    disabled:'#fff',
    //    hint:'#fff'
    //  }
  }
});

class App extends Component {
  render() {
    const chefsData = {
      chefsName: "Edward Lee",
      chefsDesc: "Authentic southern cooking with Korean twist",
      restaurants:[
        {"name":"Terrace 5's Bus Boy", "id":"1234"},
        {"name":"Clay Opens", "id":"1234"},
        {"name":"Wine Studio Opens", "id":"1234"}
      ]
    }

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <div className="App">
            <PrimaryAppBar></PrimaryAppBar>
            <Route exact path="/" render={(routeProps) => (<ChefHomePage {...routeProps} {...chefsData}></ChefHomePage>)}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signout" component={SignOut}></Route>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;

