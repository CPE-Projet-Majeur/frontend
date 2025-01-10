import EHouses from "./EHouses";

export default interface IUser {
    id?: number;
    login: string;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    house: EHouses;
    account: number;
    wins : number;
    defeats : number;
}
