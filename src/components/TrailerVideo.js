import React from 'react';
import videojs from 'video.js'

export default class TrailerVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      poster : null
    }
  }

  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    });
  }

  static getDerivedStateFromProps(props) {
    console.log(props)
    if(props.poster) {
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
  
  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } poster={this.state.poster} className="video-js" width='450' height='auto'></video>
        </div>
      </div>
    )
  }
}