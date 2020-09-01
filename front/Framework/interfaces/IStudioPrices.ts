export interface IStudioPrices {
    id: number;
    fkStudio: number;
    description: string;
    title: string;
    price: number;
    isHour: boolean;
}