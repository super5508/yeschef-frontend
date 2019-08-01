import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class BetaRedirectTOLogin extends Component {
  render() {
    //perform the check for redirect only if we're not at the "/" of in a landing page
    if (window.location.pathname !== "/" && !window.location.pathname.startsWith("/lp/")) {
      if (this.props.authStat.isLogin === false) {
        this.props.history.push("/");
      } else {
        if (this.props.authStat.userMetadata && !this.props.authStat.userMetadata.isBeta) {
          this.props.history.push("/");
        }
      }
    }

    return (
      <Box>
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
  connect(mapStateToProps)(BetaRedirectTOLogin));
