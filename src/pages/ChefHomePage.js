import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChefInfo from '../components/ChefInfo';

const styles = theme => ({

});
class ChefHomePage extends Component {
    render() {
        //const { classes } = this.props;

        return (
            <ChefInfo {...this.props}>

            </ChefInfo>
        )
    };
}

export default withStyles(styles)(ChefHomePage);