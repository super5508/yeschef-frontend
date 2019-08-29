import React from "react";
import videojs from "video.js";
import indexeddbTools from "./../common/indexeddbTools";

export default class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.lastRecordedTime = 0;
		this.state = {
			initTime: 0
		};
		this.constants = {
			IS_INDEXEDDB: 'indexedDB' in window
		};

		this.videoId = this.props.classId + "_" + this.props.lessonNum;

		indexeddbTools.getYCIndexedDB(this.dbOpened);
		this.constants = {
			...this.constants,
			TIME_KEY: this.props.videoId + "_time"
		}
	}

	dbOpened = async (event) => {
		this.ycDB = event.target.result;
		var tmp = await this.getLastRecordedTime();
		const time = tmp || 0;
		if (time) {
			this.player.currentTime(time);
		}
		this.lastRecordedTime = time;
	}

	componentDidMount() {
		// instantiate Video.js
		this.player = videojs(
			this.videoNode,
			this.props
		);

		this.player.on("play", this.handlePlayEvent);
		this.player.on("timeupdate", this.handleTimeUpdateEvent);
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose();
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
	  let changeDetected = false;
	  for (let propName of Object.getOwnPropertyNames(nextProps)) {
	    if (this.props[propName] !== nextProps[propName]) {
        if (propName === 'isPlaying') {
          nextProps.isPlaying ? this.player.play() : this.player.pause();
        } else {
          changeDetected = true;
        }
      }
    }
	  return changeDetected;
	}

	getLastRecordedTime = async () => {
		if (this.constants.IS_INDEXEDDB) {
			const recordedTime = await indexeddbTools.getObject(this.ycDB, indexeddbTools.constants.PLAYER_STATUS_STORE_NAME, this.videoId);
			return (recordedTime && recordedTime.lastTimeStamp) || 0;
		} else {
			console.log('read time from localStorage ' + localStorage.getItem(this.constants.TIME_KEY));
			return localStorage.getItem(this.constants.TIME_KEY);
		}
	}

	recordTime = async (timeToRecord) => {
		if (this.constants.IS_INDEXEDDB) {
			const videoId = this.videoId;
			const classId = this.props.classId;
			const lessonNum = this.props.lessonNum;

			indexeddbTools.manipulateObject(this.ycDB, indexeddbTools.constants.PLAYER_STATUS_STORE_NAME, this.videoId, (oldRecord) => {
				oldRecord = oldRecord || { videoId: videoId, classId: classId, lessonNum: parseInt(lessonNum) };
				oldRecord.lastTimeStamp = timeToRecord;
				return oldRecord;
			})
		} else {
			localStorage.setItem(this.constants.TIME_KEY, timeToRecord);
			console.log('write time to localStorage ' + timeToRecord);
		}

	}

	handleTimeUpdateEvent = (context) => {
		const timeToRecord = Math.floor(this.player.currentTime());
		if (timeToRecord % 5 === 0) {
			if (this.lastRecordedTime !== timeToRecord) {
				this.recordTime(timeToRecord);
				this.lastRecordedTime = timeToRecord;
			}
		}
	}

	handlePlayEvent(context, args) {
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
