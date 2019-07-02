import React, { Component } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import ChefHomePage from './pages/ChefHomePage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './assets/site.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import PlayerPage from './pages/PlayerPage';
import Axios from 'axios';
import BottomBar from './components/BottomBar';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';

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
    fontFamily: "Open Sans",
    fontWeightBold: 600,
    htmlFontSize:10
  },
  palette: {
    type: 'dark',
    background: {
      default: '#000'
    },
    primary: {
      main: '#ff007f', 
      contrastText: '#fff'
    },
    // background:{paper:'#000'},
    // action: { disabled: '#fff5' },
    // secondary: { main: '#ff007f', contrastText: '#fff' },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
      hint: '#fff'
    }
  }
});

class App extends Component {
  // componentDidMount() {
  //   Axios.get('/api/chef/edward_lee/info').then(chefInfoResponse => {
  //     this.setState(chefInfoResponse.data);
  //   })

  // }

  render() {
    //const chefsData = this.state || {};

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            {/* <PrimaryAppBar></PrimaryAppBar> */}

            <Route exact path="/" render={(routeProps) => (<HomePage />)}></Route>
            {/* <Route exact path="/" render={(routeProps) => (<ChefHomePage {...routeProps} {...chefsData}></ChefHomePage>)}></Route> */}
            <Route exact path="/myProfile" component={MyProfilePage}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signout" component={SignOut}></Route>
            <Route path="/class/:id" render={(routeProps) => (<PlayerPage {...routeProps} mode='class' />)}></Route>
            <BottomBar> </BottomBar>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;

