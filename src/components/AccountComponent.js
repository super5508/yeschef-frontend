import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { signout } from "../store/actionCreators/UserActionCreators";
import UserIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/ArrowForwardIosRounded";
import FacebookIcon from "../assets/images/facebook-icon.svg";
import GoogleLogo from "../assets/images/googleLogo.svg";

const styles = theme => ({
    setCon: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        marginTop: '7.5rem',
        "& h2": {
            marginTop: "0.5rem"
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
        color: "#f2f2f2",
        fontSize: "3.0rem"
    },
    userEmail: {
        textTransform: 'lowercase'
    },
    listCon: {
        margin: '2rem 0rem',
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
        paddingTop: '1.56rem',
        paddingBottom: '1.56rem'

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


    signOut = () => {
        window.firebaseAuth.signOut();
        this.props.dispatch(signout());
        window.Intercom('shutdown')
    };

    openChat = () => {
        window.Intercom('show')
    }

    getProviderId = () => this.props.authStat && this.props.authStat.userProfile ? this.props.authStat.userProfile.providerData[0].providerId : '';

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
                {/* //list */}
                <Box className={classes.listCon}>
                    <h1>Account</h1>
                    {this.getProviderId() === 'password' &&
                    <div className={classes.lstItem}>
                        <h4 className='body-text'>Change account email</h4>
                    </div>
                    }
                    {this.getProviderId() === 'password' &&
                        <div className={classes.lstItem} onClick={() => { this.props.history.push('/change-password') }}>
                            <h4 className='body-text'>Change password</h4>
                        </div>
                    }
                    {this.getProviderId() === 'facebook.com' &&
                        <div className={classes.lstItem}>
                            <h4 className='body-text'>
                                <div className={classes.providerIconWrapper}>
                                    <img className={classes.facebookLogo} src={FacebookIcon}/>
                                </div>
                                <span className={classes.loggedInWithText}>You are logged in with Facebook</span>
                            </h4>
                        </div>
                    }
                    {this.getProviderId() === 'google.com' &&
                    <div className={classes.lstItem}>
                        <h4 className='body-text'>
                            <div className={classes.providerIconWrapper + ' white-bg'}>
                                <img className={classes.googleLogo} src={GoogleLogo}/>
                            </div>
                            <span className={classes.loggedInWithText}>You are logged in with Google</span>
                        </h4>
                    </div>
                    }
                    {(this.getProviderId() === 'facebook.com' || this.getProviderId() === 'google.com') &&
                        <div className={classes.lstItem} onClick={() => { this.props.history.push('/change-login') }}>
                            <h4 className='body-text'>Change login</h4>
                        </div>
                    }

                    <div className={clsx(classes.lstItem, classes.bottomBorder)}>
                        <h4 className='body-text'>Billing details</h4>
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
