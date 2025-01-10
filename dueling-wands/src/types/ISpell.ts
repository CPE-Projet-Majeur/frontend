import ESpellAffinities from "./ESpellAffinity";
import ESpellTypes from "./ESpellType";

export default interface ISpell {
    id : number,
    name : string,
    description : string,
    dmg : number,
    type : ESpellTypes,
    affinity : ESpellAffinities,
    difficulty : number,
}