import React, {Component} from "react";
import FlvJs from "flv.js";
// import videojs from 'video.js';
// @ts-ignore
let flv: FlvJs;
export default class VideoPlayer extends Component {
    // private video = "http://localhost:8000/live/STREAM_NAME/index.mpd";
    // private video2 = "https://stream.mallorcaliverecordingstudio.com/live?app=live&stream=stream-1";
    private video2 = "https://stream.mallorcaliverecordingstudio.com/live?app=web&stream=stream-1";
    // private video2 = "https://stream.mallorcaliverecordingstudio.com/live?app=radio&stream=stream-1";
    // @ts-ignore
    private player: FlvJs.Player
    private videoRef: React.RefObject<unknown>;

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        flv = require('flv.js').default;

        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    buildPlayer() {
        if (this.player) {
            return;
        }
        this.player = flv.createPlayer({
            type: "flv",
            url: this.video2,
            isLive: true,
        }, {
            enableWorker: true,
            lazyLoadMaxDuration: 3 * 60,
            seekType: 'range',
            isLive: true
        });
        if (this.videoRef.current) {
            // @ts-ignore
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
            console.log(flv);
            this.player.on(flv.Events.ERROR, (e) => {
                console.log("E", e);
            });
            this.player.on(flv.Events.LOADING_COMPLETE, () => {

            });
            this.player.on(flv.Events.METADATA_ARRIVED, () => {

            });
            this.player.on(flv.Events.MEDIA_INFO, () => {

            });
        }
    }

    render() {
        return (
            <video
                controls
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'black',
                    // @ts-ignore
                }}
                poster={"/static/images/Banner_Twitch_Offline.png"}
                // @ts-ignore
                ref={this.videoRef}
            />
        );
    }
}
// @ts-ignore