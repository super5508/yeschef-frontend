import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import UserIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  setCon: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    marginTop: '7.5rem',
    "& h2": {
      marginTop: "0.7rem"
    },
    height: 'auto',
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
  subscribed: {
    padding: '2.4rem',
    position: 'relative',
    flex: 1,
    paddingBottom: 0,
  },
  subscriptionCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: '2.4rem',
    display: 'flex',
    flexDirection: 'column',
    margin: '2.4rem 0',
    "& h3": {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 300,
    },
    "& h4": {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 600
    }
  },
  submitButton: {
    position: 'relative',
  },
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 72px)',
    flexDirection: 'column',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  }
});

const subScriptionState = 0;

class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.wrapper}>
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
        <Box className={classes.subscribed}>
          <div className={classes.flexBetween}>
            <div>
              <h1>Billing Details</h1>
              <Card className={classes.subscriptionCard}>
                <h3>YOUR SUBSCRIPTION</h3>
                <h4>You don't have a YesChef subscription yet</h4>
              </Card>
            </div>
            <Button component={Link} to={'/'} size="large" variant="contained" color="primary" className={classes.submitButton}>
              <Box fontWeight="fontWeightBold" fontSize="1.4rem">
                CHECK OUT EARLY BIRD PLANS
              </Box>
            </Button>
          </div>
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
