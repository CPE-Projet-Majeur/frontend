import EHouses from "./EHouses";
import { EWeather } from "./EWeather"
import IUser from "./IUser"

export type Player = {
    _id:number;
    _lastName: string;
    _firstName: string;
    _house: EHouses;
    _battleSocketId: string;
    _tournamentSocketId: string;
}

export type StartPayload = {
    players : Player[],
    weather : EWeather,
    battleId : number,
}

export type SendActionPayload = {
    targetId : void,
    damage : number,
    accuracy : number, // Pour que chaque personne puisse connaitre son pourcentage de réussite
    spellName : string,
    remainingHp : number,
}

export type BattleEndPayload = {
    userId : number;
    status : string
}