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
        fontSize: '2rem'
    }
});

class BottomBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        let dom;
        if (this.props.mainMenu.visible) {
            dom = (
                <BottomNavigation
                    value={this.props.mainMenu.selected}
                    onChange={(event, newValue) => {
                        let action;
                        switch (newValue) {
                            case "myProfile":
                                action = MainMenuActionCreator.gotoMyProfile();
                                break;
                            case "community":
                                action = MainMenuActionCreator.gotoCommunity();
                                break;
                            case "beta":
                                action = MainMenuActionCreator.gotoBeta();
                                break;
                            default:
                                action = MainMenuActionCreator.gotoHome();
                                break;
                        }
                        store.dispatch(action);
                    }}
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
                        label="My Profile"
                        value='myProfile'
                        icon={<PersonIcon />} 
                        component={Link}
                        to="/myProfile" />/>
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
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(BottomBar)));