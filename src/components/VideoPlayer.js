import React from "react";
import videojs from "video.js";
export default class VideoPlayer extends React.Component {
	componentDidMount() {
		// instantiate Video.js
		this.player = videojs(
			this.videoNode,
			this.props
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
			<div data-vjs-player className="vjs-big-play-centered" style={{
				width: "100%",
				height: "99%"
			}}>
				<video
					className="video-js vjs-big-play-button vjs-big-play-centered"
					ref={node => (this.videoNode = node)}
				/>
			</div>
		);
	}
}
