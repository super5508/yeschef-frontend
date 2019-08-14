import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    header: {
        width: '100%',
        padding: 10,
        position: "fixed",
        top: 0,
        zIndex: 40,
        transition: "top 0.6s",
        height: "4.8rem",
        textAlign: "center",
        textTransform: "uppercase"
    },
    hiddenHeader: {
        top: "-50px"
    },
    gradientHeader: {
        backgroundImage: " linear-gradient(to bottom, rgba(51, 51, 51, 0.85), rgba(31, 31, 31, 0.25) 63%, rgba(23, 23, 23, 0))"
    },
    colorHeader: {
        backgroundColor: "#171717"
    },
    link: {
        textDecoration: 'none'
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
        let className = classes.header + " ";
        if (this.state.visible) {
            className += this.props.gradientBackground ? classes.gradientHeader : classes.colorHeader;
        } else {
            className += classes.hiddenHeader;
        }
        return (
            <Paper className={className}>
                <Link className={classes.link} to="/home">
                    <span className={classes.yesWord}>yes</span><span className={classes.chefWord}>Chef</span>
                </Link>
            </Paper>
        );
    }
}


export default withStyles(styles)(Header)