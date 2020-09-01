import * as React from "react";
import {BEM, ContainerComponent, GridComponent, IProp, TypographyComponent} from "@codeunic/library-ui/build";
import {setting} from "settings";
import {connect} from 'react-redux';

export interface IFooter extends IProp {
    translation?: any;
}

const Footer = (props: IFooter) => {
    const bm = new BEM("footer", {});
    return (
        <section className={bm.toString()} style={props.style}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <GridComponent container spacing={4}>
                    <GridComponent item lg={6}>
                        <h5 style={{display: "none"}}>{setting.appName}</h5>
                        <img src={setting.logo} alt={setting.appName} title={setting.appName}/>
                    </GridComponent>
                    <GridComponent item lg={2}>
                        <TypographyComponent component={"h5"} variant={"h6"}
                                             color={"text-secondary"}>Studio</TypographyComponent>
                        <TypographyComponent component={'p'} color={"text-secondary"}>07300 inca</TypographyComponent>
                        <TypographyComponent component={'p'} color={"text-secondary"}>Mallorca -
                            España</TypographyComponent>
                    </GridComponent>
                    <GridComponent item lg={2}>
                        <TypographyComponent component={"h5"} variant={"h6"} color={"text-secondary"}>
                            {props.translation['weSocial']}
                        </TypographyComponent>
                        <TypographyComponent component={'p'}
                                             color={"text-secondary"}>{setting.phone}</TypographyComponent>
                        <TypographyComponent component={'p'}
                                             color={"text-secondary"}>mallorcaliverecordingstudio</TypographyComponent>
                    </GridComponent>
                    <GridComponent item lg={2} className={bm.Children("icons")}>
                        <TypographyComponent component={"h5"} variant={"h6"} color={"text-secondary"}>
                            {props.translation['contactUs']}
                        </TypographyComponent>
                        <a target={"_SOCIAL"} href="https://www.facebook.com/mallorca.live.recording.studio"><img
                            src="/static/images/facebook.png" alt=""/></a>
                        <a target={"_SOCIAL"} href="https://www.instagram.com/mallorcaliverecordingstudio/"><img
                            src="/static/images/instagram.png" alt=""/></a>
                        <a target={"_SOCIAL"} href="https://www.youtube.com/channel/UClDLQ4dMqQvfV-aFW9-PUJw"><img
                            src="/static/images/youtube.png" alt=""/></a>
                    </GridComponent>
                </GridComponent>
                <p className={bm.Children("foo")} style={{color: "black"}}>2020 <a
                    href="https://www.musicosdelmundo.com">musicosdelmundo.com.</a> All rights reserved</p>
            </ContainerComponent>
        </section>
    );
};
export default connect(state => ({
    translation: state.translate.translation,
}))(Footer)