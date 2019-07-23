import React from "react";
import videojs from "video.js";
export default class VideoPlayer extends React.Component {
	componentDidMount() {
		// instantiate Video.js
		this.player = videojs(
			this.videoNode,
			this.props,
			function onPlayerReady() {
				// console.log("onPlayerReady", this);
			}
		);
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose();
		}
	}

	render() {
		return (
			<div data-vjs-player style={{
                width: "100%",
                height: "99%"
              }}>
					<video
					
						ref={node => (this.videoNode = node)}
						className="video-js"
					/>
			</div>
		);
	}
}
