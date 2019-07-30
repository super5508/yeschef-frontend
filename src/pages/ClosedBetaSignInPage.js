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
import logo from "../assets/images/logo.png"

const styles = theme => ({
  signin_out_tabs: {
    flexGrow: 1,
    backgroundColor: "black"
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
class ClosedBetaSignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "signin"
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

    if (this.state.value !== "signin") {
      window.location.href = "https://www.yeschef.me";
    }

    return (
      <Box>
        <Box display="flex" justifyContent="center" mt="2.4rem">
          <img src={logo} alt="logo"></img>
        </Box>
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
            {this.state.value === "signin" ? <SignIn history={this.props.history} /> : "Loading..."}
          </Paper>
        )}

        {/* if user logged in */}
        {this.props.authStat.isLogin && this.props.history.push("/home")}
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
  connect(mapStateToProps)(withStyles(styles)(withWidth()(ClosedBetaSignInPage))));
