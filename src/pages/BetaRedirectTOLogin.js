import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class BetaRedirectTOLogin extends Component {
  render() {
    if (window.location.pathname !== "/") {
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
