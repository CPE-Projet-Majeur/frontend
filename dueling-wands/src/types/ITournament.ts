export default interface ITournament {
    code : string; // Code du tournoi (unique généré par le backend)
    players : number[]; // Liste des Ids des joueurs
    status : string; // Status du tournoi
    winner : number; // Id du joueur gagnant
    currentFight : number; // Id du combat en cours
}
