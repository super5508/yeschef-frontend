import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TrailerVideo from './TrailerVideo';

const styles = theme => ({
    container: {
        top: '0',
        zIndex: '20',
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            height: '57vw',
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '32vw',
            height: '18vw'
        },
    },
    container2: {
        position: 'fixed',
        top: '0',
        zIndex: '20',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        // [theme.breakpoints.up('sm')]: {
        //     width: '33%'
        // },
    },
    fix_position_container: {
        position: 'fixed'
    },
    background_img: {
        width: '100%'

    },
    chef_name: {
        textTransform: 'uppercase',
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
        zIndex: '20',
        backgroundImage: 'linear-gradient(to top, #1f1e1e, rgba(31, 30, 30, 0))'
    },
    info_container2: {
        width: '100%',
        position: 'absolute',
        bottom: '0px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '0.8rem',
        paddingTop: '1.2rem',
        backgroundImage: 'linear-gradient(to top, #1f1e1e, rgba(31, 30, 30, 0))'
    },
    video_container: {
        position: 'relative',
        height: '57vw'
    },
    mask_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
    },
});

class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            poster: null
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.trailer) {
            return {
                src: props.trailer,
                poster: props.chefImg
            }
        }
        return {};
    }

    comingSoonOpacityStyle = this.props.isComingSoon ? {
        background: 'rgba(0,0,0,0.6)'
    } : {};

    comingSoonTextStyle = this.props.isComingSoon ? {
        color: '#929292'
    } : {};

    render() {
        const videoJsOptions = {
            autoplay: true,
            controls: false,
            muted: true,
            loadingSpinner: false,
            errorDisplay: false,
            poster: this.state.poster,
            sources: [{
                src: this.state.src,
            }],
        }

        const { classes } = this.props;
        return (
            <Link to={"/class/" + this.props.id} className='link' style={{ textDecoration: 'none' }}>
                {
                    this.props.showTrailer ?
                        <Paper className={classes.container2}>
                            <div className={classes.video_container}>
                                {
                                    this.state.src && <TrailerVideo  {...videoJsOptions} />
                                }
                                <Box className={classes.info_container2} style={this.comingSoonTextStyle}>
                                    <Box className={classes.chef_name + ' h1center'}>Chef {this.props.chefName}</Box>
                                    <Box className='Sub-h1'>{this.props.classTitle}</Box>
                                </Box>
                            </div>
                        </Paper>
                        :
                        <Paper className={(this.props.fixed && classes.fix_position_container) + ' ' + classes.container} style={{ backgroundImage: 'url(' + this.props.chefImg + ')' }}>
                            <Box className={classes.mask_container} style={this.comingSoonOpacityStyle}>
                                < Box className={classes.info_container} style={this.comingSoonTextStyle}>
                                    <Box className={classes.chef_name + ' h1center'}>Chef {this.props.chefName}</Box>
                                    <Box className='Sub-h1'>{this.props.classTitle}</Box>
                                    {this.props.isComingSoon && <Box className={classes.coming_soon} color="primary.main">COMING SOON</Box>}
                                </Box>
                            </Box>
                        </Paper >
                }
            </Link>
        );
    }
}

export default withStyles(styles)(ClassInfo);
