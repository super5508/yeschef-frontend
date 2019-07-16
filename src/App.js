import React, { Component } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import ChefHomePage from './pages/ChefHomePage';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import './assets/site.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import PlayerPage from './pages/PlayerPage';
//import Axios from 'axios';
import BottomBar from './components/BottomBar';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import BetaPage from './pages/Beta';
import CommunityPage from './pages/CommunityPage';
const APP_ID = 'h6twy30k'

const styles = theme => ({
  App: {
    paddingBottom: '12rem'
  },
})

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
    htmlFontSize:10,
    h1:{
      '@media (max-width:600px)': {
        fontSize:"1.8rem",
      },
      fontWeight: 600
    }
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
    //secondary: { main: '#ff007f', contrastText: '#fff' },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
      hint: '#fff'
    }
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {}
  }
  componentDidMount() {
    // Axios.get('/api/chef/edward_lee/info').then(chefInfoResponse => {
    //   this.setState(chefInfoResponse.data);
    // })
  }
  
  render() {
    const { classes } = this.props;

    if(this.props.authStat.userProfile) {
      console.log(this.props.authStat.userProfile.uid)
      window.Intercom('update', {
        app_id: APP_ID,
        user_id : this.props.authStat.userProfile.uid,
        name : this.props.authStat.userProfile.name,
        email : this.props.authStat.userProfile.email,
        created_at : Date.now()
         //Website visitor so may not have any user related info
       });
    }
    //const chefsData = this.state || {};

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.App}>
            {/* <PrimaryAppBar></PrimaryAppBar> */}

            <Route exact path="/" render={(routeProps) => (<HomePage />)}></Route>
            {/* <Route exact path="/" render={(routeProps) => (<ChefHomePage {...routeProps} {...chefsData}></ChefHomePage>)}></Route> */}
            <Route exact path="/terms-of-service" component={TermsOfService}></Route>
            <Route exact path="/privacy-policy" component={PrivacyPolicy}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signout" component={SignOut}></Route>
            <Route exact path="/myProfile" component={MyProfilePage}></Route>
            <Route exact path="/reset-password" component={ResetPassword}></Route>
            <Route exact path="/change-password" component={ChangePassword}></Route>
            <Route exact path="/community" component={CommunityPage}></Route>
            <Route exact path="/beta" component={BetaPage}></Route>
            <Route path="/class/:id" render={(routeProps) => (<PlayerPage {...routeProps} mode='class' />)}></Route>
            <BottomBar> </BottomBar>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.user
	};
};

export default connect(mapStateToProps)(withStyles(styles)(App));
