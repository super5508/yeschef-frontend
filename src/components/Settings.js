import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import SignOut from "./SignOut";
import UserIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

const styles = theme => ({
  setCon: {
    display: "flex",
    flexDirection: "row",
    margin: "2rem 0rem 0rem 2.4rem",
    "& h3": {
      fontSize: "1.6rem",
      fontWeight: 600,
      marginTop: "0.5rem"
    }
  },
  setImg: {
    height: "5.7rem",
    width: "5.7rem",
    marginRight: "1rem"
  },
  pinkBg: {
    backgroundColor: "#ff007f"
  },
  setEmail: {
    fontSize: "1.4rem",
    fontWeight: 300
  },
  userIcon: {
    color: "#f2f2f2",
    fontSize: "3.0rem"
  }
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    console.log("name");
    console.log(this.props.authStat);
    return (
      <Box>
        {this.props.authStat && this.props.authStat.userProfile && (
          <Box className={classes.setCon}>
            {this.props.authStat.userProfile.photoURL ? (
              <Avatar
                alt={this.props.authStat.userProfile.displayName}
                src={this.props.authStat.userProfile.photoURL}
                className={classes.setImg}
              />
            ) : (
              <Avatar
                alt={this.props.authStat.userProfile.displayName}
                className={clsx(classes.setImg, classes.pinkBg)}
              >
                <UserIcon className={classes.userIcon} />
              </Avatar>
            )}
            <div>
              <h3>
                {this.props.authStat.userProfile.displayName}
                <br />
                <span className={classes.setEmail}>
                  {this.props.authStat.userProfile.email}
                </span>
              </h3>
            </div>
          </Box>
        )}
        <SignOut />
      </Box>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Settings))
);
