import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { signout } from "../store/actionCreators/UserActionCreators";
import UserIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ForwardIcon from "@material-ui/icons/ArrowForwardIosRounded";


const styles = theme => ({
	setCon: {
		display: "flex",
		flexDirection: "column",
		alignItems: 'center',
		marginTop: '7.5rem',
		"& h2": {
			marginTop: "0.5rem"
		}
	},
	setImg: {
		height: "10rem",
		width: "10rem",
		// marginRight: "1rem"
	},
	pinkBg: {
		backgroundColor: "#ff007f"
	},
	userIcon: {
		color: "#f2f2f2",
		fontSize: "3.0rem"
	},
	listCon: {
		margin: '2rem 0rem',
		"& h4": {
			cursor: "pointer"
		}
	},
	lstItem: {
		display: 'flex',
		justifyContent: 'space-between',
		borderTop: '1px solid #7f7f7f',
		paddingLeft: '2.4rem',
		paddingRight: '2.4rem',
		paddingTop: '1.56rem',
		paddingBottom: '1.56rem'

	},
	bottomBorder: {
		borderBottom: '0.09rem solid #7f7f7f',
	},
	forwardIcon: {
		fontSize: '1.2rem'
	}
});

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	signOut = () => {
		window.firebaseAuth.signOut();
		this.props.dispatch(signout());
		window.Intercom('shutdown')
	};

	openChat = () => {
		window.Intercom('show')
	}

	render() {
		const { classes } = this.props;

		return (
			<Box>
				{this.props.authStat && this.props.authStat.userProfile && (
					<Box className={classes.setCon}>
						{this.props.authStat.userProfile.photoURL ? (
							<Avatar
								alt={
									this.props.authStat.userProfile.displayName
								}
								src={this.props.authStat.userProfile.photoURL}
								className={classes.setImg}
							/>
						) : (
								<Avatar
									alt={
										this.props.authStat.userProfile.displayName
									}
									className={clsx(classes.setImg, classes.pinkBg)}
								>
									<UserIcon className={classes.userIcon} />
								</Avatar>
							)}
						<div>
							<h2 style={{ marginBottom: '2rem' }}>
								{this.props.authStat.userProfile.displayName}
							</h2>
						</div>
					</Box>
				)}
				{/* //list */}
				<Box className={classes.listCon}>
					<div className={classes.lstItem} onClick={() => { this.props.history.push('/account') }}>
						<h4 className='body-text'>Account</h4>
						<IconButton
							aria-label="forward"
							size="small"
						>
							<ForwardIcon className={classes.forwardIcon} />
						</IconButton>
					</div>
					<div onClick={this.openChat} className={clsx(classes.lstItem)}>
						<h4 className='body-text'>Help</h4>
						<IconButton
							aria-label="forward"
							size="small"
						>
							<ForwardIcon className={classes.forwardIcon} />
						</IconButton>
					</div>
					<div onClick={this.signOut} className={clsx(classes.lstItem, classes.bottomBorder)}>
						<h4 className='body-text'>Sign out</h4>
					</div>
				</Box>
			</Box>
		);
	}
}

Settings.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		...state.user
	};
};

export default withRouter(
	connect(mapStateToProps)(withStyles(styles)(Settings))
);
