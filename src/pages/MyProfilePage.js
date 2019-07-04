import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = theme => ({

});
class MyProfilePage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Box>
                {/* if user logged in */}
                {this.props.authStat.isLogin && <div>my profile component</div>}
                {/* if user logged out */}
                {!this.props.authStat.isLogin && <div>signin/signup component</div>}
            </Box>
        )
    }; 
}

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.user
    }
  }
export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyProfilePage)));