import {BEM, ContainerComponent, GridComponent, IProp, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";
import {Feature} from "@components/Feature";
import {connect} from 'react-redux';

export interface ISectionWhyChoose extends IProp {
    translation?: any;
}

const SectionWhyChoose = (props: ISectionWhyChoose) => {
    const bem = new BEM("sectionWhyChoose", {});
    bem.Append(props.className || "");

    const data = [
        {
            title: props.translation.recordingButtons.audioRecording,
            description: "Praesent lacinia eget elementum maximus. Morbi faucibus fermentum nisl, vel accumsan est.",
            icon: "alarm"
        },
        {
            title: props.translation.recordingButtons.mixing,
            description: "Praesent lacinia eget elementum maximus. Morbi faucibus fermentum nisl, vel accumsan est.",
            icon: "alarm"
        },
        {
            title: props.translation.recordingButtons.editing,
            description: "Praesent lacinia eget elementum maximus. Morbi faucibus fermentum nisl, vel accumsan est.",
            icon: "alarm"
        },
        {
            title: props.translation.recordingButtons.multiTrack,
            description: "Praesent lacinia eget elementum maximus. Morbi faucibus fermentum nisl, vel accumsan est.",
            icon: "alarm"
        },
    ];
    return (
        <section className={bem.toString()} style={props.style}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <TypographyComponent component={"h2"} variant={"h4"} className={bem.Children("title")}>
                    {props.translation.whyChoose}
                </TypographyComponent>
                <TypographyComponent component={"p"} variant={"body1"} className={bem.Children("subTitle")}>
                    {props.translation.whyChooseSub.split("\n").map(item => (
                        <>
                            {item}
                            <br/>
                        </>
                    ))}
                </TypographyComponent>
                <GridComponent container className={bem.Children("grid")}>
                    {data.map((item, index) => (
                        <GridComponent item xs={12} sm={3} key={index}>
                            <Feature
                                {...item}
                            />
                        </GridComponent>
                    ))}
                </GridComponent>
            </ContainerComponent>
        </section>
    )
};
export default connect(state => ({
    translation: state.translate.translation,
}))(SectionWhyChoose);