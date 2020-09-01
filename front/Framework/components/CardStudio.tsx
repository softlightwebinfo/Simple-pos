import {BEM, IProp, TypographyComponent} from "@codeunic/library-ui/build";
import * as React from "react";
import {RowColData} from "@components/RowColData";
// @ts-ignore
import {Link} from '@routes';
import {slugify} from "../libs/slug";

export interface ICardStudio extends IProp {
    id: number;
    title: string;
    image: string;
    prices: ICardStudioData[];
}

export type ICardStudioData = {
    title: string;
    description: string;
    price: number;
    isHour: boolean;
}
export const CardStudio = (props: ICardStudio) => {
    const bem = new BEM("cardStudio", {});
    bem.Append(props.className || "");
    return (
        <Link to={"studio"} params={{slug: slugify(props.title), id: props.id}}>
            <a className={bem.toString()} style={props.style}>
                <article>
                    <img src={props.image ? `/images/studios/${props.image}` : "/static/images/badImage.png"} alt={props.title} title={props.title}/>
                    <TypographyComponent className={bem.Children("title")} component={"h3"}
                                         variant={"h6"}>{props.title}</TypographyComponent>
                    {props.prices.map((item, index) => (
                        <RowColData
                            key={index}
                            {...item}
                        />
                    ))}
                </article>
            </a>
        </Link>
    );
};
