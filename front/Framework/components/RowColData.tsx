import {BEM, IProp, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";

export interface IRowColData extends IProp {
    title: string;
    description: string;
    price: number;
    isHour: boolean;
}

export const RowColData = (props: IRowColData) => {
    const bm = new BEM("rowColData", {});
    bm.Append(props.className || "");

    return (
        <article className={bm.toString()} style={props.style}>
            <div className={bm.Children("left")}>
                <TypographyComponent component={"h4"} variant={"body1"}>
                    {props.title}
                </TypographyComponent>
                <TypographyComponent className={bm.Children("description")} component={"p"} variant={"caption"}>
                    {props.description}
                </TypographyComponent>
            </div>
            <div className={bm.Children("right")}>
                {props.price}€
                {props.isHour && ("/hr")}
            </div>
        </article>
    )
};
