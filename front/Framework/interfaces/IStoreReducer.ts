export interface IStoreReducer {
    stores: IStore[];
}

export interface IStore {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    code: string;
}