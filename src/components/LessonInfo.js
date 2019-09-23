import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
	lessonInfoCon: {
		display: "flex",
		marginBottom: "0.9rem",
		position: 'relative',
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
		},
	},
	progress: {
		width: '16.7rem',
		top: 'calc(9.5rem - 4px)',
		position: 'absolute',
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
	},
	'lessonListLabel': {
		fontFamily: "Open Sans",
		fontSize: '14px',
		fontWeight: '300',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: '1',
		letterSpacing: 'normal',
		color: '#ffffff',
	},

	'lessonListHeading': {
		fontFamily: "Open Sans",
		fontSize: '14px',
		fontWeight: '600',
		fontStyle: 'normal',
		fontStretch: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		color: '#ffffff',
	},

	loadingBar: {
		color: '#FF007F',
		backgroundColor: '#FFFFFF',
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

	getCurProgress = (duration, progress) => {
		const min = parseInt(duration.split(':')[0], 10);
		const sec = parseInt(duration.split(':')[1], 10);
		const total = min * 60 + sec;
		const now = parseInt(progress.split(':')[0], 10) * 60 + parseInt(progress.split(':')[1], 10);
		return 100 * now / total;
	}

	render() {
		const { classes, curProgress, duration } = this.props;
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
							"/class/" + this.props.match.params.id + "/lesson/" + this.props.lessonNum

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
					{
						this.getCurProgress(duration, curProgress) !== 0 && (
							<div className={classes.progress}>
								<LinearProgress value={this.getCurProgress(duration, curProgress)} variant="determinate" className={classes.loadingBar} />
							</div>
						)
					}
				</div>
				<div>
					<p className={classes.lessonListLabel}>Lesson {this.props.lessonNum}</p>
					<h3 className={classes.lessonListHeading}>{this.props.title}</h3>
				</div>
			</Box>
		);
	}
}

export default withStyles(styles)(LessonInfo);
