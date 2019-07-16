import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import ClassInfo from "../components/ClassInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "../common/AxiosMiddleware";

const styles = theme => ({
	container: {},
	margins: {
		paddingLeft: "2.4rem",
		paddingRight: "2.4rem"
	},
	cta_wrapper: {
		paddingTop: "3.4rem",
		paddingBottom: "3.9rem"
	}
});
class HomePage extends Component {
    state = { chefsDataArray: [] };
    constructor(props) {
        super(props);

        Axios.get('/api/classes').then(chefInfoResponse => {
            console.log(chefInfoResponse);
            this.setState({
                ...this.state,
                chefsDataArray: chefInfoResponse.data
            });
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <Box >
                {/* //if user is not loged in */}
                {!this.props.authStat.isLogin && <Box display="flex" flexDirection="column" className={`${classes.margins} ${classes.cta_wrapper}`} p={2}>
                    <Box fontWeight="fontWeightBold" fontSize="1.8rem" pb={1}>Access the knowledge, secrets and tricks of the world’s best chefs</Box>
                    <Box fontWeight="fontWeightLight" fontSize="1.6rem" pb={1.6}>Get unlimited access to an ever-growing library of exclusive classes</Box>
                    {/* <Link to="/signup" underline="none"> */}
                    <Button component={Link} to="/signup" size="large" variant="contained" color="primary" className={classes.button} >
                        <Box fontWeight="fontWeightBold" fontSize="1.4rem">
                            GET ACCESS
                        </Box>
                    </Button>
                    {/* </Link> */}
                </Box>}
                <Box fontWeight="fontWeightBold" fontSize="1.8rem" pb={1.4} className={`${classes.margins}`}>
                    OUR CLASSES
                </Box>
                {this.state.chefsDataArray.map(chefData => <Box pb="2.4rem"><ClassInfo key={chefData.id} className={classes.class_info} {...chefData}></ClassInfo></Box>)}
            </Box>
        )
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.user
    }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(HomePage)));