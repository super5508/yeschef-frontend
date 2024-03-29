import React from 'react';
import videojs from 'video.js'
import { zIndex } from 'material-ui/styles';

export default class TrailerVideo extends React.Component {
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
        height: "99%",
      }}>
        <video style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }} ref={node => this.videoNode = node} poster={this.state.poster} className="video-js" ></video>
      </div>
    )
  }
}