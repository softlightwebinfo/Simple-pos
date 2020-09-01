import {BEM, ContainerComponent, IconComponent, IProp, isUndef, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";
// @ts-ignore
import {Link} from '@routes';

export interface IBannerTitle extends IProp {
    banner: string;
    title: string;
    data?: IBannerTitleData[];
}

export type IBannerTitleData = {
    icon: string;
    label: string;
}
export const BannerTitle = (props: IBannerTitle) => {
    const bem = new BEM("bannerTitle", {
        special: !isUndef(props.data)
    });
    bem.Append(props.className || "");
    const {data = []} = props;
    const com = (
        <ContainerComponent fixed maxWidth={"lg"}>
            <TypographyComponent className={bem.Children("title")} component="h1" variant="h4" color={"white"}>
                <span dangerouslySetInnerHTML={{__html: props.title}}/>
            </TypographyComponent>
        </ContainerComponent>
    );
    return (
        <section
            className={bem.toString()}
            style={{
                ...props.style,
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.59), rgba(0, 0, 0, 0.94)), transparent url(${props.banner}) center center/cover no-repeat scroll`
            }}
        >
            {isUndef(props.data) && (com)}
            {!isUndef(props.data) && (
                <div className={bem.Children("inner")}>
                    {com}
                    <ContainerComponent fixed maxWidth={"lg"}>
                        <div className={bem.Children("data")}>
                            {data.map((item, index) => (
                                <div key={index} className={bem.Children("item")}>
                                    <IconComponent style={{width: 12, height: 12, marginRight: 5}} icon={item.icon}/>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </ContainerComponent>
                </div>
            )}
        </section>
    );
};
