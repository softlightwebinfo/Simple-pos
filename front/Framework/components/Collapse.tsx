import {BEM, IProp} from "@codeunic/library-ui/build";
import * as React from "react";
import CollapseContext, {ICollapseContext} from "Framework/contexts/collapseContext";
import {ReactElement, useState} from "react";
import {CollapseRow} from "@components/CollapseRow";

export interface ICollapse extends IProp {
    data: ICollapseRow[];
}

export type ICollapseRow = {
    icon: string;
    title: string;
    id: number;
    content: ReactElement | string | any;
}
export const Collapse = (props: ICollapse) => {
    const bm = new BEM("collapse", {});
    const [state, setState] = useState<ICollapseContext>({
        active: 0,
        onSelect: (id: number): void => {
            setState({
                ...state,
                active: id,
            });
        }
    });
    return (
        <CollapseContext.Provider value={state}>
            <div className={bm.toString()} style={props.style}>
                {props.data.map((item, index) => (
                    <CollapseRow
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </CollapseContext.Provider>
    );
};
