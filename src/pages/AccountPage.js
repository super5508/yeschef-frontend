import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "../store/actionCreators/UserActionCreators";
import IconButton from "@material-ui/core/IconButton";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Header from '../components/Header';
import AccountComponent from '../components/AccountComponent'
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    icon: {
        color: "rgba(255, 255, 255, 0.7)",
        marginRight: "0.8rem",
        marginTop: 0
    },
    closeIcon: {
        fontSize: "3rem"
    },
    iconBox: {
        width: "2.4rem",
        height: "2.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "1.2rem",
        left: "1.2rem",
        zIndex: '45'
    },
});
class AccountPage extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            vertical: 'bottom',
            horizontal: 'center',
            message: ''
        }
    }

    componentDidMount() {
        if (this.props.message.message_type === 'pwd_change_success') {

            this.setState({ open: true, message: 'Password changed successfully' })
            this.props.dispatch(message(''));
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    snack = () => {
        const { vertical, open, horizontal, message } = this.state
        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                autoHideDuration={3000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message}</span>}
            />
        )
    }


    render() {
        const { classes } = this.props;

        return (
            <Box>
                <Header />

                {/* //left arrow button */}
                <div className={classes.iconBox}>
                    <Link to="/myProfile" underline="none">
                        <IconButton aria-label="Close">
                            <LeftIcon className={classes.closeIcon} />
                        </IconButton>
                    </Link>
                </div>

                {/* if user logged in */}
                {this.props.authStat.isLogin && <AccountComponent />}

                {this.snack()}
            </Box>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.user
    };
};
export default withRouter(
    connect(mapStateToProps)(withStyles(styles)(AccountPage)));
