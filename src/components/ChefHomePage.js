import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { CardMedia, CardContent } from '@material-ui/core';
import ChefImgUrl from '../assets/images/ed_lee.jpg';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: '30%',
        margin: 'auto',
        marginTop: theme.spacing.unit * 3
    },
    media: {
        height: 400,
        width: 400,
        margin: 'auto'
    }
});

class ChefHomePage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    title={this.props.chefsName}
                    subheader={this.props.chefsDesc}
                />

                <CardMedia
                    image={ChefImgUrl}
                    className={classes.media}
                    title="Edward Lee photo"
                />

                <CardContent>
                    <Typography variant="body1">
                        A Class with 10 lessons
                    </Typography>
                </CardContent>

            </Card>
        );
    }
}

export default withStyles(styles)(ChefHomePage);
