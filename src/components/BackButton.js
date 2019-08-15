import React from 'react';
import { Link } from 'react-router-dom'
import IconButton from "@material-ui/core/IconButton";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    leftIcon: {
        fontSize: "3rem"
    },
    backIconBox: {
        width: "2.4rem",
        height: "2.4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "1.2rem",
        left: "1.2rem",
        zIndex: '45',
        transition: "top 0.6s",
    },
    hiddenIconBox: {
        top: "-50px"
    },
})


class BackButton extends React.Component {
    constructor() {
        super();
        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: true
        }
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
        let className = classes.backIconBox + " ";
        if (!this.state.visible) {
            className += classes.hiddenIconBox;
        }
        return (
            <div className={className}>
                <Link to={this.props.redirect} underline="none">
                    <IconButton aria-label="Close">
                        <LeftIcon className={classes.leftIcon} />
                    </IconButton>
                </Link>
            </div>
        )
    }
}


export default (withStyles(styles)(BackButton));