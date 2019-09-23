import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "../store/actionCreators/UserActionCreators";
import Header from '../components/Header';
import Billing from '../components/Billing'
import Snackbar from '@material-ui/core/Snackbar';
import BackButton from '../components/BackButton'

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      message: ''
    }
  }

  componentDidMount() {
    if (this.props.message.message_type === 'pwd_change_success') {

      this.setState({ open: true, message: 'Password changed successfully' })
      this.props.dispatch(message(''));
    }
    if (this.props.message.message_type === 'email_change_success') {

      this.setState({ open: true, message: 'Email changed successfully' })
      this.props.dispatch(message(''));
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  snack = () => {
    const { vertical, open, horizontal, message } = this.state
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    )
  }


  render() {
    const { classes } = this.props;

    return (
      <Box>
        <Header />

        {/* //left arrow button */}
        <BackButton />

        {/* if user logged in */}
        {this.props.authStat.isLogin && <Billing />}

        {this.snack()}
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};
export default withRouter(connect(mapStateToProps)(AccountPage));
