export interface IUserReducer {
    users: IUser[];
    count: number;
}

export type IUser = {
    id: number;
    email: string;
    name: string;
    active: boolean;
    updatedAt: string;
};
