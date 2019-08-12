import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Settings from '../components/Settings';
import Header from '../components/Header';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/CloseRounded";
const styles = theme => ({
  signin_out_tabs: {
    flexGrow: 1,
    backgroundColor: "black",
    [theme.breakpoints.down('sm')]: {
      marginTop: '15%'
    },

    marginTop: '4.5%',
  },
  tabs: {

    borderBottom: "1px solid #8484836b"
  },
  h1: {
    paddingTop: "2.4rem",
    paddingLeft: "2.4rem",
    paddingBottom: "0.3rem"
  }
});
class MyProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "signup"
    };
  }
  handleChange = (event, newValue) => {
    this.setState({
      ...this.state,
      value: newValue
    });
  };

  render() {
    const { classes } = this.props;
    let additionalProps = {};
    if (isWidthDown('sm', this.props.width)) {
      additionalProps.variant = "fullWidth";
    } else {
      additionalProps.centered = "true";
    }

    return (
      <Box>
        <div className='fixTopCon'>
          <h1>
            My account
          </h1>
        </div>
        <div className='iconBox' onClick={() => this.props.history.goBack()}>
          <IconButton aria-label="Close">
            <CloseIcon className='closeIcon' />
          </IconButton>
        </div>
        {/* if user logged out */}
        {!this.props.authStat.isLogin && (
          <Paper className={classes.signin_out_tabs}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="inherit"
              {...additionalProps}
              // centered
              className={classes.tabs}
            >
              <Tab value="signup" className='Button-text' label="Sign Up" />
              <Tab value="signin" label="Sign In" />
            </Tabs>
            {this.state.value === "signin" ? <SignIn history={this.props.history} /> : <SignUp history={this.props.history} />}
          </Paper>
        )}

        {/* if user logged in */}
        {this.props.authStat.isLogin &&
          <Box>
            <Header />
            <Settings />
          </Box>
        }
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(withWidth()(MyProfilePage))));
