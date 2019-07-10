import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

const styles = theme => ({
	h1: {
		paddingTop: "2.4rem",
		paddingBottom: "0.3rem"
	},
	textFieldLabel: {
		fontSize: "1.4rem",
		fontWeight: 300
	},
	backIcon: {
		fontSize: "2.0rem",
		margin: "0rem 0.2rem 0.2rem 1rem"
	},
	submitBtn: {
		height: "4.4rem",
		borderRadius: "0.6rem",
		width: "32.7rem",
		fontSize: "1.4rem",
		fontWeight: 600
	},
	btncon: {
		marginTop: "1.5rem"
	}
});

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
	}
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
			currentPassword: "",
			newPassword: "",
			open: false
		};
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = value => {
		this.setState({ open: false }, () => {
			this.props.history.push("/myProfile");
		});
	};

	handleChange = event => {
		this.setState({
			...this.state,
			[event.target.id]: event.target.value
		});
	};

	submitPassword = () => {
		//change password
		let that = this;
		var user = window.firebase.auth().currentUser;
		var credentials = window.firebase.auth.EmailAuthProvider.credential(
			user.email,
			this.state.currentPassword
		);
		user
			.reauthenticateWithCredential(credentials)
			.then(function(response) {
				// User re-authenticated.
				if (that.state.newPassword.length === 0) {
					//change the alert to a real error message popup
					alert("Please enter a valid New Password");
				} else {
					//changing Password
					user
						.updatePassword(that.state.newPassword)
						.then(function() {
							// Update successful.
							that.handleClickOpen();
						})
						.catch(function(error) {
							// An error happened.
							//change the alert to a real error message popup
							alert(error.message);
						});
				}
			})
			.catch(function(error) {
				// An error happened.
				//change the alert to a real error message popup
				alert(error.message);
			});
	};

	render() {
		const { classes } = this.props;
		const labelsProps = {
			className: classes.textFieldLabel
		};
		return (
			<Box>
				<Typography className={classes.h1} variant="h1" component="h1">
					<IconButton
						aria-label="Go Back"
						onClick={() => {
							this.props.history.push("/myProfile");
						}}
					>
						<BackIcon className={classes.backIcon} />
					</IconButton>
					CHANGE PASSWORD
				</Typography>
				<Box width="100%" pl="2.4rem" pr="2.4rem">
					<form onSubmit={this.submitPassword}>
						<CssTextField
							id="currentPassword"
							label="Current password"
							type="password"
							className={classes.textField}
							margin="normal"
							onChange={this.handleChange}
							InputLabelProps={labelsProps}
							variant="outlined"
							fullWidth={true}
						/>
						<CssTextField
							id="newPassword"
							label="New password"
							type="password"
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
								color="primary"
								onClick={this.submitPassword}
							>
								change password
							</Button>
						</Box>
					</form>
				</Box>
				<PasswordChangedDialog
					open={this.state.open}
					onClose={this.handleClose}
				/>
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
	connect(mapStateToProps)(withStyles(styles)(ChangePassword))
);
