import {IStudioPrices} from "./IStudioPrices";

export interface IStudioReducer {
    parseStudioLoaded: boolean,
    studioLoaded: boolean,
    studios: IStudio[],
    error: boolean,
    errorMessage: string;
    selected: number;
    count: number;
    prices: IStudioPrices[];
}

export interface IStudio {
    id: number;
    title: string;
    description: string;
    active: boolean;
    image: string;
    priceFrom: number;
    capacity: number;
    size: number;
    prices: IStudioPrices[];
}
