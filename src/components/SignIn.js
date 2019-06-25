import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import store from '../store/Store'
import { signin } from './../store/actionCreators/UserActionCtrators';
import { Button } from '@material-ui/core';

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
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (event) => {
        this.setState(
            {
                ...this.state,
                [event.target.id]: event.target.value
            }
        );
    }

    submitLogin = (event) => {
        var firebaseAuthPromis = window.firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password);

        firebaseAuthPromis.catch(function (error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
        });

        firebaseAuthPromis.then(
            response => {
                if (!response) return;
                // Intercom('update', {
                //     email: response.user.email,
                //     name: response.user.displayName
                // });
                //window.setTimeout(function(){
               store.dispatch(signin(response.user));
                //}, 1000);

            }
        );

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>Sign In</h1>
                <form className={classes.container} autoComplete="on" onSubmit={this.submitLogin}>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="primary" type="submit">Log In</Button>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignIn);