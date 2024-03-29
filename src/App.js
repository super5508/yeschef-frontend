import React, { Component } from 'react';
import PrimaryAppBar from './components/PrimaryAppBar';
import ChefHomePage from './pages/ChefHomePage';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import './assets/site.scss';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import LessonPage from './pages/LessonPage';
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
import ClosedBetaSignInPage from './pages/ClosedBetaSignInPage'
import BetaRedirectTOLogin from './pages/BetaRedirectTOLogin'
import LPHomePage from './pages/lp/LPHomePage'
import AccountPage from './pages/AccountPage'
import ChangeEmail from './pages/ChangeEmail'
import BillingDetails from './pages/BillingDetails'

const APP_ID = (process.env.NODE_ENV === 'production') ? 'j4tr2hf6' : 'h6twy30k';

const styles = theme => ({
})

const theme = createMuiTheme({
  overrides: {
    MuiFormHelperText: {
      root: {
        fontFamily: "Open Sans",
        fontSize: '11px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgba(255, 255, 255, 0.8)',
        "&$error": {
          color: '#cf6679'
        }
      },
      contained: {
        margin: '5px 12px -19px'
      }
    },
    "MuiFormLabel": {
      root: {
        "&.Mui-error": {
          color: '#cf6679'
        }
      }
    },
    MuiSnackbar: {
      anchorOriginBottomCenter: {
        bottom: '60px'
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#ffffff',
        fontFamily: "Open Sans",
        fontSize: '14px',
        fontWeight: '300',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgba(0, 0, 0, 0.8)',
        boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.5)'
      },

    },

    MuiButton: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        width: '100%',
        height: '5.6rem',
        borderRadius: '0.6rem',
        // fontFamily: 'Open Sans',
        // fontSize: '1.4rem',
        // fontWeight: '600',
        // fontStyle: 'normal',
        // fontStretch: 'normal',
        // lineHeight: 'normal',
        // letterSpacing: 'normal',
        // textAlign: 'center',
        // color: '#ffffff',
      }
    },

    MuiPaper: {
      root: {
        backgroundColor: 'none'
      },
      elevation1: {
        boxShadow: 'none'
      }
    },
    // // tab css
    MuiTab: {
      root: {
        fontFamily: 'Open Sans',
        fontSize: '1.4rem',
        fontWeight: '600',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'center',
        color: '#929292',

        "&$selected": {
          color: "#ffffff"
        }
      },
    },

  },

  typography: {
    useNextVariants: true,
    fontFamily: "Open Sans",
    fontWeightBold: 600,
    htmlFontSize: 10,
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
    this.state = {}
  }
  componentDidMount() {
  }

  render() {
    const { classes } = this.props;
    window.intercomSettings = {
      app_id: APP_ID,
      hide_default_launcher: false,
      vertical_padding: 100
    };
    (function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/' + APP_ID; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (document.readyState === 'complete') { l(); } else if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
    if (this.props.authStat.userProfile) {

      window.Intercom('update', {
        user_id: this.props.authStat.userProfile.uid,
        name: this.props.authStat.userProfile.name,
        email: this.props.authStat.userProfile.email,
        created_at: Date.now()
        //Website visitor so may not have any user related info
      });
    }
    //const chefsData = this.state || {};
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Route path="/" render={(routerProps) => (<BetaRedirectTOLogin {...routerProps} />)}></Route>

            <Route exact path="/class/:classId/lesson/:lessonNum" render={(routeProps) => (<LessonPage {...routeProps} />)}></Route>
            <Route exact path="/class/:id" render={(routeProps) => (<ChefHomePage {...routeProps} mode='class' />)}></Route>


            <Route exact path="/" render={(routeProps) => (<ClosedBetaSignInPage />)}></Route>
            <Route exact path="/home" render={(routeProps) => (<HomePage />)}></Route>
            <Route exact path="/terms-of-service" component={TermsOfService}></Route>
            <Route exact path="/privacy-policy" component={PrivacyPolicy}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signout" component={SignOut}></Route>
            <Route exact path="/myProfile" component={MyProfilePage}></Route>
            <Route exact path="/change-email" component={ChangeEmail}></Route>
            <Route exact path="/reset-password" component={ResetPassword}></Route>
            <Route exact path="/change-password" component={ChangePassword}></Route>
            <Route exact path="/community" component={CommunityPage}></Route>
            <Route exact path="/beta" component={BetaPage}></Route>
            <Route exact path="/account" component={AccountPage}></Route>
            <Route exact path="/lp/lp1" component={LPHomePage}></Route>
            <Route exact path="/billing-details" component={BillingDetails}></Route>

            <BottomBar > </BottomBar>
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
