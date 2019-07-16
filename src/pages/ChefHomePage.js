import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Axios from "../common/AxiosMiddleware";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import WatchLaterIcon from "@material-ui/icons/WatchLaterRounded";
import PlayIcon from "@material-ui/icons/PlayCircleFilledRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import ClassInfo from "../components/ClassInfo";
import { Link } from "react-router-dom";

const styles = theme => ({
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
	classDesc: {
		"& p": {
			fontSize: "1.6rem",
			fontWeight: 300,
			margin: "2rem 2.4rem"
		}
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "0.8rem",
		marginTop: 0
	}
});
class ChefHomePage extends Component {
	constructor(props, context) {
		super(props);
        this.state = {
            chefsData: {}
        };
		Axios.get(`api/class/${this.props.match.params.id}?prefetch=true`).then(
			chefInfoResponse => {            console.log('dd',chefInfoResponse)

				this.setState({
					...this.state,
					chefsData: chefInfoResponse.data
				});}
        );}
        
	render() {
		const { classes } = this.props;

		return (
			<div>
				<ClassInfo {...this.state.chefsData} showCross={true} />

				{/* //'start the class' button  */}
				<Box className={classes.btncon}>
					<Link to={"/"} style={{ textDecoration: "none" }}>
						<Button
							variant="contained"
							className={classes.startBtn}
							color="primary"
							// onClick={#}
						>
							START THE CLASS
						</Button>
					</Link>
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
						Bourbon was always a working man’s drink and I want to
						always respect that when I cook with bourbon. Every sip
						of bourbon I take transports me to another time and
						place kind of like this distillery. We are really
						drinking history and that’s why I love it so much.{" "}
					</p>
				</Box>
			</div>
		);
	}
}

export default withStyles(styles)(ChefHomePage);
