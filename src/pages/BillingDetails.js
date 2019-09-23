import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from '../components/Header';
import Billing from '../components/Billing'
import BackButton from '../components/BackButton'

class BillingPage extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Box>
        <Header />

        {/* left arrow button */}
        <BackButton />

        {/* if user logged in */}
        {this.props.authStat.isLogin && <Billing />}
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};

export default withRouter(connect(mapStateToProps)(BillingPage));
