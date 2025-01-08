export default interface IUser {
    id: number;
    token?: string;
    login: string;
    pwd?: string;
    firstName: string;
    lastName: string;
    email: string;
    house?: number;
}
