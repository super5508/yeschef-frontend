import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FieldsValidation from "../common/FieldsValidation";

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

const useStyles = makeStyles({
	//dialog styles come here
	dialogCon: {
		backgroundColor: "#ffffff",
		height: "24.9rem",
		width: "27.9rem",
		borderRadius: "0.8rem",
		"& h5": {
			fontFamily: "Open Sans",
			fontSize: '1.6rem',
			fontWeight: '300',
			fontStyle: 'normal',
			fontStretch: 'normal',
			lineHeight: 'normal',
			letterSpacing: 'normal',
			color: '#000000',
			alignSelf: 'center',
			margin: "3rem 0rem 4rem 0rem"
		}
	},
	closeIcon: {
		color: "#333333",
		fontSize: "2.4rem",
		position: 'absolute',
		left: '24rem',
		top: '1rem',
	},
	dialogBtn: {
		height: "4.4rem",
		borderRadius: "0.6rem",
		width: "24.7rem",
		fontSize: "1.4rem",
		fontWeight: 600,
		alignSelf: 'center',
	},
	dialogContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: "3rem",
	},
	circle: {
		width: "3rem",
		height: "3rem",
		borderRadius: "50%",
		backgroundColor: "#ff007f",
		margin: "0rem auto"
	},
	textIcon: {
		fontSize: "2rem",
		fontWeight: 600,
		color: "#ffffff"
	}
});

function PasswordResetDialog(props) {
	const classes = useStyles();
	const { onClose, ...other } = props;

	function handleClose() {
		onClose();
	}

	function goToEmail() {
		onClose();
	}

	return (
		<Dialog onClose={handleClose} aria-labelledby="alertDialog" {...other}>
			<Box className={classes.dialogCon}>
				<IconButton
					aria-label="Close"
					size="small"
					onClick={handleClose}
				>
					<CloseIcon className={classes.closeIcon} />
				</IconButton>
				<div className={classes.dialogContent}>
					{/* <div className={classes.circle}>
							<span className={classes.textIcon}>i</span>
						</div> */}
					<h5>
						You'll receive an email shortly. <br />
						Please check your inbox and <br />
						follow the instructions.
					</h5>
					<Button
						variant="contained"
						className={classes.dialogBtn}
						color="primary"
						onClick={goToEmail}
					>
						GO TO MY EMAIL
					</Button>
				</div>
			</Box>
		</Dialog>
	);
}

PasswordResetDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool
};

const styles = theme => ({
	h1: {
		paddingTop: "2.4rem",
		paddingBottom: "1.5rem"
	},
	backIcon: {
		fontSize: "2.0rem",
		margin: "0rem 0.2rem 0.2rem 1rem"
	},
	textFieldLabel: {
		fontSize: "1.4rem",
		fontWeight: 300
	},
	resetBtn: {
		borderRadius: "0.6rem",
		fontSize: "1.4rem",
		fontWeight: 600
	},
	btncon: {
		marginTop: "1.5rem"
	},

});

class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			email: "",
			emailError: ""
		};
	}

	handleChange = event => {
		let { emailError } = this.state

		emailError && this.setState({ emailError: FieldsValidation.checkEmailValid(this.state.email).emailError });

		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = value => {
		this.setState({ open: false }, () => {
			this.props.history.goBack()
		});
	};

	inputValid = () => {
		const { isValid, emailError } = FieldsValidation.checkEmailValid(this.state.email);
		this.setState({ emailError });
		return isValid;
	}

	validateEmail = () => {
		const { emailError } = FieldsValidation.checkEmailValid(this.state.email);
		this.setState({ emailError });
	}

	resetPassword = () => {
		//reset password
		const valid = this.inputValid()

		var auth = window.firebase.auth();
		if (valid) {

			auth.sendPasswordResetEmail(this.state.email)
				.then((response) => {
					console.log(response)
					// Update successful.
					this.handleClickOpen();
				})
				.catch((error) => {
					// An error happened.
					// @Todo change the alert to a real error message popup
					if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
						this.setState({ emailError: "There's no Yeschef account with the following email" })
					}
				});
		}
	};

	render() {
		const { classes } = this.props;
		const labelsProps = {
			className: classes.textFieldLabel
		};
		const { email, emailError } = this.state
		return (
			<Box>
				<IconButton
					aria-label="Go Back"
					style={{ position: 'absolute' }}
					onClick={() => {
						this.props.history.goBack();
					}}
				>
					<BackIcon className={classes.backIcon} />
				</IconButton>
				<Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: '90vh', alignItems: 'center', alignContent: 'center', paddingLeft: '2.4rem', paddingRight: '2.4rem', }}>
					<h1 className={classes.h1} style={{ alignSelf: 'flex-start' }}>
						RESET YOUR PASSWORD
				</h1>
					<Box width="100%">
						<form onSubmit={this.resetPassword}>
							<CssTextField
								helperText={emailError ? emailError : ""}
								error={emailError !== ''}
								FormHelperTextProps={{ error: emailError !== '' }}
								value={email}
								id="email"
								label="Email"
								type="email"
								onBlur={this.validateEmail}
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
									className={classes.resetBtn}
									color="primary"
									onClick={this.resetPassword}
								>
									OK
							</Button>
							</Box>
						</form>
					</Box>
					<PasswordResetDialog
						open={this.state.open}
						onClose={this.handleClose}
					/>
				</Box>
			</Box>
		);
	}
}

export default withStyles(styles)(ResetPassword);
