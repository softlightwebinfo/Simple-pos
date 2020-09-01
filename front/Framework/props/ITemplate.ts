import {IChildren} from "@codeunic/library-ui/build";

export interface ITemplate {
    description: string;
    title: string;
    children: IChildren | IChildren[];
    dispatch?: any;
    auth?: any;
}
