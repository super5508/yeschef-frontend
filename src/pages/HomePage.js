import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const styles = theme => ({
    container: {
        padding: '20px 15px'
    },
    bold: {

    }
});
class HomePage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="xl" className={classes.container}>
                <Box display="flex" flexDirection="column" className="cta_wrapper" p={2}>
                    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize" pb={1}>Access the knowledge, secrets and tricks of the world’s best chefs</Box>
                    <Box fontWeight="fontWeightLight" fontSize="h6.fontSize" pb={3}>Get unlimited access to an ever-growing library of exclusive classes</Box>
                    {/* <Link to="/signup" underline="none"> */}
                    <Button component={Link} to="/signup" size="large" variant="contained" color="primary" className={classes.button} >
                        <Box fontWeight="fontWeightBold">
                            GET ACCESS
                        </Box>
                    </Button>
                    {/* </Link> */}
                </Box>
            </Container>
        )
    };
}

export default withStyles(styles)(HomePage);