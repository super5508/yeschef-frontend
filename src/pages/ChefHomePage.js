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
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import InstagramIcon from "../assets/images/instagram-icon.png";
import FacebookIcon from "../assets/images/facebook-icon.svg";
import TwitterIcon from "../assets/images/twitter-icon.svg";
import LessonInfo from "../components/LessonInfo";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import Header from '../components/Header'
import indexeddbTools from "./../common/indexeddbTools";


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
		margin: "100vw 2.4rem 0.8rem 2.4rem",
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
		}
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "0.8rem",
		marginTop: 0
	},
	closeIcon: {
		fontSize: "3rem"
	},
	iconBox: {
		width: "2.4rem",
		height: "2.4rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "1.2rem",
		left: "1.2rem",
		zIndex: '45'
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
			comingSoonLessons: [],
			lessons: [],
			value: 0
		};
		const classId = this.props.match.params.id;
		indexeddbTools.getYCIndexedDB((event) => {
			const ycDB = event.target.result;
			const objectStore = ycDB.transaction(indexeddbTools.constants.PLAYER_STATUS_STORE_NAME).objectStore(indexeddbTools.constants.PLAYER_STATUS_STORE_NAME);
			objectStore.index("classId").getAll(classId).onsuccess = (event) => {
				const lastLesson = event.target.result.sort().pop();
				if (lastLesson) {
					this.setState({ ...this.state, continueWatching: lastLesson.lessonNum });
				}
			};
		})


		Axios.get(
			`/api/class/${this.props.match.params.id}?prefetch=true`
		).then(chefInfoResponse => {
			// console.log("d2", chefInfoResponse);
			const availableLessons = chefInfoResponse.data.lessons.filter(classObj => !classObj.commingSoon);
			const comingSoonLessons = chefInfoResponse.data.lessons.filter(classObj => classObj.commingSoon);

			this.setState({
				...this.state,
				chefsData: chefInfoResponse.data,
				lessons: availableLessons,
				comingSoonLessons: comingSoonLessons,
			});
			this.scrollToLesson();
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0)
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
				offset: -400,
			});
		}
	};

	render() {
		const { classes, theme } = this.props;
		return (
			<div>
				<Header gradientBackground />
				<ClassInfo {...this.state.chefsData} showTrailer={true} noLinkTag fixed />
				{/* //left arrow button */}
				<div className={classes.iconBox}>
					<Link to="/home" underline="none">
						<IconButton aria-label="Close">
							<LeftIcon className={classes.closeIcon} />
						</IconButton>
					</Link>
				</div>

				{/* //'start the class' button  */}
				<Box className={classes.btncon}>
					<Link to={this.state.continueWatching ? "lesson/" + this.state.continueWatching : "lesson/1"} style={{ textDecoration: "none" }}>
						<Button
							variant="contained"
							className={classes.startBtn}
							color="primary"
						// onClick={#}
						>
							{this.state.continueWatching ? "CONTINUE WATCHING" : "START THE CLASS"}
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
								<Box pb='1.7rem'>
									<h2>lessons</h2>
								</Box>
								{this.state.lessons.map(
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
													history={this.props.history}
													match={this.props.match}
												/>
											</Element>
										);
									}
								)}
							</div>

							{/* //commingsoon lessons list */}
							{this.state.comingSoonLessons.length ?
								<div className={classes.lessonsContainer}>
									<Box pb='1.7rem'>
										<h2 className='h2-light'>coming soon</h2>
									</Box>
									{this.state.comingSoonLessons.map(
										(lessonData, id) => {
											return (
												<Element
													key={`lessonNum${this.state.lessons.length + id}`}
													name={`lessonNum${this.state.lessons.length + id + 1}`}
													className="element"
												>
													<LessonInfo
														key={`lessonNum${id}`}
														lessonNum={this.state.lessons.length + id + 1}
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
								: ''
							}
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
