import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';



const styles = theme => ({
    signin_out_tabs:{
        flexGrow: 1,
        backgroundColor: "black",
    },
    tabs:{
        borderBottom: '1px solid #8484836b'
    },
    h1:{
        paddingTop:"2.4rem",
        paddingLeft:"2.4rem",
        paddingBottom:"0.3rem"
    }

});
class MyProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "signup"
        }

    }
    handleChange = (event, newValue) => {
        this.setState({
            ...this.state,
            value: newValue
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Box>
                <Typography className={classes.h1} variant="h1" component="h1">MY PROFILE</Typography>
                {/* if user logged out */}
                {!this.props.authStat.isLogin && (
                    <Paper className={classes.signin_out_tabs}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            centered
                            className={classes.tabs}
                            variant="fullWidth"
                        >
                            <Tab value="signup" label="Sign Up" />
                            <Tab value="signin" label="Sign In" />
                        </Tabs>
                        {this.state.value === "signin"? <SignIn></SignIn> : <SignUp></SignUp>}
                    </Paper>
                ) }

                {/* if user logged in */}
                {this.props.authStat.isLogin && <div>settings component</div>}
            </Box>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.user
    }
  }
export default withRouter(connect(mapStateToProps)(withStyles(styles)(MyProfilePage)));