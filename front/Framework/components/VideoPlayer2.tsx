import React, {Component} from "react";
import dynamic from "next/dynamic";

const ReactHlsPlayer = dynamic(() => import('react-hls-player'), {ssr: false})

const source = 'https://www.mallorcaliverecordingstudio.com/hls/key.m3u8';

export class VideoPlayer2 extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactHlsPlayer
                poster={"/static/images/Banner_Twitch_Offline.png"}
                url={source}
                autoplay={false}
                controls={true}
                width="100%"
                height="auto"
            />
        );
    }
}