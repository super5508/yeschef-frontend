import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import PortfolioImage from '../assets/images/portfolio1.png';
import Axios from '../common/AxiosMiddleware';

function TabContainer({ children, dir }) {
    return (
        <div component="div" dir={dir}>
            {children}
        </div>
    );
}

const styles = theme => ({
    pageContent: {
        marginTop: 48,
    },
    tabsRoot: {
        borderBottom: "0.01rem solid #929292",
    },
    tabRoot: {
        color: "#929292",
        fontWeight: 600,

        "&$tabSelected": {
            color: "#ffffff",
            fontSize: "1.4rem"
        }
    },
    tabContent: {
        padding: '2.3rem'
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'left',
        marginBottom: 0,
        textTransform: 'uppercase',
    },
    textContent: {
        fontSize: 16,
        fontWeight: 300,
        textAlign: 'left',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '2.3rem'
    },
    summaryCard: {
        backgroundColor: '#1E1E1E',
        padding: '3.6rem 2.3rem',
        borderRadius: 8,
        position: 'relative',
        '&:not(:last-child)': {
            marginBottom: '2.3rem',
        }
    },
    cardDate: {
        fontSize: 12,
        textAlign: 'left',
        fontWeight: 600,
        color: '#FF007F',
        marginBottom: 8,
    },
    cardContent: {
        marginTop: 8,
        display: 'grid',
        gridGap: 16,
        gridTemplateColumns: '1fr',
        fontSize: 16,
        fontWeight: 300,
        textAlign: 'left',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.9)',
        '& a': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            color: 'rgba(255, 255, 255, 0.9)',
        }
    },
    closeBtn: {
        backgroundColor: '#FF007F',
        width: 10,
        height: 10,
        borderRadius: '100%',
        right: '1.6rem',
        top: '1.6rem',
        position: 'absolute',
    },
    portfolio: {
        width: '100%',
        paddingTop: '2.3rem',
    },
    portfolioDescription: {
        paddingTop: 8,
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'left',
        margin: 0,
        color: 'rgba(255, 255, 255, 0.9)',
    }
});

const cardData = [
    {
        createdDate: 'August 8th, 2019',
        title: 'CHEF EDWARD LEE’S FIRST LESSON IS LIVE!',
        content: '<span>We are very excited to share our very first lesson with you! You can now go to <a href="#" target="_blank">chef Edward Lee’s class</a> and watch his first lesson, where he teaches how to make oysters and grits!</span> <span><a href="#" target="_blank">Watch the lesson</a> and tell us what you think!</span>',
        hyperlinks: [
            { url: '#', text: "chef Edward Lee's class" },
            { url: '#', text: "Watch the lesson" }
        ],
        portfolio: 'assets/images/portfolio1.png',
        portfolioDescription: 'See how cool it looks behind the scenes',
        closeable: true,
        key: 'card1',
    },
    {
        createdDate: 'August 6th, 2019',
        title: 'WELCOME TO YESCHEF',
        content: '<span>This is here just to show how it will look when there is more than one card. This is an older card so it doesn’t have a pink dot on it.</span>',
        closeable: false,
        key: 'card2',
    }
]

class BetaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            betaNews: []
        }
    }

    componentDidMount() {
        Axios.get('/beta').then(res => {
            this.setState({ betaNews: res.data });
        })
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render = () => {
        const { classes, theme } = this.props;
        return (
            <Box>
                <div className={classes.betaContentCon}>
                    <Header visible />
                    <div className={classes.pageContent}>
                        <Tabs
                            indicatorColor="primary"
                            variant="fullWidth"
                            scrollButtons="auto"
                            value={this.state.value}
                            classes={{ root: classes.tabsRoot }}
                            onChange={this.handleChange}>
                            <Tab
                                label="WHAT'S NEW"
                                classes={{
                                    root: classes.tabRoot,
                                }}
                            />
                            <Tab
                                label="FEEDBACK"
                                classes={{
                                    root: classes.tabRoot,
                                }}
                            />
                            <Tab
                                label="VOTING"
                                classes={{
                                    root: classes.tabRoot,
                                }}
                            />
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                            index={this.state.value}
                        >
                            <TabContainer dir={theme.direction}>
                                <Box>
                                    <div className={classes.tabContent}>
                                        <h2 className={classes.textTitle}>Hey there, awesome beta users</h2>
                                        <p className={classes.textContent}>This is your home for staying up to date on the YesChef beta. Find out what's new, give us your feedback and be an important part of the future of food! Plus vote on new features and submit your own ideas.</p>
                                        {
                                            this.state.betaNews.map(card => {
                                                return (
                                                    <Paper className={classes.summaryCard} key={card.key}>
                                                        {
                                                            card.closeable ? <div className={classes.closeBtn}></div> : null
                                                        }
                                                        <h4 className={classes.cardDate}>{card.createdDate}</h4>
                                                        <h2 className={classes.textTitle}>{card.title}</h2>
                                                        <span className={classes.cardContent} dangerouslySetInnerHTML={{ __html: card.content }}></span>
                                                        {
                                                            card.portfolio ? <div>
                                                                <img src={PortfolioImage} className={classes.portfolio} alt="here"></img>
                                                                <p className={classes.portfolioDescription}>{card.portfolioDescription}</p>
                                                            </div> : null
                                                        }
                                                    </Paper>
                                                )
                                            })
                                        }
                                    </div>
                                </Box>
                            </TabContainer>

                            <TabContainer dir={theme.direction}>
                                <Box>
                                    <div className={classes.tabContent}>
                                        FEEDBACK
                                    </div>
                                </Box>
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <Box>
                                    <div className={classes.tabContent}>
                                        VOTING
                                    </div>
                                </Box>
                            </TabContainer>
                        </SwipeableViews>
                    </div>
                </div>
            </Box>
        )
    }
}


export default withStyles(styles, { withTheme: true })(BetaPage);