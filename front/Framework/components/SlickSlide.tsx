import * as React from "react";
import {BEM, IconComponent, IProp, TypographyComponent} from "@codeunic/library-ui/build";
// @ts-ignore
import {Link} from '@routes';
import {slugify} from "../libs/slug";

export interface ISlickSlide extends IProp {
    id: number;
    image: string;
    quantity: number;
    size: string;
    price: number;
    description: string;
    route: string;
    title: string;
    select?: boolean;
}

export const SlickSlide = (props: ISlickSlide) => {
    const bm = new BEM("slickSlide", {
        select: props.select,
    });
    bm.Append(props.className || "");
    return (
        <div className={bm.toString()}>
            <div className={bm.Children("spaceThumb")}>
                <img width="732" height="412" src={props.image} className="img-fluid" alt=""/>
                <div className={bm.Children("caption")}>
                    <h3>
                        <Link to={props.route} params={{id: props.id, slug: slugify(props.title)}}>
                            <a>{props.title}</a>
                        </Link>
                    </h3>
                    <p className={bm.Children("price")}>from {props.price}€</p>
                    <TypographyComponent component={"p"} variant={"body2"} className={bm.Children("description")}>
                        {props.description.slice(0, 150) + '...'}
                    </TypographyComponent>
                    <span className="mr-3">
                        <IconComponent icon={"size"} style={{width: 12, height: 12, marginRight: 5,}}/>
                        <span className="text">{props.size}</span>
                    </span>
                    <span className="mr-3">
                        <IconComponent icon={"user"} style={{width: 12, height: 12, marginRight: 5,}}/>
                        <span className="text">{props.quantity} personas</span>
                    </span>
                </div>
            </div>
        </div>
    )
};
