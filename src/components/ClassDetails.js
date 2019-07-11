import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import WatchLaterIcon from "@material-ui/icons/WatchLaterRounded";
import PlayIcon from "@material-ui/icons/PlayCircleFilledRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";

const styles = theme => ({
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
	}
});

class ClassDetails extends Component {
	state = { chefsDataArray: [] };
	constructor(props) {
		super(props);
	}
	render() {
		const { classes } = this.props;
		return (
			<Box>
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
						style={{ borderLeft: "0.1rem solid #ffffff", paddingLeft: "2rem" }}
					>
						<CheckIcon className={classes.icon} />
						<p>5 skills</p>
					</div>
				</div>
			</Box>
		);
	}
}

export default withStyles(styles)(ClassDetails);
