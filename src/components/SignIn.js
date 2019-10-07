import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { signin } from "../store/actionCreators/UserActionCreators";
import { Button, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import fbLogo from "../assets/images/fbLogo.svg";
import googleLogo from "../assets/images/googleLogo.svg";
import Box from "@material-ui/core/Box";
import auth from "./../common/auth";
import { Link, withRouter } from 'react-router-dom'
import Axios from '../common/AxiosMiddleware';
const CssTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white"
      }
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white"
    }
  }
})(TextField);

const styles = theme => ({
  container: {
    "& .Mui-focused fieldset": {
      borderColor: "white",
    },
    paddingTop: "2.4rem",
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      paddingLeft: "2.4rem",
      paddingRight: "2.4rem",
    },
    [theme.breakpoints.up('sm')]: {
      width: '400px',
      margin: 'auto'
    }
  },
  loginWith: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3.5rem"
  },
  textFieldLabel: {
    fontSize: "1.4rem",
    fontWeight: 300
  },
  boldDivider: {
    height: "2px"
  },
  fbButton: {
    backgroundColor: "#4367b2",
    color: "white",
    paddingRight: "1.5rem",
    paddingLeft: "1.5rem"
  },
  googleButton: {
    backgroundColor: "white",
    paddingRight: "1.5rem",
    paddingLeft: "1.5rem",
    marginTop: '2.4rem'
  },
  signInBtn: {
    marginTop: "2.4rem",
    width: "100%",
  },
  bottomText: {
    textDecoration: "underline",
    marginTop: "-0.5rem",
    fontFamily: "Open Sans",
    fontSize: '1.4rem',
    fontWeight: '300',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  grayText: {
    color: 'rgba(255, 255, 255, 0.8)',
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  };

  successfulLogin = (response) => {
    if (!response) return;
    // Intercom('update', {
    //     email: response.user.email,
    //     name: response.user.displayName
    // });
    //window.setTimeout(function(){
    this.props.dispatch(signin(response.user));
    //Is success signup, redirect to home
    this.props.history.push("/home");
    //}, 1000);
  }

  submitLogin = event => {
    var firebaseAuthPromise = window.firebaseAuth.signInWithEmailAndPassword(
      this.state.email,
      this.state.password
    );
    firebaseAuthPromise.catch(function (error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      // #Todo change the alert to a real error message popup
      alert(errorMessage);
    });

    firebaseAuthPromise.then(this.successfulLogin);

    event.preventDefault();
  };

  signInWith = provider => {
    let signInPromise;
    switch (provider) {
      case "google":
        signInPromise = auth.doGoogleSignIn();
        break;
      case "facebook":
        signInPromise = auth.doFacebookSignIn();
        break;
      default:
    }

    signInPromise.then(
      (res) => {
        //Is success signup, redirect to home
        localStorage.setItem("uid", res.uid);
        Axios.get(`/history/${res.uid}`).then(history => {
          localStorage.setItem("classId", history.data.classId);
          localStorage.setItem("lessonId", history.data.lessonId);
          localStorage.setItem("lessonName", history.data.name);
        }).finally(() => {
          this.props.history.push("/home");
        })
      },
      msg => {
        // @Todo change the alert to a real error message popup
        alert(msg);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const labelsProps = {
      className: classes.textFieldLabel
    };
    return (
      <Box
        className={classes.container}
      >
        <Box className={classes.loginWith}>
          <Button
            variant="contained"
            className={classes.fbButton}
            size="large"
            onClick={() => this.signInWith("facebook")}
          >
            <Box pr="0.7rem" display="flex">
              <img src={fbLogo} alt="Facebook Logo" />
            </Box>
            <Box fontSize="1.4rem" fontWeight="600">
              USE FACEBOOK
            </Box>
          </Button>

          <Button
            variant="contained"
            className={classes.googleButton}
            size="large"
            onClick={() => this.signInWith("google")}
          >
            <Box pr="0.7rem" display="flex">
              <img src={googleLogo} alt="Google Logo" />
            </Box>
            <Box fontSize="1.4rem" fontWeight="600">
              USE GOOGLE
            </Box>
          </Button>
        </Box>
        <Box
          flexDirection="row"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          fontWeight="600"
          mb="1rem"
          mt='-1rem'
        >
          <Divider width="40%" className={classes.boldDivider} />
          <span className='Button-text'>OR</span>
          <Divider width="40%" className={classes.boldDivider} />
        </Box>
        <form
          className={classes.loginWith}
          autoComplete="on"
          onSubmit={this.submitLogin}
        >
          <CssTextField
            id="email"
            label="Email"
            type="email"
            className={classes.textField}
            onChange={this.handleChange}
            autoComplete="email"
            margin="normal"
            InputLabelProps={labelsProps}
            variant="outlined"
            fullWidth={true}
          />
          <CssTextField
            id="password"
            label="Password"
            type="password"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange}
            autoComplete="current-password"
            InputLabelProps={labelsProps}
            variant="outlined"
            fullWidth={true}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.signInBtn}
            onClick={this.submitLogin}
          >
            <Box fontWeight="600" fontSize="1.4rem">
              SIGN IN
            </Box>
          </Button>
        </form>
        <Box className={classes.bottomText}>
          <Link to="/reset-password" underline="always" className={classes.grayText}>
            Forgot password?
          </Link>
        </Box>
      </Box>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};
export default withRouter(connect(mapStateToProps)(withStyles(styles)(SignIn)));
