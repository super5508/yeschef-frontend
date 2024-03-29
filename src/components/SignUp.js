import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Divider, Button } from "@material-ui/core";
import { withRouter, Link } from "react-router-dom";
import fbLogo from "../assets/images/fbLogo.svg";
import googleLogo from "../assets/images/googleLogo.svg";
import auth from "./../common/auth";
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

const styles = theme => ({
	container: {
		"& .Mui-focused fieldset": {
			borderColor: "white",
		},
		paddingTop: "2.4rem",
		[theme.breakpoints.down('sm')]: {
			width: "100%",
			paddingLeft: "2.4rem",
			paddingRight: "2.4rem",
		},
		[theme.breakpoints.up('sm')]: {
			width: '400px',
			margin: 'auto'
		}
	},
	loginWith: {
		flexDirection: "column",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "3.5rem",
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
	textFieldLabel: {
		fontSize: '1.4rem',
		fontWeight: 300
	},
	boldDivider: {
		height: "2px"
	},
	fbButton: {
		backgroundColor: "#4367b2",
		color: "white",
		paddingRight: "1.2rem",
		paddingLeft: "1.2rem"
	},
	googleButton: {
		backgroundColor: "white",
		paddingRight: "1.5rem",
		paddingLeft: "1.5rem",
		marginTop: '2.4rem'
	},
	signUpBtn: {
		marginTop: '2.4rem',
		width: '100%',
	},
	tos_ppContainer: {
		marginTop: "2.6rem",
		marginRight: "4rem",
		marginLeft: "4rem",
		fontFamily: "Open Sans",
		fontSize: '1.4rem',
		fontWeight: '300',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textAlign: 'center',
		color: 'rgba(255, 255, 255, 0.8)',
	},
	input: {
		fontFamily: 'Open Sans',
		fontSize: '14px',
		fontWeight: '300',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: '1',
		letterSpacing: 'normal',
		color: '#ffffff',
	},
	grayText: {
		color: 'rgba(255, 255, 255, 0.8)',
	},
});

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			nameError: "",
			emailError: "",
			pwdError: ""
		};
	}


	nameValid = () => {
		let formIsValid = true;
		let { name, nameError } = this.state

		if (!name) {
			formIsValid = false
			nameError = 'Name is required'
		}

		this.setState({ nameError })
		return formIsValid
	}
  
	pwdValid = () => {
		let formIsValid = true;
		let { password, pwdError } = this.state

		if (!password) {
			formIsValid = false
			pwdError = 'Password is required'
		}

		else if (password.length + 1 < 6) {
			formIsValid = false
			pwdError = 'Password needs to be at least 6 characters long'
		}

    this.setState({ pwdError })
		return formIsValid
	}

	handleChange = event => {

		let { nameError, emailError, pwdError } = this.state

		if (nameError && this.nameValid()) {
			this.setState({ nameError: '' })
		}

		emailError && this.setState({ emailError: FieldsValidation.checkEmailValid(this.state.email).emailError });

		if (pwdError && this.pwdValid()) {
			this.setState({ pwdError: '' })
		}

		this.setState({
			[event.target.id]: event.target.value
		});
	};


	inputValid = () => {
		const nameValid = this.nameValid()
		const isEmailValid = FieldsValidation.checkEmailValid(this.state.email).isValid;
		const pwdValid = this.pwdValid()

		let formIsValid = true;

		if (!nameValid || !isEmailValid || !pwdValid) {
			formIsValid = false
		}

		return formIsValid
	}


	submitSignUp = event => {
		event.preventDefault();
		const that = this
		const valid = this.inputValid()
		if (valid) {
			var firebaseAuthPromise = window.firebaseAuth.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			);

			firebaseAuthPromise.catch(function (error) {
				// Handle Errors here.
				//var errorCode = error.code;
				var errorMessage = error.message;
				if (errorMessage === 'The email address is already in use by another account.') {
					that.setState({ emailError: 'The email address is already in use by another account' })
				}
				if (errorMessage === 'Password should be at least 6 characters') {
					that.setState({ pwdError: 'Password needs to be at least 6 characters long' })
				}
				// #Todo change the alert to a real error message popup
			});

			firebaseAuthPromise.then(response => {
				if (!response) return;

				response.user.updateProfile({
					displayName: this.state.name
				});
			});
		}
	};

	validateEmail = () => {
		const { emailError } = FieldsValidation.checkEmailValid(this.state.email);
		this.setState({ emailError });
	}

	signUpWith = provider => {
		let signUpPromise;
		switch (provider) {
			case "google":
				signUpPromise = auth.doGoogleSignIn();
				break;
			case "facebook":
				signUpPromise = auth.doFacebookSignIn();
				break;
			default:
		}

		signUpPromise.then(
			() => {
				//Is success signup, redirect to home
				this.props.history.push("/home");
			},
			msg => {
				// #Todo change the alert to a real error message popup
				alert(msg);
			}
		);
	};

	render() {
		const { classes } = this.props;
		const labelsProps = {
			className: classes.textFieldLabel
		};
		const { name, email, password, nameError, emailError, pwdError } = this.state

		return (
			<Box
				className={classes.container}
			>
				<Box className={classes.loginWith}>
					<Button
						variant="contained"
						className={classes.fbButton}
						size="large"
						onClick={() => this.signUpWith("facebook")}
					>
						<Box pr="0.7rem" display="flex">
							<img src={fbLogo} alt="Facebook Logo" />
						</Box>
						<Box fontSize="1.4rem" fontWeight="600">
							USE FACEBOOK
						</Box>
					</Button>

					<Button
						variant="contained"
						className={classes.googleButton}
						size="large"
						onClick={() => this.signUpWith("google")}
					>
						<Box pr="0.7rem" display="flex">
							<img src={googleLogo} alt="Google Logo" />
						</Box>
						<Box fontSize="1.4rem" fontWeight="600">
							USE GOOGLE
						</Box>
					</Button>
				</Box>
				<Box
					flexDirection="row"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					fontWeight="600"
					mb="1rem"
					mt='-1rem'
				>
					<Divider width="40%" className={classes.boldDivider} />
					<span className='Button-text'>OR</span>
					<Divider width="40%" className={classes.boldDivider} />
				</Box>
				<form
					className={classes.loginWith}
					autoComplete="on"
					onSubmit={this.submitSignUp}
				>
					<CssTextField
						id="name"
						label="Name"
						helperText={nameError ? nameError : ""}
						error={nameError !== ''}
						FormHelperTextProps={{ error: nameError !== '' }}
						value={name}
						InputLabelProps={labelsProps}
						margin="normal"
						variant="outlined"
						onBlur={this.nameValid}
						fullWidth={true}
						onChange={this.handleChange}
					/>
					<CssTextField
						id="email"
						label="Email"
						helperText={emailError ? emailError : ""}
						error={emailError !== ''}
						FormHelperTextProps={{ error: emailError !== '' }}
						value={email}
						InputLabelProps={labelsProps}
						type="email"
						onBlur={this.validateEmail}
						autoComplete="email"
						className={classes.textField}
						margin="normal"
						variant="outlined"
						fullWidth={true}
						onChange={this.handleChange}
					/>
					<CssTextField
						id="password"
						label="Password"
						helperText={pwdError ? pwdError : "At least 6 characters"}
						error={pwdError !== ''}
						FormHelperTextProps={{ error: pwdError !== '' }}
						value={password}
						onBlur={this.pwdValid}
						InputLabelProps={labelsProps}
						type="password"
						autoComplete="current-password"
						className={classes.textField}
						margin="normal"
						variant="outlined"
						fullWidth={true}
						onChange={this.handleChange}
					/>

					<Button
						variant="contained"
						color="primary"
						className={classes.signUpBtn}
						onClick={this.submitSignUp}
					>
						<Box fontWeight="600" fontSize="1.4rem">
							SIGN UP
						</Box>
					</Button>
				</form>
				<Box className={classes.tos_ppContainer}>
					By signing up, you agree to our <br />
					<Link
						to="/privacy-policy"
						underline="always"
						className={classes.grayText}
					>
						{" "}
						Privacy Policy{" "}
					</Link>
					&nbsp; and &nbsp;
					<Link
						to="/terms-of-service"
						underline="always"
						className={classes.grayText}
					>
						Terms Of Service
					</Link>
					.
				</Box>
			</Box>
		);
	}
}

SignUp.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		...state.mainMenu
	};
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SignUp)));
