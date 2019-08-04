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
	subTabsCon: {
		margin: "0rem 2.3rem",
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
			margin: "0rem 0rem 0rem 1.6rem"
		},
		"& li": {
			marginTop: "0.5rem"
		}
	},
	gearul:{
		margin: "2rem 0rem 0rem 1rem !important"

	}
});

class LessonPage extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			chefsData: {
				title: {
					stringValue: ""
				},
				times: {},
				skils: [],
				ingredients: {},
				description: {}
			},
			videoSrc: undefined,
			skillsText: "",
			value: 0,
			ingredientsArray: [],
			handsonText: "",
			TotalText: "",
		};

		Axios.get(`/api/class/${this.props.match.params.classId}/lesson/${this.props.match.params.lessonId - 1}`).then(chefInfoResponse => {
			this.setState({
				...this.state,
				chefsData: chefInfoResponse.data._fieldsProto,
				videoSrc: chefInfoResponse.data._fieldsProto.video.stringValue
			});
			this.getTimes();
			this.getSkills();
			if (this.state.chefsData.ingredients) {
				this.getIngredients();
			}
		});
	}

	getTimes = () => {
		let data = this.state.chefsData.times.mapValue.fields;
		let handsonText = Object.values(data.handsOn)[0];
		let TotalText = Object.values(data.total)[0];
		handsonText = Number(handsonText);
		TotalText = Number(TotalText);

		if (handsonText >= 60) {
			let hours = Math.floor(handsonText / 60);
			let minutes = handsonText % 60;
			handsonText = hours + " hrs " + minutes + " min";
		} else {
			handsonText = handsonText + " min";
		}
		if (TotalText >= 60) {
			let hours = Math.floor(TotalText / 60);
			let minutes = TotalText % 60;
			TotalText = hours + " hrs " + minutes + " min";
		} else {
			TotalText = TotalText + " min";
		}

		this.setState({
			handsonText: handsonText,
			TotalText: TotalText
		});
	};

	getIngredients = () => {
		//sorting ingredients
		let ingredients = this.state.chefsData.ingredients.mapValue.fields;
		let ingredientsArray = [];
		Object.keys(ingredients).map((value, index) => {
			ingredientsArray.push(value);
		});
		this.setState({ ingredientsArray: ingredientsArray });
	};

	getSkills = () => {
		let data = this.state.chefsData.skills.arrayValue.values;

		const skillsString = data.map((lessonData, id) => this.firstLetterToCapital(lessonData.stringValue)).join(' | ');
		this.setState({
			skillsText: skillsString
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	decimalToFraction = amount => {
		// This is a whole number and doesn't need modification.
		if (parseFloat(amount) === parseInt(amount)) {
			return amount;
		}
		// Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
		var gcd = function (a, b) {
			if (b < 0.0000001) {
				return a;
			}
			return gcd(b, Math.floor(a % b));
		};
		var len = amount.toString().length - 2;
		var denominator = Math.pow(10, len);
		var numerator = amount * denominator;
		var divisor = gcd(numerator, denominator);
		numerator /= divisor;
		denominator /= divisor;
		var base = 0;
		// In a scenario like 3/2, convert to 1 1/2
		// by pulling out the base number and reducing the numerator.
		if (numerator > denominator) {
			base = Math.floor(numerator / denominator);
			numerator -= base * denominator;
		}
		amount = Math.floor(numerator) + "/" + Math.floor(denominator);
		if (base) {
			amount = base + " " + amount;
		}
		return amount;
	};

	firstLetterToCapital = str => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	};

	render() {
		const { classes, theme } = this.props;
		const videoJsOptions = {
			autoplay: false,
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
					<div className={classes.video_container}>{this.state.videoSrc && <VideoPlayer {...videoJsOptions} />}</div>
				</Paper>
				<div className={classes.lessonContentCon}>
					<div className={classes.iconBox}>
						<IconButton
							aria-label="Close"
							onClick={() => {
								this.props.history.push({
									pathname: `/class/${this.props.match.params.classId}`,
									state: this.props.match.params.lessonId
								});
							}}
						>
							<BackIcon className={classes.backIcon} />
						</IconButton>
					</div>

					{/* lessonInfo */}
					<div className={classes.contentCon}>
						<div className={classes.titleCon}>
							<h3>{this.props.match.params.lessonId}</h3>
							<h1>{this.state.chefsData.title.stringValue.toUpperCase()}</h1>
						</div>
						<p className='body-text'>{this.state.chefsData.description.stringValue}</p>
					</div>
					<div className={classes.iconsCon}>
						<div>
							<WatchLaterIcon className={classes.icon} />
							<p>
								Hands-on: {this.state.handsonText} | Total: {this.state.TotalText}
							</p>
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
							style={{
								position: "-webkit-sticky",
								position: "sticky",
								zIndex: 20,
								top: "57vw",
								backgroundColor: "#000"
							}}
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
									<Box className={classes.subTabsCon}>
										{this.state.ingredientsArray.map((head, id) => {
											return (
												<div key={`${head}-${id}`}>
													<h4>{head.toUpperCase()}</h4>
													<div>
														{
															Object.keys(this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields).map(
																(value, index) => {
																	let comment = "";
																	if (
																		this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[value]
																			.mapValue.fields.comment
																	) {
																		comment = this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[
																			value
																		].mapValue.fields.comment.stringValue;
																		comment = "- " + comment;
																	}

																	let unit = "";
																	if (
																		this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[value]
																			.mapValue.fields.unit
																	) {
																		unit = this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[
																			value
																		].mapValue.fields.unit.stringValue;
																	}

																	let quantity = "";
																	if (
																		this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[value]
																			.mapValue.fields.quantity
																	) {
																		quantity = Object.values(
																			this.state.chefsData.ingredients.mapValue.fields[head].mapValue.fields[value]
																				.mapValue.fields.quantity
																		)[0];
																	}

																	return (
																		<ul key={value}>
																			<li key={`li${value}-${index}`}>
																				<span
																					style={{
																						color: "#ffffff"
																					}}
																				>
																					{this.decimalToFraction(quantity)} {unit} {value} {comment}
																				</span>
																			</li>
																		</ul>
																	);
																}
															)}
													</div>
												</div>
											);
										})}
									</Box>
								</TabContainer>
							)}
							{this.state.chefsData.gear && (
								<TabContainer dir={theme.direction}>
									<Box className={classes.subTabsCon}>
										<ul className={classes.gearul}>
											{
												Object.keys(this.state.chefsData.gear.mapValue.fields).map(
													(data, index) => {
														return (

															<li key={`ligear-${index}`} >
																<span
																	style={{
																		color: "#ffffff"
																	}}
																>
																	{this.firstLetterToCapital(data)}																				</span>
															</li>
														)
													}
												)
											}
										</ul>
									</Box>
								</TabContainer>
							)}
							{this.state.chefsData.shorthand && (
								<TabContainer dir={theme.direction}>
									<Box />
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
