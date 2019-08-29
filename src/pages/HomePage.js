import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ClassInfo from "../components/ClassInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "../common/AxiosMiddleware";
import Header from '../components/Header'

const styles = theme => ({
    container: {},
    margins: {
        paddingLeft: "2.4rem",
        paddingRight: "2.4rem"
    },
    cta_wrapper: {
        backgroundSize: "cover",
        backgroundPosition: 'center',
        paddingRight: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingTop: "3.4rem",
        marginBottom: "3.1rem",
        [theme.breakpoints.down('sm')]: {
            backgroundImage: "url('https://d21w8rrhzkhqhr.cloudfront.net/images/hero1_m.jpg')",
            width: "100vw",
            height: '133.33vw',
        },
        [`${theme.breakpoints.up('sm')}`]: {
            backgroundImage: "url('https://d21w8rrhzkhqhr.cloudfront.net/images/hero1.jpg')",
        },
        margin: "auto"
    },
    action_title: {
        textTransform: 'uppercase',
        fontSize: '2.4rem',
        fontWeight: '600'
    },
    action_subTitle: {
        textTransform: 'uppercase',
        fontSize: '2.4rem'
    },
    class_infos_wrapper: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
        },
    },
    cta_content_wrapper: {
        width: "100%",
        paddingRight: "2.4rem",
        paddingLeft: "2.4rem",
        paddingBottom: "2.4rem",
        backgroundImage: 'linear-gradient(to top, #1f1e1e, rgba(31, 30, 30, 0))'
    }
});
class LPHomePage extends Component {
    state = { chefsDataArray: [], comingSoonArray: [] };
    constructor(props) {
        super(props);

        Axios.get('/api/classes').then(chefInfoResponse => {
            // console.log(chefInfoResponse);
            const classes = chefInfoResponse.data.filter(classObj => !classObj.comingSoon);
            const comingSoon = chefInfoResponse.data.filter(classObj => classObj.comingSoon);

            this.setState({
                ...this.state,
                chefsDataArray: classes,
                comingSoonArray: comingSoon
            });
        })
    }


    render() {

        let buttonProp;
        if (this.props.authStat.isLogin) {
            buttonProp = {
                text: "START EDWARD LEE'S CLASS",
                link: "/class/c01/"
            }
        } else {
            buttonProp = {
                text: "GET ACCESS",
                link: "/signup"
            }
        }
        const { classes } = this.props;
        return (
            <Box >
                <Header gradientBackground />
                {/* //if user is not loged in */}
                <Box display="flex" flexDirection="column" justifyContent="flex-end" className={`${classes.cta_wrapper}`} p={2}>
                    <Box className={classes.cta_content_wrapper} display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center">
                        <Box className={classes.action_title} >the world’s best chefs</Box>
                        <Box className={classes.action_subTitle} pb={1.1}>teach home cooking</Box>
                        <Button component={Link} to={buttonProp.link} size="large" variant="contained" color="primary" className={classes.button} >
                            <Box fontWeight="fontWeightBold" fontSize="1.4rem">
                                {buttonProp.text}
                            </Box>
                        </Button>
                    </Box>

                </Box>
                <Box pb="0.8rem">
                    <Box className={`${classes.margins}`} style={{ paddingBottom: "1.6rem" }} component="h1">
                        OUR CLASSES
                    </Box>
                    <Box className={classes.class_infos_wrapper}>
                        {this.state.chefsDataArray.map(chefData => <Box pb="2.4rem" key={chefData.id}><ClassInfo key={chefData.id} className={classes.class_info} {...chefData}></ClassInfo></Box>)}
                    </Box>
                </Box>
                <Box>
                    <Box className={`${classes.margins}`} style={{ fontWeight: 300, paddingBottom: "1.6rem" }} component="h1">
                        COMING SOON
                    </Box>
                    <Box className={classes.class_infos_wrapper}>
                        {this.state.comingSoonArray.map(comingSoonData => <Box pb="2.4rem" key={comingSoonData.id}><ClassInfo key={comingSoonData.id} className={classes.class_info} {...comingSoonData}></ClassInfo></Box>)}
                    </Box>
                </Box>
            </Box>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.user
    }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(LPHomePage)));
