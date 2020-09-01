import {BEM, ContainerComponent, IProp, ITitleSubtitle, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";
// @ts-ignore
import {Link} from '@routes';

export interface IHeadBanner extends IProp, ITitleSubtitle {
    route: string;
    button: string;
    banner: string;
}

export const HeadBanner = (props: IHeadBanner) => {
    const bem = new BEM("headerBanner", {});
    bem.Append(props.className || "");
    return (
        <section
            className={bem.toString()}
            style={{
                ...props.style,
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.59), rgba(0, 0, 0, 0.94)), transparent url(${props.banner}) center center/cover no-repeat scroll`
            }}
        >
            <ContainerComponent fixed maxWidth={"lg"}>
                <TypographyComponent className={bem.Children("title")} component="h1" variant="h4" color={"white"}>
                    <span dangerouslySetInnerHTML={{__html: props.title}}/>
                </TypographyComponent>
                <TypographyComponent className={bem.Children("subtitle")} component="p" variant="h6" color={"white"}>
                    {props.subTitle}
                </TypographyComponent>
                <Link to={props.route || "index"}>
                    <a className={"button"}>{props.button}</a>
                </Link>
            </ContainerComponent>
        </section>
    );
};
