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
		margin: "2.5rem 0rem 0.8rem 0rem",
		textAlign: "center"
	},
	classDesc: {
		"& p": {
			fontSize: "1.6rem",
			fontWeight: 300,
			margin: "2rem 2.4rem"
		},
		"& span": {
			fontSize: "1.8rem",
			fontWeight: 600
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
        borderBottom: "0.01rem solid #929292",
    },
    tabRoot: {
        color: '#929292',
        fontWeight: 600,
        paddingBottom:'0rem',

		"&$tabSelected": {
            color: "#ffffff",
            fontSize: "1.4rem",
		}
    },
    tabSelected: {},
});
class ChefHomePage extends Component {
	constructor(props, context) {
		super(props);
		this.state = {
			chefsData: {
				lessons: [],
				skills: []
			},
			value: 0
		};
		Axios.get(`api/class/${this.props.match.params.id}`).then(
			chefInfoResponse => {
				this.setState({
					...this.state,
					chefsData: chefInfoResponse.data
				});
			}
		);
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	render() {
		const { classes, theme } = this.props;
		return (
			<div>
				<ClassInfo {...this.state.chefsData} />

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
							{/* //Class description */}
							<Box className={classes.classDesc}>
								<p>{this.state.chefsData.description}</p>
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
									<p>{this.state.chefsData.duration} hours</p>
								</div>
								<div className={classes.alignCenter}>
									<PlayIcon className={classes.icon} />
									<p>
										{this.state.chefsData.lessons.length}{" "}
										lessons
									</p>
								</div>
								<div
									className={classes.alignRight}
									style={{
										borderLeft: "0.1rem solid #ffffff",
										paddingLeft: "2rem"
									}}
								>
									<CheckIcon className={classes.icon} />
									<p>
										{this.state.chefsData.skills.length}{" "}
										skills
									</p>
								</div>
							</div>
						</TabContainer>

						<TabContainer dir={theme.direction}>
							{/* //about tab */}
							{/* //Class description */}
							<Box className={classes.classDesc}>
								<p>
									<span>
										Chef {this.state.chefsData.chefName}
									</span>{" "}
									is the chef/owner of 610 Magnolia, MilkWood,
									and Whiskey Dry in Louisville, Kentucky.
									Awarded “Best Book Of Year In Writing” by
									the James Beard Foundation for "Buttermilk
									Graffiti". He appears frequently in print
									and on television, including earning an Emmy
									nomination for his role in the Emmy
									Award-winning series The Mind of a Chef.
								</p>
							</Box>
						</TabContainer>
					
                    </SwipeableViews>
				</div>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ChefHomePage);
