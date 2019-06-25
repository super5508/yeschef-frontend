import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import store from '../store/Store'
import { signout } from '../store/actionCreators/UserActionCtrators';

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

class SignOut extends Component {
    constructor(props, context) {
        super(props);

        if (window.firebaseAuth) {
            //in case we're already laded in the browser (SPA)
            this.signOut()
        } else {
            window.addEventListener("load", () => {
                debugger;
                this.signOut()
            });
        }
    }


    signOut() {
        window.firebaseAuth.signOut();
        store.dispatch(signout());

        window.setTimeout(() => {
            this.props.history.push('/');
        }, 2000)
    }

    render() {
        return (
            <div>
                <h1>Signing Out...</h1>
            </div>
        );
    }
}

SignOut.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignOut);