import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const styles = theme => ({
	lessonInfoCon: {
		display: "flex",
		marginBottom: "0.9rem",
		"& img": {
			width: "16.7rem",
			height: "9.5rem",
			marginRight: "1.2rem"
		},
		"& p": {
			margin: "0rem",
			marginBottom: "0.2rem"
		},
		"& h3": {
			margin: "0rem"
		}
	},
	duration: {
		position: "relative",
		bottom: "3rem",
		left: "12.5rem",
		width: "3.6rem",
		height: "1.6rem",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
	},
	commingSoonTag: {
		position: "relative",
		bottom: "9.3rem",
		left: "0.8rem",
	}
});

class LessonInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textColor: "#ffffff",
			imgOpacity: 1,
			filter: "none",
			cursor: "pointer"
		};
	}

	componentDidMount() {
		if (this.props.commingSoon === true) {
			this.setState({
				textColor: "#929292",
				imgOpacity: 0.4,
				filter: "alpha(opacity=40)",
				cursor: "auto"
			});
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<Box
				className={classes.lessonInfoCon}
				style={{
					color: this.state.textColor,
					cursor: this.state.cursor
				}}
				onClick={() => {
					if (!this.props.commingSoon) {
						this.props.history.push(
							"/class/"+this.props.match.params.id +"/lesson/"+this.props.lessonNum

						// this.props.history.push("/class/"+this.props.match.params.id+"/lesson/"+this.props.lessonNum
						// this.props.history.push("/lesson/" + this.props.match.params.id + "/" + this.props.lessonNum

						);
					}
				}}
			>
				<div>
					<img
						src={this.props.thumbnail}
						style={{
							opacity: this.state.imgOpacity,
							filter: this.state.filter
						}}
					/>

					{!this.props.commingSoon && (
						<div className={classes.duration + ' Tiny-text'}>
							{this.props.duration}
						</div>
					)}

					{this.props.commingSoon && (
						<div className={ classes.commingSoonTag + ' Tiny-text-pink'}>
							COMING SOON
						</div>
					)}
				</div>
				<div>
					<p className='Input-text'>Lesson {this.props.lessonNum}</p>
					<h3>{this.props.title}</h3>
				</div>
			</Box>
		);
	}
}

export default withStyles(styles)(LessonInfo);
