import {
    BEM,
    ContainerComponent,
    GridComponent,
    IProp,
    ITitleSubtitle,
    TypographyComponent
} from "@codeunic/library-ui/build";
import * as React from "react";
import {SlickSlide} from "@components/SlickSlide";
import {IStudio} from "../interfaces/IStudioReducer";

export interface ISelectStudio extends IProp, ITitleSubtitle {
    studios: IStudio[];
}

export const SelectStudio = (props: ISelectStudio) => {
    const bm = new BEM("selectStudio", {});
    bm.Append(props.className || "");
    const {studios = []} = props;
    return (
        <section className={bm.toString()} style={props.style}>
            <TypographyComponent component={"h2"} variant={"h4"}
                                 className={bm.Children("title")}>{props.title}</TypographyComponent>
            <TypographyComponent component={"p"}
                                 className={bm.Children("subTitle")}>{props.subTitle}</TypographyComponent>
            <ContainerComponent fixed maxWidth={"lg"}>
                <GridComponent container className={bm.Children("slick")}>
                    {studios.map((item, index) => (
                        <GridComponent item xs={12} sm={4} key={index}>
                            <SlickSlide
                                key={index}
                                id={item.id}
                                image={item.image ? `/images/studios/${item.image}` : `/static/images/badImage.png`}
                                title={item.title}
                                description={item.description}
                                route={"studio"}
                                price={Number(item.priceFrom.toFixed(2))}
                                size={item.size.toString()}
                                quantity={item.capacity}
                            />
                        </GridComponent>
                    ))}
                </GridComponent>
            </ContainerComponent>
        </section>
    );
};
