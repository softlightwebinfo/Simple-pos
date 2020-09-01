import * as React from "react";
import {BEM, ContainerComponent, GridComponent, IProp} from "@codeunic/library-ui/build";
import {OwlItem} from "@components/OwlItem";
import {connect} from 'react-redux';

export interface ICategoriesButtons extends IProp {
    translation?: any;
}

@connect(state => ({
    translation: state.translate.translation,
}))
export class CategoriesButtons extends React.Component<ICategoriesButtons> {
    render() {
        const bm = new BEM("categoriesButtons", {});
        bm.Append(this.props.className || "");
        const data = [
            {icon: "alarm", title: "audioRecording", subTitle: "detalle", route: "/"},
            {icon: "alarm", title: "rehearsalStudios", subTitle: "detalle", route: "/"},
            {icon: "alarm", title: "onlineRadio", subTitle: "detalle", route: "/"},
            {icon: "alarm", title: "streamingRadio", subTitle: "detalle", route: "/"},
            {icon: "alarm", title: "liveInterviews", subTitle: "detalle", route: "/"},
            {icon: "alarm", title: "liveRecording", subTitle: "detalle", route: "/"},
        ];
        return (
            <section
                style={this.props.style}
                className={bm.toString()}
            >
                <ContainerComponent fixed maxWidth={"lg"}>
                    <GridComponent container>
                        {data.map((item, index) => (
                            <GridComponent xs={12} sm={2} item key={index}>
                                <OwlItem
                                    icon={item.icon}
                                    title={this.props.translation.categoriesButtons[item.title]}
                                    subTitle={item.subTitle}
                                    route={item.route}
                                />
                            </GridComponent>
                        ))}
                    </GridComponent>
                </ContainerComponent>
            </section>
        )
    }
}
