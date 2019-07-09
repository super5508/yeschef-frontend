import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import store from "../store/Store";
import { signout } from "../store/actionCreators/UserActionCtrators";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const styles = theme => ({
  btncon: {
    marginBottom: "5rem",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  signOutBtn: {
    backgroundColor: "#373737",
    color: "#ffffff",
    height: "4.4rem",
    borderRadius: "0.6rem",
    width: "32.7rem",
    fontSize: "1.4rem",
    fontWeight: 600
  }
});

class SignOut extends Component {
  constructor(props, context) {
    super(props);
  }

  signOut = () => {
    window.firebaseAuth.signOut();
    store.dispatch(signout());
  };

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.btncon}>
        <Button
          variant="contained"
          className={classes.signOutBtn}
          color="primary"
          onClick={this.signOut}
        >
          SIGN OUT
        </Button>
      </Box>
    );
  }
}

SignOut.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SignOut);
