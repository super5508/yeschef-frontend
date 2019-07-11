import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseRounded";

const styles = theme => ({
	container: {
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		},
		[theme.breakpoints.up("sm")]: {
			width: "33%"
		}
	},
	background_img: {
		width: "100%"
	},
	chef_name: {
		textTransform: "uppercase"
	},
	closeIcon: {
		fontSize: "2rem"
	},
	iconBox: {
		width: "2.4rem",
		height: "2.4rem",
		backgroundColor: "rgba(0, 0, 0, 0.17)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "1.2rem",
        left: "1.2rem",
	}
});

class ClassInfo extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.container}>
				<img
					src={this.props.chefImg}
					className={classes.background_img}
					alt="Class thumbnail"
				/>
				<div className={classes.iconBox}>
					<IconButton aria-label="Close">
						<CloseIcon className={classes.closeIcon} />
					</IconButton>
				</div>
				<Box
					display="flex"
					alignItems="center"
					fontSize="1.6rem"
					flexDirection="column"
				>
					<Box
						fontWeight="fontWeightBold"
						className={classes.chef_name}
					>
						Chef {this.props.chefName}
					</Box>
					<Box className={classes.class_title}>
						{this.props.classTitle}
					</Box>
				</Box>
			</Card>
		);
	}
}

export default withStyles(styles)(ClassInfo);
