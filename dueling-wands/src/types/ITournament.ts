export default interface ITournament {
    code : string; // Code du tournoi (unique généré par le backend)
    players : number[]; // Liste des Ids des joueurs
    status : boolean; // Status du tournoi (e.g : true si en cours, false si terminé ou non commencé)
    winner : number; // Id du joueur gagnant
    currentFightId : number; // Id du combat en cours
}
