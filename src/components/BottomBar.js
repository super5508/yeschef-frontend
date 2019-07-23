
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import store from '../store/Store'
import HomeIcon from '@material-ui/icons/HomeRounded'
import PersonIcon from '@material-ui/icons/PersonRounded'
import FeedbackIcon from '@material-ui/icons/FeedbackRounded'
import CommunityIcon from '@material-ui/icons/Forum'
import BetaIcon from '@material-ui/icons/ChatBubble'
import * as MainMenuActionCreator from './../store/actionCreators/MainMenuActionCtrators';

const styles = theme => ({
    root: {
        bottom: 0,
        width: '100%',
        position: 'fixed',
        fontSize: '2rem',
        height: '4.8rem',

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
        } 

    },

});

class BottomBar extends Component {
	constructor(props) {
		super(props);
	}


    render() {
        const { classes } = this.props;
        let dom;
        const path = window.location.pathname;
        let navValue = path === '/' ? 'home' : path.slice(1)
        if (this.props.mainMenu.visible && this.props.location.pathname.slice(0, 6) !== "/class" && this.props.location.pathname.slice(0, 7) !== "/lesson") {
            dom = (
                <BottomNavigation
                    value={navValue}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction
                        label="Home"
                        value='home'
                        icon={<HomeIcon />}                        
                        component={Link}
                        to="/" />

                    <BottomNavigationAction
                        label="Community"
                        value='community'
                        icon={<CommunityIcon />}
                        component={Link}
                        to="/community" />
                    
                    <BottomNavigationAction
                        label="Beta"
                        value='beta'
                        icon={<BetaIcon />}
                        component={Link}
                        to="/beta" />

                    <BottomNavigationAction
                        label="Me"
                        value='myProfile'
                        icon={<PersonIcon />} 
                        component={Link}
                        to="/myProfile" />
                </BottomNavigation>
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
