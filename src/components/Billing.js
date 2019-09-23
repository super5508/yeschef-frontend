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
  pageContent: {
    padding: '2.4rem',
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
      marginBottom: 6,
    },
    "& h4": {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 6,
    },
    "& h5": {
      color: '#929292',
      fontSize: 14,
      fontWeight: 300,
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
  },
  annual: {
    padding: '2.4rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 300,
    "& strong": {
      fontWeight: 600
    },
    borderBottom: '1px solid #FFFFFF',
    "& h4": {
      paddingLeft: 12,
      marginLeft: 8,
      display: 'inline-block',
      fontSize: 14,
      borderLeft: '1px solid #FFFFFF55',
      fontWeight: 300
    }
  }
});

const user = {
  annuals: [
    {
      title: 'Annual - Early Bird',
      date: '10/09/2019',
      price: 49.99,
    },
    {
      title: 'Annual',
      date: '10/09/2020',
      price: 99.99,
    }
  ]
}

class BillingComponent extends Component {
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
        {user.annuals.length === 0 ? (
          <Box className={classes.subscribed}>
            <div className={classes.flexBetween}>
              <div>
                <h1>Billing Details</h1>
                <Card className={classes.subscriptionCard}>
                  <h3>YOUR SUBSCRIPTION</h3>
                  <h4>You don't have a YesChef subscription yet</h4>
                </Card>
              </div>
              <a href={'https://yeschef.me/early-bird/plans'} target="_blank" style={{ textDecoration: 'none' }}>
                <Button size="large" variant="contained" color="primary" className={classes.submitButton}>
                  <Box fontWeight="fontWeightBold" fontSize="1.4rem">
                    CHECK OUT EARLY BIRD PLANS
                  </Box>
                </Button>
              </a>
            </div>
          </Box>
        ) : (
            <>
              <Box className={classes.pageContent}>
                <h1>Billing Details</h1>
                <Card className={classes.subscriptionCard}>
                  <h3>YOUR SUBSCRIPTION</h3>
                  <h4>{user.annuals[user.annuals.length - 1].title}</h4>
                  <h5>{
                    user.annuals.length === 1 ? "* Your subscription doesn't start until we launch"
                      : `Renewal Date: ${user.annuals[user.annuals.length - 1].date}`
                  }</h5>
                </Card>
              </Box>
              <Box className={classes.annualContent} style={{ borderTop: '1px solid #FFFFFF55' }}>
                {
                  user.annuals.map((annual, idx) => {
                    return (
                      <div className={classes.annual} key={idx} style={{ borderBottom: '1px solid #FFFFFF55' }}>
                        <span><strong>{annual.date}</strong> <h4>{annual.title}</h4></span>
                        <strong>${annual.price}</strong>
                      </div>
                    )
                  })
                }
              </Box>
            </>
          )}
      </Box>
    );
  }
}

BillingComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(BillingComponent))
);
