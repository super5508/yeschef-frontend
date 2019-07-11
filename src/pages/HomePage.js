import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ClassInfo from "../components/ClassInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "../common/AxiosMiddleware";
import WatchLaterIcon from "@material-ui/icons/WatchLaterRounded";
import PlayIcon from "@material-ui/icons/PlayCircleFilledRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";

const styles = theme => ({
	container: {},
	margins: {
		paddingLeft: "2.4rem",
		paddingRight: "2.4rem"
	},
	cta_wrapper: {
		paddingTop: "3.4rem",
		paddingBottom: "3.9rem"
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "0.8rem",
		marginTop: 0
	},
	iconsContainer: {
		display: "flex",
		justifyContent: "space-between",
		margin: "2rem 2.4rem",

		"& div": {
			display: "flex",
			alignItems: "center"
		},
		"& p": {
			fontSize: "1.4rem",
			fontWeight: 300,
			display: "inline-block",
			margin: 0
		}
	},
	alignCenter: {
		justifyContent: "center"
	},
	alignRight: {
		justifyContent: "flex-end"
	},
	startBtn: {
		height: "4.4rem",
		borderRadius: "0.6rem",
		width: "32.7rem",
		fontSize: "1.4rem",
		fontWeight: 600
	},
	btncon: {
		margin: "2.5rem 0rem 0.2rem 0rem",
		textAlign: "center"
	},
	classDesc:{
		"& p": {
			fontSize: "1.6rem",
			fontWeight: 300,
			margin: "2rem 2.4rem",
		}
	}
});
class HomePage extends Component {
	state = { chefsDataArray: [] };
	constructor(props) {
		super(props);

		Axios.get("/api/classes").then(chefInfoResponse => {
			console.log(chefInfoResponse);
			this.setState({
				...this.state,
				chefsDataArray: chefInfoResponse.data
			});
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<Box>
				{/* //if user is not loged in */}
				{!this.props.authStat.isLogin && (
					<Box
						display="flex"
						flexDirection="column"
						className={`${classes.margins} ${classes.cta_wrapper}`}
						p={2}
					>
						<Box
							fontWeight="fontWeightBold"
							fontSize="1.8rem"
							pb={1}
						>
							Access the knowledge, secrets and tricks of the
							world’s best chefs
						</Box>
						<Box
							fontWeight="fontWeightLight"
							fontSize="1.6rem"
							pb={1.6}
						>
							Get unlimited access to an ever-growing library of
							exclusive classes
						</Box>
						{/* <Link to="/signup" underline="none"> */}
						<Button
							component={Link}
							to="/signup"
							size="large"
							variant="contained"
							color="primary"
							className={classes.button}
						>
							<Box fontWeight="fontWeightBold" fontSize="1.4rem">
								GET ACCESS
							</Box>
						</Button>
						{/* </Link> */}
					</Box>
				)}
				{/* <Box
					fontWeight="fontWeightBold"
					fontSize="1.8rem"
					pb={1.4}
					className={`${classes.margins}`}
				>
					OUR CLASSES
				</Box> */}
				{this.state.chefsDataArray.map(chefData => (
					<div>
						<Link to={"/class/" + chefData.id}>
							<ClassInfo
								key={chefData.id}
								className={classes.class_info}
								{...chefData}
							/>
						</Link>

						{/* //start the class button  */}
						<Box className={classes.btncon}>
							<Button
								variant="contained"
								className={classes.startBtn}
								color="primary"
								// onClick={#}
							>
								START THE CLASS
							</Button>
						</Box>

						{/* //hour-lesson-skill bar */}
						<div className={classes.iconsContainer}>
							<div
								style={{
									borderRight: "0.1rem solid #ffffff",
									paddingRight: "2rem"
								}}
							>
								<WatchLaterIcon className={classes.icon} />
								<p>3 hours</p>
							</div>
							<div className={classes.alignCenter}>
								<PlayIcon className={classes.icon} />
								<p>10 lessons</p>
							</div>
							<div
								className={classes.alignRight}
								style={{
									borderLeft: "0.1rem solid #ffffff",
									paddingLeft: "2rem"
								}}
							>
								<CheckIcon className={classes.icon} />
								<p>5 skills</p>
							</div>
						</div>

						{/* //Class description */}
						<Box className={classes.classDesc}>
							<p>
								Bourbon was always a working man’s drink and I
								want to always respect that when I cook with
								bourbon. Every sip of bourbon I take transports
								me to another time and place kind of like this
								distillery. We are really drinking history and
								that’s why I love it so much.{" "}
							</p>
						</Box>
					</div>
				))}
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
	connect(mapStateToProps)(withStyles(styles)(HomePage))
);
