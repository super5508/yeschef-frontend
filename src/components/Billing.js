import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import UserIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

const styles = theme => ({
  setCon: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    marginTop: '7.5rem',
    "& h2": {
      marginTop: "0.7rem"
    }
  },
  setImg: {
    height: "10rem",
    width: "10rem",
    // marginRight: "1rem"
  },
  pinkBg: {
    backgroundColor: "#ff007f"
  },
  userIcon: {
    color: "#c20a65",
    fontSize: "7.1rem"
  },
  userEmail: {
    textTransform: 'lowercase',
    marginTop: "0.5rem",
    display: "block"
  },
  listCon: {
    margin: '2.5rem 0rem',
    "& h4": {
      cursor: "pointer"
    },
    "& h1": {
      paddingLeft: '2.4rem',
      paddingBottom: '1.6rem'
    }
  },
  lstItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #7f7f7f',
    paddingLeft: '2.4rem',
    paddingRight: '2.4rem',
    paddingTop: '1.7rem',
    paddingBottom: '1.7rem'
  },
  bottomBorder: {
    borderBottom: '0.09rem solid #7f7f7f',
  },
  forwardIcon: {
    fontSize: '1.2rem'
  },
  providerIconWrapper: {
    float: 'left',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    marginTop: '-0.7rem',
    position: 'absolute',
    '&.white-bg': {
      backgroundColor: 'white',
    },
  },
  facebookLogo: {
    width: '100%',
    height: '100%',
  },
  googleLogo: {
    width: '50%',
    height: '50%',
    margin: '25%'
  },
  loggedInWithText: {
    marginLeft: '4.7rem'
  }
});

class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Box>
        {this.props.authStat && this.props.authStat.userProfile && (
          <Box className={classes.setCon}>
            {this.props.authStat.userProfile.photoURL ? (
              <Avatar
                alt={
                  this.props.authStat.userProfile.displayName
                }
                src={this.props.authStat.userProfile.photoURL}
                className={classes.setImg}
              />
            ) : (
                <Avatar
                  alt={
                    this.props.authStat.userProfile.displayName
                  }
                  className={clsx(classes.setImg, classes.pinkBg)}
                >
                  <UserIcon className={classes.userIcon} />
                </Avatar>
              )}
            <div style={{ textAlign: 'center' }}>
              <h2 className={classes.userName}>
                {this.props.authStat.userProfile.displayName}
              </h2>
              <span className={'body-text ' + classes.userEmail}>
                {this.props.authStat.userProfile.email}
              </span>
            </div>
          </Box>
        )}
        <Box className={classes.listCon}>
          <h1>Billing Details</h1>
        </Box>
      </Box>
    );
  }
}

AccountComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(AccountComponent))
);
