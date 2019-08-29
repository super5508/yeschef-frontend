import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import { message } from "../store/actionCreators/UserActionCreators";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from '@material-ui/core/CircularProgress';
import FieldValidation from '../common/FieldsValidation'

const CssTextField = withStyles({
    root: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "white"
            },
            "&.Mui-error fieldset": {
                borderColor: '#cf6679',
            },
        },
        "& .MuiFormLabel-root.Mui-focused": {
            color: "white"
        }
    }
})(TextField);


const styles = theme => ({
    h1: {
        paddingTop: "2.4rem",
        paddingBottom: "0.5rem"
    },
    backIcon: {
        fontSize: "2.0rem",
        margin: "0rem 0.2rem 0.2rem 1rem"
    },
    textFieldLabel: {
        fontSize: "1.4rem",
        fontWeight: 300
    },
    changeBtn: {
        borderRadius: "0.6rem",
        fontSize: "1.4rem",
        fontWeight: 600,
        "&:disabled": {
            backgroundColor: "#aaaaaa",
            color: '#6d6d6d'
        },

        "&:hover": {
            "&:disabled": {
                backgroundColor: "#aaaaaa",
                color: '#6d6d6d'
            },
        }
    },
    btncon: {
        position: 'relative',
        marginTop: "1.5rem"
    },
    userEmail: {
        alignSelf: 'flex-start',
        textTransform: 'lowercase',
        marginTop: '-10px',
        marginBottom: '1.4rem'
    },
    buttonProgress: {
        color: '#ff007f',
        position: 'absolute',
        left: '45%',
        marginTop: 8,
    },

});

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: "",
            password: "",
            emailError: "",
            pwdError: "",
            buttonText: 'change email',
            loading: false
        };
    }

    emailValid = () => {

        let { emailError } = FieldValidation.checkEmailValid(this.state.email)
        this.setState({ emailError })
    }


    pwdValid = () => {

        let { pwdError } = FieldValidation.checkPwdValid(this.state.password)
        this.setState({ pwdError })
    }


    handleChange = event => {

        let { emailError, pwdError } = this.state


        emailError && this.setState({ emailError: FieldValidation.checkEmailValid(this.state.email).emailError })

        pwdError && this.setState({ pwdError: FieldValidation.checkPwdValid(this.state.password).pwdError })


        this.setState({
            [event.target.id]: event.target.value
        });
    };

    inputValid = () => {
        const { isValid, emailError } = FieldValidation.checkEmailValid(this.state.email)
        const { isPwdValid, pwdError } = FieldValidation.checkPwdValid(this.state.password)

        this.setState({ emailError, pwdError })

        return (isValid && isPwdValid)
    }

    changeEmail = () => {
        let { email, password } = this.state;
        //change password
        const valid = this.inputValid()
        if (valid) {

            var user = window.firebase.auth().currentUser;
            this.setState({ loading: true, buttonText: 'updating email' })
            var credentials = window.firebase.auth.EmailAuthProvider.credential(
                user.email,
                password
            );
            user
                .reauthenticateWithCredential(credentials)
                .then((response) => {
                    // User re-authenticated.
                    //changing Password
                    user
                        .updateEmail(email)
                        .then(() => {
                            this.setState({ loading: false, buttonText: 'change email', password: '', email: '' })
                            // Update successful.
                            this.props.dispatch(message('email_change_success'));
                            this.props.history.push('/account')
                        })
                        .catch((error) => {
                            // An error happened.
                            // #Todo change the alert to a real error message popup
                            this.setState({ loading: false, buttonText: 'Change email' })
                        });
                })
                .catch((error) => {
                    if (error.message === 'The password is invalid or the user does not have a password.') {

                        this.setState({ pwdError: 'Password is incorrect', loading: false, buttonText: 'Change password' })
                    }
                });
        }
    };

    render() {
        const { classes } = this.props;
        const labelsProps = {
            className: classes.textFieldLabel
        };

        const { email, password, emailError, pwdError, buttonText, loading } = this.state

        return (
            <Box>
                <div className='iconBox' onClick={() => this.props.history.goBack()}>
                    <IconButton aria-label="Close">
                        <CloseIcon className='closeIcon' />
                    </IconButton>
                </div>
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center', alignContent: 'center', paddingLeft: '2.4rem', paddingRight: '2.4rem', }}>
                    <h1 className={classes.h1} style={{ alignSelf: 'flex-start' }}>
                        CHANGE ACCOUNT EMAIL
				</h1>
                    <p className=' body-text' style={{ alignSelf: 'flex-start' }}>Current email</p>
                    {this.props.authStat && this.props.authStat.userProfile &&
                        <h2 className={classes.userEmail}>{this.props.authStat.userProfile.email}</h2>
                    }
                    <Box width="100%">
                        <form onSubmit={this.changeEmail}>
                            <CssTextField
                                helperText={emailError ? emailError : ""}
                                error={emailError !== ''}
                                FormHelperTextProps={{ error: emailError !== '' }}
                                value={email}
                                id="email"
                                label="New email"
                                type="email"
                                onBlur={this.emailValid}
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange}
                                InputLabelProps={labelsProps}
                                variant="outlined"
                                fullWidth={true}
                            />

                            <CssTextField
                                id="password"
                                label="Current password"
                                type="password"
                                helperText={pwdError ? pwdError : ""}
                                error={pwdError !== ''}
                                FormHelperTextProps={{ error: pwdError !== '' }}
                                value={password}
                                name='currPwdError'
                                onBlur={this.pwdValid}
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange}
                                InputLabelProps={labelsProps}
                                variant="outlined"
                                fullWidth={true}
                            />

                            <Box className={classes.btncon}>
                                <Button
                                    variant="contained"
                                    className={classes.changeBtn}
                                    color="primary"
                                    onClick={this.changeEmail}
                                    disabled={loading}
                                >
                                    {buttonText}
                                </Button>
                                {loading && <CircularProgress className={classes.buttonProgress} />}
                            </Box>
                        </form>
                    </Box>
                </Box>
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
    connect(mapStateToProps)(withStyles(styles)(ChangeEmail))
);
