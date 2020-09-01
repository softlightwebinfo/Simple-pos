import React from "react";
import {BEM, IProp} from "@codeunic/library-ui/build";

export interface IAdsBanner extends IProp {
    url: string;
    title: string;
    image: string;
    horizontal?: boolean;
}

export const AdsBanner = (props: IAdsBanner) => {
    const bm = new BEM("adBnr", {
        horizontal: props.horizontal,
    });
    return (
        <div className={bm.toString()} style={props.style}>
            <span>Publicidad</span>
            <a target={"_ADS"} href={props.url}>
                <img src={props.image} title={props.title} alt={props.title}/>
            </a>
        </div>
    )
}