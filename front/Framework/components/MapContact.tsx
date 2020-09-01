import * as React from "react";
import {BEM} from "@codeunic/library-ui/build";

export const MapContact = () => {
    const bm = new BEM("mapContact", {});
    return (
        <section className={bm.toString()}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393420.8103207702!2d2.6314716250379537!3d39.61369048083408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1297b8766606c129%3A0xb7eb9bff02d2ecc0!2sMallorca!5e0!3m2!1ses!2ses!4v1595767814832!5m2!1ses!2ses" width="100%"
                    height="600" frameBorder="0" allowFullScreen={true} aria-hidden="false" tabIndex={0}/>
        </section>
    )
};
