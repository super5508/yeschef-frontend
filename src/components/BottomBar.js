import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import store from '../store/Store'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import FeedbackIcon from '@material-ui/icons/Feedback'
import * as MainMenuActionCreator from './../store/actionCreators/MainMenuActionCtrators';


const styles = theme => ({
    root: {
        bottom: 0,
        width: '100%',
        position: 'fixed'
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
                            case "feedback":
                                action = MainMenuActionCreator.gotoFeedback();
                                break;
                            case "myProfile":
                                action = MainMenuActionCreator.gotoMyProfile();
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
                        label="Feedback"
                        value='feedback'
                        icon={<FeedbackIcon />}
                        component={Link}
                        to="/feedback" />
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