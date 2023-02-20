export type Indexed<T = any> = {
    [key in string]: T;
};

export interface IUserData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}
