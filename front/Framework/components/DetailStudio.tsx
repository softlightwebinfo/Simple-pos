import {BEM, ContainerComponent, GridComponent, TypographyComponent} from "@codeunic/library-ui/build";
import React from "react";
import {IStudio} from "../interfaces/IStudioReducer";
import {ListGear} from "@components/ListGear";

export interface IDetailStudio {
    studio: IStudio;
}

export const DetailStudio = (props: IDetailStudio) => {
    const bm = new BEM("detailStudio", {});
    return (
        <section className={bm.toString()}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <GridComponent container spacing={10}>
                    <GridComponent xs={12} sm={12} lg={9} item>
                        <TypographyComponent component={"h4"} variant={"h5"}>About Space</TypographyComponent>
                        <TypographyComponent component={"p"} variant={"body1"} style={{marginTop: 20}}>
                            {props.studio.description.split("\n").map((item) => (
                                <>
                                    {item}
                                    <br/>
                                </>
                            ))}
                        </TypographyComponent>
                        {/*<Collapse*/}
                        {/*    style={{marginTop: 20}}*/}
                        {/*    data={[*/}
                        {/*        {id: 1, icon: "alarm", title: "Minimum booking", content: "4 hr minimum"},*/}
                        {/*        {*/}
                        {/*            id: 2,*/}
                        {/*            icon: "alarm",*/}
                        {/*            title: "Amentities",*/}
                        {/*            content: "100mbps internet, lounge, kitchen, microwave, parking nearby, cafe's nearby, overground 3 min walk"*/}
                        {/*        },*/}
                        {/*        {id: 3, icon: "alarm", title: "Audio Sample", content: "Songs"},*/}
                        {/*        {*/}
                        {/*            id: 4,*/}
                        {/*            icon: "alarm",*/}
                        {/*            title: "Studio rules",*/}
                        {/*            content: "No smoking, No parties, No under 18"*/}
                        {/*        },*/}
                        {/*    ]}*/}
                        {/*/>*/}
                    </GridComponent>
                    <GridComponent xs={12} sm={12} lg={3} item>
                        <TypographyComponent
                            style={{marginBottom: 20}} component={"h4"}
                            variant={"h5"}
                        >
                            Sistema de Grabación
                        </TypographyComponent>
                        {/*    <TypographyComponent style={{marginBottom: 20}} component={"h4"}*/}
                        {/*                         variant={"h5"}>Gear</TypographyComponent>*/}
                        <ListGear
                            data={[
                                {
                                    icon: "ampGuitar",
                                    list: [
                                        "Line 6 spider v USB + XLR ST + DI"
                                    ]
                                },
                                {
                                    icon: "drum",
                                    list: [
                                        "Bateria Santafe / Tama",
                                        "Iron cobra 2 pedal",
                                        "Modulo trigger Roland TDM 6 pro",
                                        "Audio technica MB",
                                        "AKG C1000",
                                        "AKG C3000",
                                        "AKG 391",
                                        "AKG 112",
                                        "Shure B52",
                                        "Shure B91",
                                        "Shure SM 57",
                                        "Sennhelser 604",
                                    ]
                                },
                                {
                                    icon: "mixer",
                                    list: [
                                        "2 Apple macbook pro 2020",
                                        "Logic pro X",
                                        "Behringer x32 producer",
                                        "Tascam US 16x08",
                                        "Monitores campo cercano JBL",
                                    ]
                                },
                                {
                                    icon: "ampBass",
                                    list: [
                                        "Ashdown 600w 4x10",
                                        "Ashdown T250",
                                    ]
                                },
                                {
                                    icon: "microphone",
                                    list: [
                                        "DI Behringer Di 100",
                                        "DI Radial Pro",
                                        "DI BSS AR 133"
                                    ]
                                },

                            ]}
                        />
                    </GridComponent>
                </GridComponent>
            </ContainerComponent>
        </section>
    )
};
