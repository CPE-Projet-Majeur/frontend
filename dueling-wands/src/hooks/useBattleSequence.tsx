import { useState } from "react"

 export const useBattleSequence = () => {
    const [currentPlayer, setCurrentPlayer] = useState(0); // O = Joueur gauche, 1=joueur droite
    const [isTurnTerminated, setIsTurnTerminated] = useState(false);
    const [inSequence, setInSequence] = useState(false);
    const [playerHealth, setPlayerHealth] = useState();
    const [opponentHealth, setOpponentHealth] = useState();
    const [announcerMessage, setAnnouncerMessage] = useState('');
    const [playerAnimation, setPlayerAnimation] = useState ('static');
    const [opponentAnimation, setOpponentAnimation] = useState('static');

        return {
            currentPlayer,
            isTurnTerminated,
            inSequence,
            playerHealth,
            opponentHealth,
            announcerMessage,
            playerAnimation,
            opponentAnimation
        }

 }


// Provisoirement ici on trouve la socket du battle et ses actions 


