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

const CssTextField = withStyles({
	root: {
		"& .MuiOutlinedInput-root": {
			"&.Mui-focused fieldset": {
				borderColor: "white"
			}
		},
		"& .MuiFormLabel-root.Mui-focused": {
			color: "white"
		}
	}
})(TextField);

const styles = theme => ({
    container: {
        '& .Mui-focused fieldset': {
            borderColor: 'white',
        },
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
		marginTop:'1.6rem'
    },
    signUpBtn: {
        marginTop: '1.6rem',
        width: '100%',
    },
    tos_ppContainer: {
        marginTop: "2.6rem",
        fontSize: "1.2rem",
        color: "#929292",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginRight: "4rem",
        marginLeft: "4rem"
    },
    grayText: {
        color: "#929292"
	},
	fullWidth_button:{
		width:'100%',
		height:'5.6rem',
		borderRadius:'0.6rem'
	}
});

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: ""
		};
	}

	handleChange = event => {
		this.setState({
			...this.state,
			[event.target.id]: event.target.value
		});
	};

	submitSignUp = event => {
		event.preventDefault();

		var firebaseAuthPromise = window.firebaseAuth.createUserWithEmailAndPassword(
			this.state.email,
			this.state.password
		);

		firebaseAuthPromise.catch(function(error) {
			// Handle Errors here.
			//var errorCode = error.code;
			var errorMessage = error.message;
			// #Todo change the alert to a real error message popup
			alert(errorMessage);
		});

		firebaseAuthPromise.then(response => {
			if (!response) return;

			response.user.updateProfile({
				displayName: this.state.name
			});
		});
	};

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
				this.props.history.push("/");
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

		return (
			<Box
				width="100%"
				pl="2.4rem"
				pr="2.4rem"
				pt="2.4rem"
				className={classes.container}
			>
				<Box className={classes.loginWith}>
					<Button
						variant="contained"
						className={classes.fbButton + ' ' + classes.fullWidth_button}
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
						className={classes.googleButton + ' ' + classes.fullWidth_button}
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
					mb="1.9rem"
				>
					<Divider width="40%" className={classes.boldDivider} />
					OR
					<Divider width="40%" className={classes.boldDivider} />
				</Box>
				<form
					className={classes.container}
					autoComplete="on"
					onSubmit={this.submitSignUp}
				>
					<CssTextField
						id="name"
						label="Name"
						InputLabelProps={labelsProps}
						className={classes.textField}
						margin="normal"
						variant="outlined"
						fullWidth={true}
						onChange={this.handleChange}
					/>
					<CssTextField
						id="email"
						label="Email"
						InputLabelProps={labelsProps}
						type="email"
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
						className={classes.signUpBtn + ' ' + classes.fullWidth_button}
						onClick={this.submitSignUp}
					>
						<Box fontWeight="600" fontSize="1.4rem">
							SIGN UP
						</Box>
					</Button>
				</form>
				<Box className={classes.tos_ppContainer}>
					By signing up, you agree to our &nbsp;
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
