import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Axios from "../common/AxiosMiddleware";
import Box from "@material-ui/core/Box";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import IconButton from "@material-ui/core/IconButton";
import VideoPlayer from "../components/VideoPlayer";
import { Paper } from "@material-ui/core";
import WatchLaterIcon from "@material-ui/icons/WatchLaterRounded";
import CheckIcon from "@material-ui/icons/CheckCircleRounded";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";


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
		}
	},
	icon: {
		color: "rgba(255, 255, 255, 0.7)",
		marginRight: "1.1rem"
	},
	iconsCon: {
		marginTop: "1.5rem",
		marginBottom: "0.8rem",
		padding: "1.2rem 2.3rem 0.2rem 2.3rem",
		borderTop: "0.2px solid rgba(255, 255, 255, 0.7)",
		borderBottom: "0.2px solid rgba(255, 255, 255, 0.7)",

		"& p": {
			fontSize: "1.4rem",
			fontWeight: 300,
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
	ingredientsCon:{
		margin: "0rem 2.3rem",
		"& h4": {
			fontSize: "1.6rem",
			fontWeight: 600,
			margin:0,
			marginTop:'1.8rem'
		},
		"& ul": {
			color:'#ff007f',
			fontSize: "1.6rem",
			fontWeight: 300,
			padding: 0,
			margin: '0rem 0rem 0rem 1.6rem',
			
		},
		"& li": {
			marginTop:'0.5rem',
		}
	}
});

class LessonPage extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			chefsData: {
				title: "",
				times: {},
				skils: [],
				ingredients: {}
			},
			videoSrc: undefined,
			timesText: "",
			skillsText: "",
			value: 0,
			ingredientsArray: []
		};

		Axios.get(`/api/lesson/l0${this.props.match.params.id}`).then(
			chefInfoResponse => {
				console.log("d3", chefInfoResponse);
				this.setState({
					...this.state,
					chefsData: chefInfoResponse.data,
					videoSrc: chefInfoResponse.data.video
				});
				this.getTimes();
				this.getSkills();
				if (this.state.chefsData.ingredients) {
					this.getIngredients();
				}
			}
		);
	}

	getTimes = () => {
		let data = this.state.chefsData.times;
		let string = "";
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				if (Number(data[key]) >= 60) {
					let hours = Math.floor(Number(data[key]) / 60);
					let minutes = Number(data[key]) % 60;
					string =
						string +
						key +
						": " +
						hours +
						" hrs " +
						minutes +
						" min | ";
				} else {
					string = string + key + ": " + data[key] + " min | ";
				}
			}
		}
		string = string.slice(0, string.length - 2);
		this.setState({
			timesText: string
		});
	};

	getIngredients = () => {
		//sorting ingredients
		let ingredients = this.state.chefsData.ingredients;
		let ingredientsArray = [];
		Object.keys(ingredients).map((value, index) => {
			ingredientsArray.push(value);
		});
		this.setState({ ingredientsArray: ingredientsArray });
	};

	getSkills = () => {
		let data = this.state.chefsData.skils;
		let string = "";
		data.map((lessonData, id) => {
			string = string + lessonData + " | ";
		});
		string = string.slice(0, string.length - 2);
		this.setState({
			skillsText: string
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes, theme } = this.props;
		let url = this.props.match.url;
		let classId = url.substring(8, url.lastIndexOf("/"));

		const videoJsOptions = {
			autoplay: true,
			controls: true,
			sources: [
				{
					src: this.state.videoSrc
				}
			]
		};

		return (
			<Box>
				<Paper className={classes.container2}>
					<div className={classes.video_container}>
						{this.state.videoSrc && (
							<VideoPlayer {...videoJsOptions} />
						)}
					</div>
				</Paper>
				<div className={classes.lessonContentCon}>
					<div className={classes.iconBox}>
						<IconButton
							aria-label="Close"
							onClick={() => {
								this.props.history.push({
									pathname: `/class/${classId}`,
									state: this.props.match.params.id
								});
							}}
						>
							<BackIcon className={classes.backIcon} />
						</IconButton>
					</div>

					{/* lessonInfo */}
					<div className={classes.contentCon}>
						<div className={classes.titleCon}>
							<h3>{this.props.match.params.id}</h3>
							<h1>{this.state.chefsData.title.toUpperCase()}</h1>
						</div>
						<h2>
							Grilling is the oldest and simplest of cooking
							techniques but it takes a lifetime to master the art
							of live fire.
						</h2>
					</div>
					<div className={classes.iconsCon}>
						<div>
							<WatchLaterIcon className={classes.icon} />
							<p>{this.state.timesText}</p>
						</div>
						<div>
							<CheckIcon className={classes.icon} />
							<p>{this.state.skillsText}</p>
						</div>
					</div>

					{/* //tabs */}
					<div>
						<Tabs
							value={this.state.value}
							onChange={this.handleChange}
							indicatorColor="primary"
							variant="fullWidth"
							classes={{ root: classes.tabsRoot }}
							style={{position: '-webkit-sticky',position:'sticky',zIndex:20,top:'57vw', backgroundColor:'#000'}}
									>
							{/* dynamic tabs */}
							{this.state.chefsData.ingredients && (
								<Tab
									classes={{
										root: classes.tabRoot,
										selected: classes.tabSelected
									}}
									label="INGREDIENTS"

								/>
							)}
							{this.state.chefsData.gear && (
								<Tab
									classes={{
										root: classes.tabRoot,
										selected: classes.tabSelected
									}}
									label="GEAR"
								/>
							)}
							{this.state.chefsData.shorthand && (
								<Tab
									classes={{
										root: classes.tabRoot,
										selected: classes.tabSelected
									}}
									label="SHORTHAND"
								/>
							)}
						</Tabs>
						<SwipeableViews
							axis={theme.direction === "rtl" ? "x-reverse" : "x"}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
						>
							{this.state.chefsData.ingredients && (
								<TabContainer dir={theme.direction}>
									<Box className={classes.ingredientsCon}>
										{this.state.ingredientsArray.map(
											(head, id) => {
												return (
													<div key={`${head}-${id}`}>
														<h4>{head.toUpperCase()}</h4>
														<ul>
														{Object.keys(this.state.chefsData.ingredients[head]
														).map(
															(value, index) => {
																// console.log('2',this.state.chefsData.ingredients[head][value])
																let unit =this.state.chefsData.ingredients[head][value].unit;
																let quantity =this.state.chefsData.ingredients[head][value].quantity;
																let comment =this.state.chefsData.ingredients[head][value].comment;
																if(comment) {comment = '- '+comment}
																return(
																	<li key={`li${value}-${index}`}><span style={{color:'#ffffff'}}>{quantity} {unit} {value} {comment}</span></li>
																)
															}
														)}
														</ul>
													</div>
												);
											}
										)}

										<br />
										<br />
										<br />
										<br />
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTabdemoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
										demoDataToCheckTab
									</Box>
								</TabContainer>
							)}
							{this.state.chefsData.gear && (
								<TabContainer dir={theme.direction}>
									<Box>gear</Box>
								</TabContainer>
							)}
							{this.state.chefsData.shorthand && (
								<TabContainer dir={theme.direction}>
									<Box>shorthand</Box>
								</TabContainer>
							)}
						</SwipeableViews>
					</div>
				</div>
			</Box>
		);
	}
}

export default withStyles(styles, { withTheme: true })(LessonPage);
