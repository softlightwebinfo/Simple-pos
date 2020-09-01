import {BEM, ContainerComponent, TypographyComponent} from "@codeunic/library-ui/build";
import {GalleryPhotos} from "@components/GalleryPhotos";
import React from "react";

export const OurClients = () => {
    const bem = new BEM("ourClients", {});
    return (
        <div className={bem.toString()}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <TypographyComponent component={"h2"} variant={"h4"}>Our clients</TypographyComponent>
                <TypographyComponent component={"p"}>Suspendisse auctor malesuada enim ac pharetra.</TypographyComponent>
                <GalleryPhotos
                    separate
                    photos={[
                        {image: "/static/images/studio1.jpg", title: "Title image 1"},
                        {image: "/static/images/studio2.jpg", title: "Title image 1"},
                        {image: "/static/images/studio3.jpg", title: "Title image 1"},
                        {image: "/static/images/bg-hero.jpg", title: "Title image 1"},
                        {image: "/static/images/studio1.jpg", title: "Title image 1"},
                        {image: "/static/images/studio1.jpg", title: "Title image 1"},
                        {image: "/static/images/studio2.jpg", title: "Title image 1"},
                        {image: "/static/images/studio3.jpg", title: "Title image 1"},
                        {image: "/static/images/bg-hero.jpg", title: "Title image 1"},
                        {image: "/static/images/studio1.jpg", title: "Title image 1"},
                        {image: "/static/images/studio3.jpg", title: "Title image 1"},
                        {image: "/static/images/bg-hero.jpg", title: "Title image 1"},
                    ]}
                />
            </ContainerComponent>
        </div>
    )
};
