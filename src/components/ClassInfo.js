import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import TrailerVideo from './TrailerVideo';
import IconButton from "@material-ui/core/IconButton";
import VolumeOff from "@material-ui/icons/VolumeMute";
import VolumeOn from "@material-ui/icons/VolumeDown";

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
        position: 'absolute',
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
        height: '100vw',
    },
    mask_container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        textTransform: "uppercase"
    },
    closeIcon: {
        fontSize: "2.5rem"
    },
    iconBox: {
        width: "2.4rem",
        height: "2.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "2.4rem",
        right: "2.4rem",
        zIndex: '60'
    },
    'ChefHeading': {
        fontFamily: "Open Sans",
        fontSize: '22px',
        fontWeight: '600',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#ffffff',
        textTransform: 'uppercase'
    },
    fixedUnderTitle: {
        position: 'fixed',
        top: '4.2rem',
        paddingTop: 0,
        backgroundColor: '#171717',
        height: 'fit-content',
        zIndex: 100,
    }
});

class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            poster: null,
            muted: true,
            fixScroll: false,
        }
        this.scrollElementRefs = {
            classTitle:  React.createRef(),
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

    componentDidMount() {
        if (this.props.forwardRefs) {
            this.props.forwardRefs(this.scrollElementRefs);
        }
    }

    render() {
        const videoJsOptions = {
            autoplay: true,
            controls: false,
            muted: this.state.muted,
            loadingSpinner: false,
            errorDisplay: false,
            poster: this.state.poster,
            sources: [{
                src: this.state.src,
            }],
        }

        const { classes } = this.props;

        const textContent = (
            <Box className={(this.props.showTrailer ? classes.info_container2 : classes.info_container)
                            + ' ' + (this.props.fixScroll ? classes.fixedUnderTitle : '')}
                ref={this.scrollElementRefs.classTitle}>
                <Box className={classes.ChefHeading}>Chef {this.props.chefName}</Box>
                <Box className='body-text' style={{ textTransform: 'uppercase' }}>{this.props.classTitle}</Box>
            </Box>
        );

        const volumeControl = (
            <div className={classes.iconBox}>
                {this.state.muted ?
                    <IconButton aria-label="Close" onClick={() => this.setState({ muted: false })}>
                        <VolumeOff className={classes.closeIcon} />
                    </IconButton>
                    :
                    <IconButton aria-label="Close" onClick={() => this.setState({ muted: true })}>
                        <VolumeOn className={classes.closeIcon} />
                    </IconButton>
                }
            </div>
        );

        const classContent = (
            this.props.showTrailer ?
                <Paper className={classes.container2}>
                    <div className={classes.video_container}>
                        {
                            this.state.src && <TrailerVideo  {...videoJsOptions} />
                        }
                        {volumeControl}
                        {textContent}
                    </div>
                </Paper>
                :
                <Paper className={(this.props.fixed && classes.fix_position_container) + ' ' + classes.container} style={{ backgroundImage: 'url(' + this.props.chefImg + ')' }}>
                    <Box className={classes.mask_container}>
                        {textContent}
                    </Box>
                </Paper >
        )

        return (
            this.props.noLinkTag ?
                classContent
                :
                <Link to={"/class/" + this.props.id + "/"} className='link' style={{ textDecoration: 'none' }}>
                    {classContent}
                </Link>

        );
    }
}

export default withStyles(styles)(ClassInfo);
