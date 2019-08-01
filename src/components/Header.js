import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/KeyboardArrowLeft';

const styles = theme => ({
    yesWord: {
        fontFamily: 'Open Sans',
        fontSize: '1.8rem',
        fontWeight: '300',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#ffffff',
        textTransform: 'uppercase'
    },
    chefWord: {
        fontFamily: 'Open Sans',
        fontSize: '1.8rem',
        fontWeight: '600',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#ffffff',
        textTransform: 'uppercase'
    },
    iconBox: {
        width: "2.4rem",
        height: "2.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "1.2rem",
        left: "1.2rem"
    },
    leftIcon: {
        fontSize: '3rem'
    }
});


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={!this.state.visible ? "header--hidden" : this.props.gradientBackground ? 'gradientHeader header' : 'colorHeader header'}>
                <div className={classes.iconBox}>
                    <Link to="/home" underline="none">
                        <IconButton aria-label="Close">
                            <LeftArrowIcon className={classes.leftIcon} />
                        </IconButton>
                    </Link>
                </div>
                <span className={classes.yesWord}>yes</span><span className={classes.chefWord}>Chef</span>
            </Paper>
        );
    }
}


export default withStyles(styles)(Header)