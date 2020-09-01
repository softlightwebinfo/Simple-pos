import {BEM, IconComponent, IProp, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";

export interface IFeature extends IProp {
    description: string;
    title: string;
    icon: string;
}

export const Feature = (props: IFeature) => {
    const bm = new BEM("feature", {});
    bm.Append(props.className || "");
    return (
        <div className={bm.toString()}>
            <div className={bm.Children("icon")}>
                <IconComponent icon={props.icon}/>
            </div>
            <TypographyComponent component={"h3"} variant={"h6"} className={bm.Children("title")}>{props.title}</TypographyComponent>
            {/*<div className={bm.Children("description")}>{props.description}</div>*/}
        </div>
    )
};
