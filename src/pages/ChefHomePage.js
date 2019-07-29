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
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseRounded";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import InstagramIcon from "../assets/images/instagram-icon.png";
import FacebookIcon from "../assets/images/facebook-icon.svg";
import TwitterIcon from "../assets/images/twitter-icon.svg";
import LessonInfo from "../components/LessonInfo";
import { Element, animateScroll as scroll, scroller } from "react-scroll";

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
	iconsContainer: {
		display: "flex",
		justifyContent: "space-between",
		margin: "2rem 2.4rem",

		"& div": {
			display: "flex",
			alignItems: "center"
		},
		"& p": {
			display: "inline-block",
			margin: 0
		}
	},
	lessonsContainer: {
		margin: "3rem 2.4rem"
	},
	alignCenter: {
		justifyContent: "center"
	},
	alignRight: {
		justifyContent: "flex-end"
	},
	startBtn: {
		borderRadius: "0.6rem",
		fontSize: "1.4rem",
		fontWeight: 600,
		padding: "1.8rem 0rem"
	},
	btncon: {
		margin: "57vw 2.4rem 0.8rem 2.4rem",
		paddingTop: "2.4rem",
		textAlign: "center"
	},
	classDesc: {
		"& p": {
			margin: "2rem 2.4rem"
		},
		"& span": {
			fontFamily: 'Open Sans',
			fontSize: '16px',
			fontWeight: '600',
			fontStyle: 'normal',
			fontStretch: 'normal',
			lineHeight: 'normal',
			letterSpacing: 'normal',
			color: '#ffffff',
			// fontSize: "1.6rem",
			// fontWeight: 600
		}
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "0.8rem",
		marginTop: 0
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
		left: "1.2rem"
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
	socialBtnsCon: {
		display: "flex",
		justifyContent: "center"
	}
});
class ChefHomePage extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			chefsData: {
				lessons: [],
				skills: [],
				social: {
					facebook: undefined,
					instegram: undefined,
					twitter: undefined
				}
			},
			value: 0
		};

		Axios.get(
			`/api/class/${this.props.match.params.id}?prefetch=true`
		).then(chefInfoResponse => {
			// console.log("d2", chefInfoResponse);
			this.setState({
				...this.state,
				chefsData: chefInfoResponse.data
			});
			this.scrollToLesson();
		});
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	scrollToLesson = () => {
		// console.log("state", this.props.location.state);
		if (this.props.location.state) {
			scroller.scrollTo(`lessonNum${this.props.location.state}`, {
				duration: 0,
				delay: 0,
				smooth: "false",
				offset: -300, 
			});
		}
	};

	render() {
		const { classes, theme } = this.props;
		return (
			<div>
				<ClassInfo {...this.state.chefsData} showTrailer={false} fixed />
				{/* //close button */}
				<div className={classes.iconBox}>
					<Link to="/" underline="none">
						<IconButton aria-label="Close">
							<CloseIcon className={classes.closeIcon} />
						</IconButton>
					</Link>
				</div>

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
				<div>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor="primary"
						variant="fullWidth"
						classes={{ root: classes.tabsRoot }}
					>
						<Tab
							classes={{
								root: classes.tabRoot,
								selected: classes.tabSelected
							}}
							className='Button-text'
							label="CLASS"
						/>
						<Tab
							classes={{
								root: classes.tabRoot,
								selected: classes.tabSelected
							}}
							label="ABOUT"
						/>
					</Tabs>

					<SwipeableViews
						axis={theme.direction === "rtl" ? "x-reverse" : "x"}
						index={this.state.value}
						onChangeIndex={this.handleChangeIndex}
					>
						<TabContainer dir={theme.direction}>
							{/* //class tab */}

							{/* //hour-lesson-skill bar */}
							<div className={classes.iconsContainer}>
								<div
									style={{
										borderRight: "0.1rem solid #ffffff",
										width: "32%"
									}}
								>
									<WatchLaterIcon className={classes.icon} />
									<p className='Input-text'>{this.state.chefsData.duration} hours</p>
								</div>
								<div className={classes.alignCenter}>
									<PlayIcon className={classes.icon} />
									<p className='Input-text'>
										{this.state.chefsData.lessons.length}{" "}
										lessons
									</p>
								</div>
								<div
									className={classes.alignRight}
									style={{
										borderLeft: "0.1rem solid #ffffff",
										width: "32%"
									}}
								>
									<CheckIcon className={classes.icon} />
									<p className='Input-text'>
										{this.state.chefsData.skills.length}{" "}
										skills
									</p>
								</div>
							</div>

							{/* //Class description */}
							<Box className={classes.classDesc}>
								<p className='body-text'>{this.state.chefsData.description}</p>
							</Box>
							{/* //lessons list */}
							<div className={classes.lessonsContainer}>
								{this.state.chefsData.lessons.map(
									(lessonData, id) => {
										return (
											<Element
												key={`lessonNum${id}`}
												name={`lessonNum${id + 1}`}
												className="element"
											>
												<LessonInfo
													key={`lessonNum${id}`}
													lessonNum={id + 1}
													duration={
														lessonData.duration
													}
													title={lessonData.title}
													thumbnail={
														lessonData.thimbnail
													}
													commingSoon={
														lessonData.commingSoon
													}
													history={this.props.history}
													match={this.props.match}
												/>
											</Element>
										);
									}
								)}
							</div>
						</TabContainer>

						<TabContainer dir={theme.direction}>
							{/* //about tab */}
							{/* //Class description */}
							<Box className={classes.classDesc}>
								<p className='body-text'>
									<span>
										Chef {this.state.chefsData.chefName}
									</span>{" "}
									{this.state.chefsData.about}
								</p>
							</Box>

							{/* //social icons */}
							<Box className={classes.socialBtnsCon}>
								{this.state.chefsData.social.twitter && (
									<IconButton
										aria-label="Twitter"
										onClick={() => {
											window.open(
												this.state.chefsData.social
													.twitter,
												"_blank"
											);
										}}
									>
										<img src={TwitterIcon} />
									</IconButton>
								)}

								{this.state.chefsData.social.instegram && (
									<IconButton
										aria-label="Instagram"
										onClick={() => {
											window.open(
												this.state.chefsData.social
													.instegram,
												"_blank"
											);
										}}
									>
										<img src={InstagramIcon} />
									</IconButton>
								)}

								{this.state.chefsData.social.facebook && (
									<IconButton
										aria-label="Facebook"
										onClick={() => {
											window.open(
												this.state.chefsData.social
													.facebook,
												"_blank"
											);
										}}
									>
										<img src={FacebookIcon} />
									</IconButton>
								)}
							</Box>
						</TabContainer>
					</SwipeableViews>
				</div>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ChefHomePage);
