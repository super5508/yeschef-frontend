import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';


const styles = theme => ({
    container: {
        height: 212,
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '33%'
        }
    },
    background_img: {
        width: '100%'

    },
    class_title: {
        fontSize: '1.6rem'
    },
    chef_name: {
        textTransform: 'uppercase',
        fontSize: '1.8rem'
    },
    coming_soon: {
        fontWeight: 600,
        fontSize: '1rem',
        marginTop: '1.6rem',
        marginLeft: '1.6rem'
    },
    info_container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '0.8rem',
        paddingTop: '1.2rem',
        backgroundImage: 'linear-gradient(to top, #1f1e1e, rgba(31, 30, 30, 0))'
    },
    mask_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',

    }
});

class ClassInfo extends Component {
    comingSoonOpacityStyle = this.props.isComingSoon ? {
        background: 'rgba(0,0,0,0.6)'
    } : {};

    comingSoonTextStyle = this.props.isComingSoon ? {
        color: '#929292'
    } : {};

    render() {
        const { classes } = this.props;
        return (
            <Link to={"/class/" + this.props.id} style={{ textDecoration: 'none' }}>
                <Paper className={classes.container} style={{ backgroundImage: 'url(' + this.props.chefImg + ')'}}>
                    <Box className={classes.mask_container} style={this.comingSoonOpacityStyle }>
                        < Box className={classes.info_container} style={this.comingSoonTextStyle}>
                            <Box fontWeight="fontWeightBold" className={classes.chef_name}>Chef {this.props.chefName}</Box>
                            <Box className={classes.class_title}>{this.props.classTitle}</Box>
                        </Box>
                        {this.props.isComingSoon && <Box className={classes.coming_soon} color="primary.main">COMING SOON</Box>}
                    </Box>
                </Paper >
            </Link>
        );
    }
}

export default withStyles(styles)(ClassInfo);
