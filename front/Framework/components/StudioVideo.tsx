import VideoPlayer from "@components/videoPlayer";
import React, {Fragment} from "react";
import {
    BEM,
    TypographyComponent,
    TextFieldComponent,
    IconComponent,
    BadgeComponent,
    ButtonComponent,
    ScrollbarComponent,
    LabelComponent
} from "@codeunic/library-ui/build";
import {getSocket} from "../../instances";
import {connect} from 'react-redux';
import {IAuthUser} from "../interfaces/IAuth";
import {linkify as linkifyComponent} from "../libs/linkify";
import moment from 'moment';
import {AdsBanner} from "@components/AdsBanner";
import {liveDescription} from "@settings";

@connect(state => ({
    user: state.auth.auth?.user
}))
export class StudioVideo extends React.Component<{
    user?: IAuthUser;
}, any> {
    state: any = {
        isLike: false,
        isDislike: false,
        activeTab: 0,
        users: {},
        message: "",
        user: "",
        messages: [],
        fallback: "",
        online: false,
        sources: [],
        dislikes: 0,
        likes: 0,
        views: 0,
    };
    timeout!: NodeJS.Timeout
    changeTab = (index: number) => {
        this.setState({
            activeTab: index,
        });
    }
    private ref: any;

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        let socket = getSocket();
        // new user is created so we generate nickname and emit event
        this.newUserConnected(this.props.user?.name, user => {
            this.setState({user});
        });
        socket.on("new user", (data) => {
            data.map((user) => this.addToUsersBox(user));
        });
        socket.on("user disconnected", (userName) => {
            delete this.state.users[userName];
            this.setState({
                users: this.state.users,
            });
        });
        socket.on("chat message", (data) => {
            this.setState(e => ({
                messages: [...e.messages, {
                    user: data.user,
                    message: data.message,
                    time: data.time,
                }]
            }), () => {
                this.ref.current.scrollToBottom();
            });
        });
        socket.on("typing", (data) => {
            const {isTyping, user} = data;
            if (!isTyping) {
                this.setState({fallback: ""});
                return;
            }

            this.setState({fallback: `${user} esta escribiendo...`});
        });
        socket.on("chat messages", (data) => {
            this.setState({messages: data});
        });
        socket.on("live start", (online: boolean) => {
            this.setState({
                online: online,
            }, () => {
                // this.refVideo.current.player.play()
            });
        })
        socket.on("dislikes", (data: number) => {
            this.setState({dislikes: data});
        })
        socket.on("likes", (data: number) => {
            this.setState({likes: data});
        })
        socket.on("views", (data: number) => {
            this.setState({views: data});
        })
    }

    componentWillUnmount() {
        // @ts-ignore
        getSocket()?.close()
    }

    chats(chat: { user: string, message: string, time: string }) {
        const receivedMsg = (
            <div className="incoming__message">
                <div className="received__message">
                    <p>{chat.message}</p>
                    <div className="message__info">
                        <span className="message__author">{chat.user}</span>
                        <span className="time_date">{chat.time}</span>
                    </div>
                </div>
            </div>
        );

        const myMsg = (
            <div className="outgoing__message">
                <div className="sent__message">
                    <p>{chat.message}</p>
                    <div className="message__info">
                        <span className="time_date">{chat.time}</span>
                    </div>
                </div>
            </div>
        );

        return chat.user === this.state.user ? myMsg : receivedMsg;
    }

    content() {
        switch (this.state.activeTab) {
            case 0: {
                if (true) {
                    return (
                        <>
                            <ScrollbarComponent ref={this.ref}>
                                <div className={"scroll"}>
                                    {this.state.messages.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {this.chats(item)}
                                            </Fragment>
                                        )
                                    })}
                                </div>
                            </ScrollbarComponent>
                            {this.state.fallback && (
                                <TypographyComponent className={"fallback"}>{this.state.fallback}</TypographyComponent>
                            )}
                        </>
                    )
                }
                return (
                    <TypographyComponent style={{padding: 20}}>No disponible</TypographyComponent>
                )
            }
            case 1: {
                if (true) {
                    return (
                        <div style={{padding: 20}}>
                            {Object.keys(this.state.users).map((item) => (
                                <div className="studioVideo__chat_ib" key={item}>
                                    <h5>{item}</h5>
                                </div>
                            ))}
                        </div>
                    )
                }

                return (
                    <TypographyComponent style={{padding: 20}}>No disponible</TypographyComponent>
                )
            }
        }
    }

    addNewMessage = () => {
        if (!this.state.message.length) {
            return;
        }
        const time = new Date();
        const formattedTime = time.toLocaleString("es-ES", {hour: "numeric", minute: "numeric"});
        getSocket().emit("chat message", {
            message: this.state.message,
            user: this.state.user,
            time: formattedTime,
        });
        this.setState({message: ""});
    };


    newUserConnected = (user?: string, callback?: (user: string) => void) => {
        let socket = getSocket();
        const userName = user || `User${Math.floor(Math.random() * 1000000)}`;
        callback && callback(userName);
        socket.emit("new user", userName);
        this.addToUsersBox(userName);
    };

    addToUsersBox = (userName) => {
        if (userName in this.state.users) {
            return;
        }
        this.setState(e => ({
            users: {
                ...e.users,
                [userName]: userName,
            }
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.addNewMessage();
    };

    onChange = (e) => {
        this.setState({message: e.target.value})
        clearTimeout(this.timeout);
        getSocket().emit("typing", {
            isTyping: e.target.value.length > 0,
            user: this.state.user,
        });
        this.timeout = setTimeout(() => {
            getSocket().emit("typing", {
                isTyping: false,
                user: this.state.user,
            });
        }, 1000);
    };

    onLike = () => {
        if (!this.state.isLike) {
            getSocket().emit("like", {
                user: this.state.user,
            });
            this.setState({isLike: true});
        }
    }

    onDisLike = () => {
        if (!this.state.isDislike) {
            getSocket().emit("dislike", {
                user: this.state.user,
            });
            this.setState({isDislike: true});
        }
    }

    render() {
        let bm = new BEM("studioVideo", {});
        let bm2 = new BEM("studioVideo-container", {});
        // const videoJsOptions = {
        //     autoplay: true,
        //     controls: true,
        //     poster: "/static/images/Banner_Twitch_Offline.png",
        //     sources: [{
        //         // src: 'https://www.mallorcaliverecordingstudio.com/hls/scaleway.m3u8',
        //         src: 'https://www.mallorcaliverecordingstudio.com/dash/scaleway.mpd',
        //         type: 'application/dash+xml'
        //     }],
        // }
        let content = liveDescription;
        const time = moment().format("DD/MM/YYYY")
        return (
            <div className={bm2.toString()}>
                <section className={bm.toString()}>
                    <div className={bm.Children("video")}>
                        <VideoPlayer/>
                        {/*<VideoPlayer2/>*/}
                    </div>
                    <div className={bm.Children("chat")}>
                        <div className={bm.Children("chat-header")}>
                            <TypographyComponent
                                className={this.state.activeTab == 0 ? "active" : undefined}
                                onClick={() => this.changeTab(0)} variant={"h6"}>Chat</TypographyComponent>
                            <TypographyComponent
                                className={this.state.activeTab == 1 ? "active" : undefined}
                                onClick={() => this.changeTab(1)}
                                variant={"h6"}
                            >
                                <BadgeComponent
                                    badgeContent={Object.keys(this.state.users).length}>Users</BadgeComponent>
                            </TypographyComponent>
                        </div>
                        <div className={bm.Children("chat-content")}>
                            {this.content()}
                        </div>
                        <div className={bm.Children("chat-footer")}>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldComponent
                                    id={"message"}
                                    outline
                                    placeholder={"Escribe tu mensaje"}
                                    value={this.state.message}
                                    onChange={this.onChange}
                                    name={"message"}
                                    autoFocus
                                    // @ts-ignore
                                    autoComplete={"off"}
                                />
                                <ButtonComponent type={"submit"} style={{alignItems: "center"}}>
                                    <IconComponent icon={"send"}/>
                                </ButtonComponent>
                            </form>
                        </div>
                    </div>
                </section>
                <div className={bm2.Children("content")}>
                    <div className={bm2.Children("left")}>
                        <div className={bm2.Children("title")}>
                            <TypographyComponent component={"h1"} variant={"h5"}>
                                <>
                                    <LabelComponent style={{marginRight: 10}}
                                                    name={this.state.online ? "DIRECTO" : "OFFLINE"}
                                                    theme={this.state.online ? "danger" : "primary"}/>
                                    <span>Radio Mallorca live recording studio {moment().format("DD/MM/YYYY")}</span>
                                </>
                            </TypographyComponent>
                            <div className={bm2.Children("info")}>
                                <TypographyComponent variant={"body2"} className={bm2.Children("subTitle")}
                                                     style={{marginTop: 20}}>
                                    <span>{this.state.views} visualizaciones</span>
                                    <span>•</span>
                                    <span>{time}</span>
                                </TypographyComponent>
                                <div>
                                    <ButtonComponent onClick={this.onLike} variant={"outlined"} theme={"info"}>
                                        Me gusta ({this.state.likes})
                                    </ButtonComponent>
                                    <ButtonComponent onClick={this.onDisLike} variant={"outlined"} theme={"info"}>
                                        No me gusta ({this.state.dislikes})
                                    </ButtonComponent>
                                    {/*<ButtonComponent theme={"danger"} variant={"outlined"}>*/}
                                    {/*    SUBSCRIBIRSE*/}
                                    {/*</ButtonComponent>*/}
                                </div>
                            </div>
                        </div>
                        <TypographyComponent variant={"body1"} component={"p"} className={bm2.Children("description")}>
                            <span
                                dangerouslySetInnerHTML={{__html: linkifyComponent(content).split("\n").map((item) => `${item}<br/>`).join("")}}/>
                        </TypographyComponent>
                        <AdsBanner
                            style={{height: "auto", maxWidth: 900, margin: "50px auto"}}
                            title={"Músicos del mundo"}
                            url={"https://www.muscosdelmundo.com"}
                            image={"/static/images/banner_mlrs_1.jpg"}
                            horizontal
                        />
                    </div>
                    <div className={bm2.Children("right")}>
                        <AdsBanner
                            style={{margin: 40}}
                            title={"Músicos del mundo"}
                            url={"https://www.muscosdelmundo.com"}
                            image={"/static/images/banner_musicos.jpg"}
                        />
                    </div>
                </div>
            </div>
        )
    }
}