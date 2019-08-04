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
    info_container: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '0.8rem',
        paddingTop: '1.2rem',
        paddingLeft: '2.4rem',
        zIndex: '20',
        backgroundImage: 'linear-gradient(to top, #1f1e1e, rgba(31, 30, 30, 0))'
    },
    info_container2: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '0.8rem',
        paddingTop: '1.2rem',
        paddingLeft: '2.4rem',
        width: '100%',
        position: 'absolute',
        bottom: '0px',
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
        textTransform: "uppercase"
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

        const textContent = (
            <Box className={this.props.showTrailer ? classes.info_container2 : classes.info_container}>
                <Box component="h1" className={classes.chef_name}>Chef {this.props.chefName}</Box>
                <Box className='Sub-h1'>{this.props.classTitle}</Box>
            </Box>
        );

        return (
            <Link to={"/class/" + this.props.id + "/"} className='link' style={{ textDecoration: 'none' }}>
                {
                    this.props.showTrailer ?
                        <Paper className={classes.container2}>
                            <div className={classes.video_container}>
                                {
                                    this.state.src && <TrailerVideo  {...videoJsOptions} />
                                }
                                {textContent}
                            </div>
                        </Paper>
                        :
                        <Paper className={(this.props.fixed && classes.fix_position_container) + ' ' + classes.container} style={{ backgroundImage: 'url(' + this.props.chefImg + ')' }}>
                            <Box className={classes.mask_container}>
                                {textContent}
                            </Box>
                        </Paper >
                }
            </Link>
        );
    }
}

export default withStyles(styles)(ClassInfo);
