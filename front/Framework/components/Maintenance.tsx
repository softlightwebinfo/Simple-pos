import * as React from "react";
import {BEM, ContainerComponent, TypographyComponent} from "@codeunic/library-ui/build";

export const Maintenance = () => {
    const bm = new BEM("maintenance", {});
    return (
        <section className={bm.toString()}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <TypographyComponent component={"h3"} variant={"h2"}>Page in creation</TypographyComponent>
                <TypographyComponent style={{marginTop: 20}} component={"div"} variant={"h5"}>the page is under maintenance</TypographyComponent>
            </ContainerComponent>
        </section>
    );
};
