import { EWeather } from "./EWeather"

export type StartPayload = {
    battleId : number,
    weather : EWeather,
}

export type SendActionPayload = {
    targetId : number,
    damage : number,
    accuracy : number, // Pour que chaque personne puisse connaitre son pourcentage de réussite
    spellName : string,
    remainingHp : number,
}

export type BattleEndPayload = {
    status : string
}