  
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Axios from '../common/AxiosMiddleware';
import videojs from 'video.js';

const styles = theme => ({

});

class PlayerPage extends Component {
    state = {
        currentLesson: {
            title: ""
        },
        class: {
            name: "",
            chef: ""
        }
    };
    constructor(props, context) {
        super(props);

        switch (props.mode) {
            case "lesson":
                this.loadLesson();
                break;
            default:
                this.loadClass();
                break;
        }
    }

    loadClass = async () => {
        const classDataResponse = await Axios.get('/api/class/' + this.props.match.params.id + '?prefetch=true');
        const classData = classDataResponse.data;
        classData.currentLesson = 0;
        this.setState({ ...this.state, class: classData, currentLesson: classData.lessons[0] });
    }

    loadLesson = () => {
        //todo
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        this.player.src(this.state.currentLesson.video);
    }

    componentDidMount = () => {
        console.log('1');

        this.player = videojs(this.videoNode,
            {
                controls: true,
                autoplay: false,
                preload: 'auto'
            });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        //const { classes } = this.props;

        return (
            <div>
                <h1>{this.state.currentLesson.title}</h1>
                <h2>{(this.props.mode === "class") ? "from " + this.state.class.name + " By " + this.state.class.chef : ""}</h2>

                <video ref={node => this.videoNode = node} className="video-js" width="400" >

                </video>
            </div>
        )
    };
}

export default withStyles(styles)(PlayerPage);