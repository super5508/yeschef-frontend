import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class SignIn extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>Sign In</h1>
                <form className={classes.container} autoComplete="on">
                    <TextField
                        id="first-name"
                        label="First name"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="last-name"
                        label="Last name"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="emil"
                        label="Email"
                        type="email"
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                    />
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);