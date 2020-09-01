import {BEM, IProp} from "@codeunic/library-ui/build";
import * as React from "react";

export interface IGalleryPhotos extends IProp {
    separate?: boolean;
    photos: {
        title: string;
        image: string
    }[]
}

export const GalleryPhotos = (props: IGalleryPhotos) => {
    const bem = new BEM("galleryPhotos", {
        separate: props.separate,
    });
    bem.Append(props.className || "");
    return (
        <section style={props.style} className={bem.toString()}>
            <div className={bem.Children("grid")}>
                {props.photos.map((item, index) => (
                    <div
                        key={index}
                    >
                        <img src={item.image} alt={item.title}/>
                    </div>
                ))}
            </div>
        </section>
    );
};
