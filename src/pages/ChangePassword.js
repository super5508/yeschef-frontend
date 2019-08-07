import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { message } from "../store/actionCreators/UserActionCreators";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
	h1: {
		// paddingTop: "2.4rem",
		paddingBottom: "2rem"
	},
	textFieldLabel: {
		fontSize: "1.4rem",
		fontWeight: 300
	},
	backIcon: {
		fontSize: "2.0rem",
		margin: "0rem 0rem 0.2rem 0rem"
	},
	submitBtn: {
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
	errorSpan: {
		fontFamily: "Open Sans",
		fontSize: '11px',
		fontWeight: '600',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		color: '#cf6679',
		marginLeft: '1.2rem',
	},
	buttonProgress: {
		color: '#ff007f',
		position: 'absolute',
		left: '45%',
		marginTop: 8,
	},
});

const CssTextField = withStyles({
	root: {
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: 'White'
			},
			"&.Mui-error fieldset": {
				borderColor: '#cf6679',
			},
		},
		"& .MuiFormLabel-root.Mui-focused": {
			color: 'White'
		},
	}

})(TextField);

const useStyles = makeStyles({
	//dialog styles come here
	dialogCon: {
		backgroundColor: "#ffffff",
		height: "27.9rem",
		width: "27.9rem",
		borderRadius: "0.8rem",
		"& h5": {
			fontSize: "1.4rem",
			fontWeight: 300,
			color: "#333333",
			textAlign: "center",
			margin: "0.8rem 0rem 6rem 0rem"
		}
	},
	closeIcon: {
		color: "#333333",
		fontSize: "1.4rem",
		margin: "1.2rem 0rem 0rem 1.6rem"
	},
	dialogBtn: {
		height: "4.4rem",
		borderRadius: "0.6rem",
		width: "24.7rem",
		fontSize: "1.4rem",
		fontWeight: 600
	},
	dialogContent: {
		textAlign: "center",
		marginTop: "5rem"
	},
	circle: {
		width: "3rem",
		height: "3rem",
		borderRadius: "50%",
		backgroundColor: "#ff007f",
		margin: "0rem auto",
		paddingTop: "0.1rem"
	},
});

function PasswordChangedDialog(props) {
	const classes = useStyles();
	const { onClose, ...other } = props;

	function handleClose() {
		onClose();
	}

	return (
		<Dialog onClose={handleClose} aria-labelledby="alertDialog" {...other}>
			<Box className={classes.dialogCon}>
				<IconButton aria-label="Close" size="small" onClick={handleClose}>
					<CloseIcon className={classes.closeIcon} />
				</IconButton>
				<div className={classes.dialogContent}>
					<div className={classes.circle}>
						<DoneIcon />
					</div>
					<h5>
						Password changed <br />
						successfuly
					</h5>
					<Button
						variant="contained"
						className={classes.dialogBtn}
						color="primary"
						onClick={handleClose}
					>
						OK
					</Button>
				</div>
			</Box>
		</Dialog>
	);
}

PasswordChangedDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool
};

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buttonText: 'change password',
			currentPassword: "",
			newPassword: "",
			open: false,
			currPwdError: '',
			newPwdError: '',
			loading: false
		};
		this.curPwdRef = React.createRef();
	}

	handleClickOpen = () => {
		this.setState({ autoFocus: true });
	};

	handleClose = value => {
		this.setState({ open: false }, () => {
			this.props.history.push("/myProfile");
		});
	};

	handleChange = event => {
		if (event.target.id === 'currentPassword') {
			this.setState({ currPwdError: '' })
		}
		if (event.target.id === 'newPassword' && event.target.value.length > 5) {
			this.setState({ newPwdError: '' })
		}

		this.setState({
			[event.target.id]: event.target.value
		});
	};

	inputValid = () => {
		let formIsValid = true;
		let { currentPassword, newPassword, currPwdError, newPwdError } = this.state;

		if (!currentPassword) {
			formIsValid = false
			currPwdError = 'Current password is required'
		}

		else if (!newPassword) {
			formIsValid = false
			newPwdError = 'New password is required'
		}

		else if (newPassword.length < 6) {
			formIsValid = false
			newPwdError = 'new password must have at least 6 characters'
		}

		else if (currentPassword && currentPassword.toLowerCase() === newPassword.toLowerCase()) {
			formIsValid = false
			newPwdError = 'You used this password recently. Please enter different one'
		}

		this.setState({ currPwdError, newPwdError })
		return formIsValid
	}

	submitPassword = () => {
		let { currentPassword, currPwdError } = this.state;
		//change password
		const valid = this.inputValid()
		if (valid) {

			this.setState({ loading: true, buttonText: 'updating password', currPwdError: '', newPwdError: '' })
			var user = window.firebase.auth().currentUser;
			var credentials = window.firebase.auth.EmailAuthProvider.credential(
				user.email,
				currentPassword
			);
			user
				.reauthenticateWithCredential(credentials)
				.then((response) => {
					// User re-authenticated.
					//changing Password
					user
						.updatePassword(this.state.newPassword)
						.then(() => {
							this.setState({ loading: false, buttonText: 'change password', currentPassword: '', newPassword: '' })
							// Update successful.
							this.handleClickOpen();
							this.props.dispatch(message('pwd_change_success'));
							this.props.history.push('/account')
						})
						.catch(function (error) {
							// An error happened.
							// #Todo change the alert to a real error message popup
							this.setState({ loading: false, buttonText: 'Change password' })
							alert(error.message);
						});
				})
				.catch((error) => {
					currPwdError = 'Current password is incorrect'
					this.setState({ currPwdError, loading: false, buttonText: 'Change password' })
				});
		}
	};

	render() {
		const { classes } = this.props;
		const { currentPassword, newPassword, currPwdError, newPwdError, loading, buttonText } = this.state
		const labelsProps = {
			className: classes.textFieldLabel
		};
		return (
			<div>
				<div className='iconBox' onClick={() => this.props.history.goBack()}>
					<IconButton aria-label="Close">
						<CloseIcon className='closeIcon' />
					</IconButton>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '100vh', alignItems: 'center', alignContent: 'center', paddingLeft: '2.4rem', paddingRight: '2.4rem', }}>
					<h1 className={classes.h1} style={{ alignSelf: 'flex-start' }}>
						CHANGE PASSWORD
								</h1>
					<form onSubmit={this.submitPassword}>
						<CssTextField
							id="currentPassword"
							label="Current password"
							type="password"
							helperText={currPwdError ? currPwdError : <span className="classes.errorSpan"></span>}
							error={currPwdError !== ''}
							FormHelperTextProps={{ error: currPwdError !== '' }}
							value={currentPassword}
							name='currPwdError'
							className={classes.textField}
							margin="normal"
							onChange={this.handleChange}
							InputLabelProps={labelsProps}
							variant="outlined"
							fullWidth={true}
						/>


						<CssTextField
							id="newPassword"
							helperText={newPwdError ? newPwdError : <span className="classes.errorSpan"></span>}
							error={newPwdError !== ''}
							FormHelperTextProps={{ error: newPwdError !== '' }}
							label="New password"
							type="password"
							value={newPassword}
							onFocus={this.clearError}
							name='newPwdError'
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
								className={classes.submitBtn}
								color='primary'
								onClick={this.submitPassword}
								disabled={loading}
							>
								{buttonText}
							</Button>
							{loading && <CircularProgress className={classes.buttonProgress} />}
						</Box>
					</form>
				</div >
				<PasswordChangedDialog
					open={this.state.open}
					onClose={this.handleClose}
				/>
			</div >
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.user
	};
};
export default withRouter(
	connect(mapStateToProps)(withStyles(styles)(ChangePassword))
);
