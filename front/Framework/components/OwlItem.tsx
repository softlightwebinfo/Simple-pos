import * as React from "react";
import {BEM, IconComponent, IProp, ITitleSubtitle, TypographyComponent} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from "@routes";
export interface IOwlItem extends IProp, ITitleSubtitle {
    route: string;
    icon: string;

}

export const OwlItem = (props: IOwlItem) => {
    const bm = new BEM("owlItem", {});
    bm.Append(props.className || "");
    return (
        <article className={bm.toString()} style={props.style}>
            <IconComponent className={bm.Children("icon")} icon={props.icon}/>
            <TypographyComponent className={bm.Children("title")} component={"h3"}>{props.title}</TypographyComponent>
            <TypographyComponent className={bm.Children("subTitle")} component={"p"}>{props.subTitle}</TypographyComponent>
            <Link to={props.route}>
                <a className={bm.Children("target")}/>
            </Link>
        </article>
    );
};
