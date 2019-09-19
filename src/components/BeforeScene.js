import React, { Component } from 'react';
import videojs from 'video.js'

import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'

const styles = theme => ({
  wrapper: {
    paddingBottom: '2.3rem',
  },
  imgContainer: {
    width: '100%'
  },
  itemContainer: {
    paddingTop: '2.3rem',
    fontSize: 16,
    '.vjs-container': {
      backgroundSize: 'cover'
    }
  },
  description: {
    color: '#FFFFFF',
    fontWeight: 300,
    padding: '1.2rem 2.3rem'
  }
});

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poster: null
    }
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
    console.log(this.player);

    this.player.on('touchstart', this.playPauseVideo)
  }

  static getDerivedStateFromProps(props) {
    // console.log(props)
    if (props.poster) {
      return {
        poster: props.poster
      }
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  playPauseVideo = () => {
    if (this.player.paused()) {
      this.player.play()
    }
    else {
      this.player.pause()
    }
  }

  render() {
    if (this.player) {
      this.player.muted(this.props.muted || false)
    }

    return (
      <div data-vjs-player style={{
        width: "100%",
        height: "240px",
        backgroundSize: "cover",
      }}>
        <video style={{
          height: '240px',
          width: '100%',
          objectFit: 'cover'
        }} ref={node => this.videoNode = node} poster={this.state.poster} className="video-js" ></video>
      </div>
    )
  }
}

class BeforeScene extends Component {

  render() {
    const { classes, section } = this.props;
    return (
      <Box
        className={classes.wrapper}
      >
        {
          section.map(item => {
            return (
              <div key={item.id} className={classes.itemContainer}>
                {
                  item.type === 'image' ? (
                    <div>
                      <img src={item.src} alt="pic" className={classes.imgContainer} />
                    </div>
                  ) : (
                      <div>
                        <VideoPlayer
                          {
                          ...{
                            controls: true,
                            muted: false,
                            loadingSpinner: true,
                            errorDisplay: false,
                            poster: item.poster,
                            sources: [{
                              src: item.src
                            }],
                          }
                          }
                        />
                      </div>
                    )
                }
                {
                  item.description ? (
                    <div className={classes.description}>
                      <span>{item.description}</span>
                    </div>
                  ) : null
                }
              </div>
            )
          })
        }
      </Box>
    )
  }
}

export default withStyles(styles, { withTheme: true })(BeforeScene);