/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Axios from "../common/AxiosMiddleware";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import VideoPlayer from "../components/VideoPlayer";
import { Paper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import PlayButton from "../assets/images/play-btn.svg";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import SupplyInfo from '../components/Supplies';
import ShortHandDesc from '../components/ShortHandDesc';
import StepCard from '../components/StepCard';

function TabContainer({ children, dir }) {
	return (
		<div component="div" dir={dir}>
			{children}
		</div>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = theme => ({
	video_container: {
		position: "relative",
		height: "57vw"
	},
	video_overlay: {
		position: "absolute",
		height: "100%",
		width: "100%",
		top: 0,
		left: 0,
		padding: "2.3rem",
		paddingBottom: "1.6rem",
		display: "flex",
		transition: '0.6s',
		backgroundColor: "rgba(27, 26, 26, 0.7)",
		"& .Sub-h1": {
			textTransform: "none",
			marginBottom: "0.4rem"
		},
		"&.hide_on_play": {
			backgroundColor: "transparent",
		}
	},
	video_overlay_text: {
		flex: 1,
		alignSelf: 'flex-end',
		transition: '0.6s',
		"&.hide_on_play": {
			opacity: 0
		}
	},
	video_overlay_play: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		transition: '0.6s',
		"&.hide_on_play": {
			opacity: 0
		}
	},
	container2: {
		position: "fixed",
		top: 0,
		zIndex: "20",
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
	lessonContentCon: {
		marginTop: "58vw"
	},
	iconBox: {
		position: "fixed",
		top: "2rem",
		left: "2rem",
		zIndex: "21",
		width: "2.4rem",
		height: "2.4rem",
		backgroundColor: "rgba(0, 0, 0, 0.17)",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	backIcon: {
		fontSize: "1.5rem"
	},
	titleCon: {
		display: "flex",
		fontSize: "1.4rem",
		fontWeight: 600,
		paddingTop: "0.5rem",
		"& h1 ,h3": {
			fontSize: "inherit",
			fontWeight: "inherit",
			padding: 0,
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
		"& h1": {
			borderLeft: "1px solid #ffffff",
			paddingLeft: "1rem"
		},
		"& h3": {
			paddingRight: "1rem"
		}
	},
	contentCon: {
		margin: "0rem 2.3rem",
		"& h2": {
			fontSize: "1.6rem",
			fontWeight: 300,
			margin: 0
		},

		"& p": {
			marginTop: '2.4rem',
			marginBottom: '2.4rem'
		}
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "1.1rem"
	},
	iconsCon: {
		marginTop: "1.5rem",
		marginBottom: "0.8rem",
		padding: "2.2rem 2.3rem 0.2rem 2.3rem",
		borderTop: "0.3px solid rgba(255, 255, 255, 0.7)",

		"& p": {
			margin: 0,
			display: "flex",
			justifyContent: "center",
			alignItems: "center"
		},
		"& div": {
			display: "flex",
			marginBottom: "1rem"
		}
	},
	tabsRoot: {
		borderBottom: "0.01rem solid #929292"
	},
	tabRoot: {
		color: "#929292",
		fontWeight: 600,
		paddingBottom: "0rem",

		"&$tabSelected": {
			color: "#ffffff",
			fontSize: "1.4rem"
		}
	},
	tabSelected: {},
	subTabsCon: {
		margin: "2.3rem 2.3rem",
		"& h4": {
			fontSize: "1.6rem",
			fontWeight: 600,
			margin: 0,
			marginTop: "1.8rem"
		},
		"& ul": {
			color: "#ff007f",
			fontSize: "1.6rem",
			fontWeight: 300,
			padding: 0,
		},
		"& li": {
			marginTop: 8
		},
		"& li:first-child": {
			marginTop: 0
		},
		wrapper: {
			padding: 16
		}
	},
	gearul: {
		margin: "2rem 0rem 0rem 1rem !important"
	},
	feedbackH2: {
		textTransform: 'none',
		marginTop: '1.7rem'
	},
	feedbackTextarea: {
		marginTop: '1.1rem',
		marginBottom: '1.1rem',
		width: '32.7rem',
		height: '9.4rem',
		borderRadius: 6,
		border: 'solid 0.5px rgba(255, 255, 255, 0.7)',
		background: 'transparent',
		color: 'white',
		fontSize: '1.4rem',
		padding: '1.2rem',
	},
	sendFeebackButton: {
		width: '2.3rem',
		height: '3.6rem',
		float: 'right',
	}
});

const receipeItems =
	[
		{
			id: 0,
			title: 'Scrape ginger with a spoon',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			proTip: 'Hold spoon with first finger and thumbs at base of ginger then scrape.',
		},
		{
			id: 1,
			title: 'Scrape ginger with 2 spoons',
			content: '2nd step'
		},
		{
			id: 2,
			title: 'Scrape ginger with 3 spoons',
			content: '3rd step',
			proTip: 'Hold spoon with first finger and thumbs at base of ginger then scrape. #3',
		},
		{
			id: 3,
			title: 'Scrape ginger with 4 spoons',
			content: '4th step',
			proTip: 'Hold spoon with first finger and thumbs at base of ginger then scrape. #4',
		}
	];

class LessonPage extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			lessonData: {
				title: "",
				times: {},
				skills: [],
				ingredients: {},
				description: ""
			},
			videoSrc: undefined,
			isPlaying: false,
			skillsText: "",
			value: 0,
			ingredientsArray: [],
			handsOnText: "",
			TotalText: "",
			feedbackText: "",
			currentVideoTime: 0,
			swipeDisabled: false,
			scrollPos: [0, 0, 500, 0, 0],
			prevTab: 0,
		};

		Axios.get(`/class/${this.props.match.params.classId}/lesson/${this.props.match.params.lessonNum}`).then(lessonInfoResponse => {
			this.setState({
				...this.state,
				lessonData: lessonInfoResponse.data,
				videoSrc: lessonInfoResponse.data.videoUrl || ""
			});
			this.calcTimes();
		});
	}

	calcTimes = () => {
		let times = this.state.lessonData.times;
		let handsOnText = Object.values(times.handsOn || 0);
		let TotalText = Object.values(times.total || 0);
		handsOnText = Number(handsOnText);
		TotalText = Number(TotalText);

		if (handsOnText >= 60) {
			let hours = Math.floor(handsOnText / 60);
			let minutes = handsOnText % 60;
			handsOnText = hours + " hrs " + minutes + " min";
		} else {
			handsOnText = handsOnText + " min";
		}
		if (TotalText >= 60) {
			let hours = Math.floor(TotalText / 60);
			let minutes = TotalText % 60;
			TotalText = hours + " hrs " + minutes + " min";
		} else {
			TotalText = TotalText + " min";
		}

		this.setState({
			handsOnText: handsOnText,
			TotalText: TotalText
		});
	};

	firstLetterToCapital = str => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	handleFeedbackTextChange = (event) => {
		const feedbackText = event.target.value;
		if (this.state.isPlaying) {
			this.toggleVideo();
		}
		this.setState({ feedbackText });
	};

	updateTime = currentVideoTime => {
		this.setState({ currentVideoTime });
	};

	formatTime = timestamp => {
		const minutes = Math.floor(timestamp / 60);
		const seconds = Math.floor(timestamp % 60);
		return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	};

	submitFeedback = () => {
		if (this.state.feedbackText.trim()) {
			console.log({
				'userName': window.firebaseAuth.currentUser.displayName,
				'userId': window.firebaseAuth.currentUser.uid,
				'createdAt': (new Date()).toISOString(),
				'videoTime': this.formatTime(this.state.currentVideoTime),
				'timestamp': this.state.currentVideoTime,
				'comment': this.state.feedbackText
			});
			this.setState({ feedbackText: '' });
		}
	};

	handleChange = (event, value) => {
		this.setState({ value });

		let pos = this.state.scrollPos;
		pos[this.state.prevTab] = window.pageYOffset;
		this.setState({ scrollPos: pos, prevTab: value });
		setTimeout(() => window.scrollTo(0, this.state.scrollPos[value]), 100);

		if (value === 4) {
			this.setState({
				swipeDisabled: true
			});
		} else {
			this.setState({
				swipeDisabled: false
			});
		}
	};

	handleChangeIndex = (event, value) => {
		if (value === 3) {
			this.setState({
				swipeDisabled: true
			});
		} else {
			this.setState({
				swipeDisabled: false
			});
		}
	};

	toggleVideo = () => {
		this.setState({
			isPlaying: !this.state.isPlaying
		});
	};

	addHideOnPlayClass = classes => {
		return classes + (this.state.isPlaying ? ' hide_on_play' : '');
	};

	render = () => {
		const { classes, theme } = this.props;
		const { lessonData } = this.state
		const videoJsOptions = {
			autoplay: false,
			controls: false,
			sources: [
				{
					src: this.state.videoSrc
				}
			]
		};
		return (
			<Box>
				<Paper className={classes.container2}>
					<div className={classes.video_container} id="hero-video">
						{this.state.videoSrc &&
							<VideoPlayer {...videoJsOptions}
								isPlaying={this.state.isPlaying}
								classId={this.props.match.params.classId}
								lessonNum={this.props.match.params.lessonNum}
								updateTime={this.updateTime} />}
						<div className={this.addHideOnPlayClass(classes.video_overlay)}
							onClick={this.toggleVideo}>
							<div className={this.addHideOnPlayClass(classes.video_overlay_play)}>
								<img src={PlayButton} lat="playbutton" alt="img-product" />
							</div>
							<div className={this.addHideOnPlayClass(classes.video_overlay_text)}>
								<h1 className="Sub-h1">Lesson {this.props.match.params.lessonNum}</h1>
								<h2>{this.state.lessonData.title.toUpperCase()}</h2>
							</div>
						</div>
					</div>
				</Paper>
				<div className={classes.lessonContentCon}>
					<BackButton visible={!this.state.isPlaying} />
					<Header gradientBackground visible={!this.state.isPlaying} />
					{/* //tabs */}
					<div>
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							variant="fullWidth"
							classes={{ root: classes.tabsRoot }}
							variant="scrollable"
							scrollButtons="auto"
							style={{
								position: "sticky",
								zIndex: 20,
								top: "56vw",
								backgroundColor: "#000",
								marginTop: -15,
							}}
						>
							<Tab
								classes={{
									root: classes.tabRoot,
									selected: classes.tabSelected
								}}
								label="OVERVIEW"
							/>
							<Tab
								classes={{
									root: classes.tabRoot,
									selected: classes.tabSelected
								}}
								label="FEEDBACK"
							/>
							{/* dynamic tabs */}
							{(this.state.lessonData.supplies) && (
								<Tab
									classes={{
										root: classes.tabRoot,
										selected: classes.tabSelected
									}}
									label="SUPPLIES"
								/>
							)} */}
							{this.state.lessonData.shorthand && (
								<Tab
									classes={{
										root: classes.tabRoot,
										selected: classes.tabSelected
									}}
									label="SHORTHAND"
								/>
							)}
							<Tab
								classes={{
									root: classes.tabRoot,
									selected: classes.tabSelected
								}}
								label="STEPS"
							/>
						</Tabs>
						<SwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
							disabled={this.state.swipeDisabled}
						>
							<TabContainer dir={theme.direction}>
								<Box>
									<div className={classes.contentCon}>
										<p className='body-text'>{this.state.lessonData.description}</p>
									</div>
									<div className={classes.iconsCon}>
										<div>
											<h2 style={{ paddingRight: '1.2rem' }}>time</h2>
											<p className='body-text'>
												Hands-on: {this.state.handsOnText} | Total: {this.state.TotalText}
											</p>
										</div>
										{(lessonData.skills && lessonData.skills.length > 0) && (
											<div>
												<h2 style={{ paddingRight: '1.2rem' }}>skills</h2>
												<p className='body-text'>{this.state.lessonData.skills.map((item, id) => this.firstLetterToCapital(item)).join(' | ')}</p>
											</div>
										)}
										{lessonData.cuisine && lessonData.cuisine.length > 0 &&
											<div>
												<h2 style={{ paddingRight: '1.2rem' }}>cuisine</h2>
												<p className='body-text'>{this.state.lessonData.cuisine.map((item, id) => this.firstLetterToCapital(item)).join(' | ')}</p>
											</div>}

										{lessonData.dietary && lessonData.dietary.length > 0 &&
											<div>
												<h2 style={{ paddingRight: '1.2rem' }}>dietary</h2>
												<p className='body-text'>{this.state.lessonData.dietary.map((item, id) => this.firstLetterToCapital(item)).join(' | ')}</p>
											</div>}
									</div>
								</Box>
							</TabContainer>

							<TabContainer dir={theme.direction}>
								<Box className={classes.subTabsCon}>
									<h2 className={classes.feedbackH2}>Tell us what you think about this video</h2>
									<textarea
										name="feedbackText"
										value={this.state.feedbackText}
										onChange={this.handleFeedbackTextChange}
										className={classes.feedbackTextarea}
										placeholder={"Write your feedback here"}></textarea>
									<Button
										variant="contained"
										color="primary"
										className={classes.sendFeebackButton}
										onClick={this.submitFeedback}>
										SEND
									</Button>
								</Box>
							</TabContainer>
							{(this.state.lessonData.supplies) && (
								<TabContainer dir={theme.direction}>
									<Box className={classes.subTabsCon}>
										{lessonData.supplies.map((suppliesSegment, index) => {
											return (
												<SupplyInfo
													key={index}
													id={`supplies-${index}`}
													supplies={suppliesSegment}
												/>
											);
										})}
									</Box>
								</TabContainer>
							)}
							{this.state.lessonData.shorthand && (
								<TabContainer dir={theme.direction}>
									<Box className={classes.subTabsCon} style={{ margin: 24, marginTop: 32 }}>
										{Object.keys(this.state.lessonData.shorthand).map(
											(head, index) => {
												debugger;
												return (
													<ShortHandDesc
														key={index}
														head={head}
														shorthand={this.state.lessonData.shorthand}
														isFirst={index === 0 ? true : false}
													/>
												)
											})}
									</Box>
								</TabContainer>
							)}

							<TabContainer dir={theme.direction}>
								<Box>
									<StepCard items={receipeItems} />
								</Box>
							</TabContainer>
						</SwipeableViews>
					</div>
				</div>
			</Box>
		);
	}
}

export default withStyles(styles, { withTheme: true })(LessonPage);
