import {BEM, IconComponent, IProp, isUndef} from "@codeunic/library-ui/build";
import * as React from "react";
import useCollapseContext from "../contexts/useCollapseContext";
import {ReactElement} from "react";

export interface ICollapseRow extends IProp {
    active?: boolean;
    content: ReactElement | string | any;
    title: string;
    icon: string;
    id: number;
}

export const CollapseRow = (props: ICollapseRow) => {
    const use = useCollapseContext();
    const bm = new BEM("collapseRow", {
        active: !isUndef(props.active) ? props.active : use.active == props.id,
    });
    bm.Append(props.className || "");
    const onClick = () => {
        use.onSelect && use.onSelect(props.id == use.active ? 0 : props.id);
    };
    return (
        <div className={bm.toString()} style={props.style}>
            <h3 className={bm.Children("header")} onClick={onClick}>
                <a className={bm.Children("title")}>
                    <IconComponent icon={props.icon}/>
                    <span>{props.title}</span>
                </a>
                <IconComponent className={bm.Children("arrow")} icon={"arrowBottom"}/>
            </h3>
            <div className={bm.Children("content")}>
                {props.content}
            </div>
        </div>
    );
};
