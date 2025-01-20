import EHouses from "./EHouses";
import { EWeather } from "./EWeather"

export enum ESpells {
    INCENDIO = "Incendio",
    ASCENDIO = "Ascendio",
    PROTEGO = "Protego",
    GLACIUS = "Glacius",
    VENTUS = "Ventus",
    AGUAMENTI = "Aguamenti",
    BOMBARDA = "Bombarda",
    CONFUNDO = "Confundo",
}

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
    accuracy : number,
    spellName : ESpells,
    remainingHp : number,
}

export type BattleEndPayload = {
    userId : number;
    status : string
}