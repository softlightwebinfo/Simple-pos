import {BEM, ContainerComponent, GridComponent} from "@codeunic/library-ui/build";
import * as React from "react";
import {CardStudio} from "@components/CardStudio";
import {connect} from 'react-redux';
import {IStudio} from "../interfaces/IStudioReducer";

export type IStudioEx = IStudio & {
    data: [];
};

export interface ISectionRates {
    studios?: IStudioEx[];
}

const SectionRates = (props: ISectionRates) => {
    const bm = new BEM("sectionRates", {});
    const {studios = []} = props;
    return (
        <section className={bm.toString()}>
            <ContainerComponent fixed maxWidth={"lg"}>
                <GridComponent container spacing={2}>
                    {studios.map((item, index) => (
                        <GridComponent item key={index} xs={12} sm={6} md={4} lg={3}>
                            <CardStudio
                                {...item}
                            />
                        </GridComponent>
                    ))}
                </GridComponent>
            </ContainerComponent>
        </section>
    )
};
export default connect(state => ({
    studios: state.studio.studios.map(item => ({
        ...item,
        data: [],
    })),
}))(SectionRates);