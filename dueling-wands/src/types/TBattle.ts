import { EWeather } from "./EWeather"
import IUser from "./IUser"

export type StartPayload = {
    players : IUser[],
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
    userId : void;
    status : string
}