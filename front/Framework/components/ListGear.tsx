import {BEM, IconComponent, IProp, ListComponent} from "@codeunic/library-ui/build";
import * as React from "react";

export interface IListGear extends IProp {
    data: IListGearData[];
}

export type IListGearData = {
    icon: string;
    list: string[];
}
export const ListGear = (props: IListGear) => {
    const bm = new BEM("listGear", {});
    return (
        <section className={bm.toString()}>
            {props.data.map((item, index) => (
                <div key={index} className={bm.Children("item")}>
                    <IconComponent icon={item.icon}/>
                    <ListComponent className={bm.Children("list")} padding={false}>
                        {item.list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ListComponent>
                </div>
            ))}
        </section>
    )
};
