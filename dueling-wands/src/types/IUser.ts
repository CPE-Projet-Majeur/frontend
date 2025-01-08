export default interface IUser {
    id: number;
    login: string;
    pwd?: string;
    firstName: string;
    lastName: string;
    email: string;
    house?: number;
}
