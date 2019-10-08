import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeRounded'
import PersonIcon from '@material-ui/icons/PersonRounded'
import PlayIcon from '@material-ui/icons/PlayCircleFilled'
import BetaIcon from '../assets/images/beta.svg'
import BetaIconWhite from '../assets/images/beta-white.svg'
import Box from '@material-ui/core/Box';

const styles = theme => ({
    root: {
        bottom: 0,
        width: '100%',
        position: 'fixed',
        fontSize: '2rem',
        zIndex: 50,
        height: '4.8rem',
        backgroundColor: '#171717',

        '& .MuiSvgIcon-root': {
            width: '2.4rem',
            height: '2.62rem',
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: '1rem',
            fontWeight: '300',
        },

        '& .Mui-selected': {
            fontWeight: '600'
        },

        '& .beta-icon': {
            width: 24,
            height: 26.19
        }
    },

});

class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = { beta: false };
    }

    handleChange = (event, value) => {
        if (value === 'beta')
            this.setState({ beta: true });
        else
            this.setState({ beta: false });
    };

    render() {
        const { classes } = this.props;
        let dom;
        let isBeta = false;
        const pathname = this.props.location.pathname;
        const isBottomBarVisible = pathname.slice(0, 6) !== "/class" && pathname.slice(0, 7) !== "/lesson" && pathname !== "/" && pathname !== "/change-password" && pathname !== "/reset-password" && pathname !== "/change-email";
        let navValue = pathname === '/' ? 'home' : pathname.slice(1)
        if (navValue === 'account') {
            navValue = 'myProfile'
        }
        if (navValue === 'beta') {
            isBeta = true;
        }

        if (navValue !== 'beta') {
            window.Intercom('hide');
        }

        if (isBottomBarVisible) {
            dom = (
                <Box pb="7.2rem">
                    <BottomNavigation
                        value={navValue}
                        showLabels
                        className={classes.root}
                        onChange={this.handleChange}
                    >
                        <BottomNavigationAction
                            label="Classes"
                            value='home'
                            icon={<PlayIcon />}
                            component={Link}
                            to="/home" />

                        <BottomNavigationAction
                            label="Beta"
                            value='beta'
                            icon={
                                this.state.beta || isBeta ? <img src={BetaIcon} className="beta-icon" alt='beta'></img> : <img src={BetaIconWhite} className="beta-icon" alt='beta'></img>
                            }
                            component={Link}
                            to="/beta" />
                        <BottomNavigationAction
                            label="Me"
                            value='myProfile'
                            icon={<PersonIcon />}
                            component={Link}
                            to="/myProfile" />
                    </BottomNavigation>
                </Box>
            )
        } else {
            dom = <div></div>;
        }
        return dom;
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.mainMenu
    };
};

export default withRouter(
    connect(mapStateToProps)(withStyles(styles)(BottomBar))
);
