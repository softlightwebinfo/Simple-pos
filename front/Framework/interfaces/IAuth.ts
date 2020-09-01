export interface IAuth {
    token: string;
    user: IAuthUser;
}

export type IAuthUser = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    name: string;
};
