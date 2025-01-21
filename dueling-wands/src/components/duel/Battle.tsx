import React, { useEffect, useRef, useState } from "react";
import { PlayerSummary } from "./battle/PlayerSummary";
import { BattleAnnouncer } from "./BattleAnnouncer";
import styles from "./CSS/Battle.module.css"
import { Socket } from "socket.io-client";
import { ESocket } from "../../types/ESocket";
import { BattleEndPayload, ESpells, Player, SendActionPayload } from "../../types/TBattle";
import { EWeather } from "../../types/EWeather";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface IProps {
    onGameEnd : (winner: string) => void,
    socket : Socket,
    players : Player[],
    weather : EWeather,
    battleId : number,
}

const defaultMessage = "Message Displayer"
const maxHealth : number = 100;

export const   Battle = (props:IProps) => {
    const [playerHealth, setPlayerHealth] = useState (maxHealth);
    const [opponentHealth, setOpponentHealth] = useState (maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [opponentName, setOpponentName] = useState("");
    const [playerEffect, setPlayerEffect] = useState("");
    const [opponentEffect, setOpponentEffect] = useState("");
    const [playerSpell, setPlayerSpell] = useState<{ spell: ESpells | undefined, round: number }>({ spell: undefined, round: 0 });
    const [opponentSpell, setOpponentSpell] = useState<{ spell: ESpells | undefined, round: number }>({ spell: undefined, round: 0 });
    const [counter, setCounter] = useState<number>(0);

    let userId = useSelector((state: RootState) => state.user.user!.id);

    const setWinner : (winner: string) => void= props.onGameEnd;
    let players : Player[] = props.players;
    let weather : EWeather = props.weather;
    let battleId : number = props.battleId;
    const socket = props.socket;

    const handleGameEnd = (winner: string) => {
        setWinner(winner);
    };

    // Gestion des animations
    const playerVideoRef = useRef<HTMLVideoElement>(null);
    const opponentVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (playerVideoRef.current) {
            playerVideoRef.current.load(); // Recharge la vidéo
        }
    }, [playerEffect, counter]);

    useEffect(() => {
        if (opponentVideoRef.current) {
            opponentVideoRef.current.load(); // Recharge la vidéo
        }
    }, [opponentEffect, counter]);

    function handleEffects () {
        chooseEffect (playerSpell.spell, setPlayerEffect);
        chooseEffect (opponentSpell.spell, setOpponentEffect);
    }

    function chooseEffect (spell : ESpells | undefined, setEffect: (effect: string) => void) {
        switch (spell) {
            case ESpells.AGUAMENTI :
                setEffect("water");
                break;
            case ESpells.ASCENDIO : 
                setEffect("wind");
                break;
            case ESpells.BOMBARDA :
                setEffect("fire");
                break;
            case ESpells.CONFUNDO :
                setEffect("mental");
                break;
            case ESpells.GLACIUS :
                setEffect("ice");
                break;
            case ESpells.INCENDIO :
                setEffect("fire");
                break;
            case ESpells.PROTEGO :
                setEffect("light");
                break;
            case ESpells.VENTUS :
                setEffect("mental");
                break;
            default :
            setEffect("");
        }
    }
    // Fin de gestion des animations

    useEffect(() => {
        setPlayerHealth(maxHealth);
        setOpponentHealth(maxHealth);
    
        if (players[0]._id === userId) {
            setOpponentName(players[1]._firstName);
            setPlayerName(players[0]._firstName);
        } else {
            setOpponentName(players[0]._firstName);
            setPlayerName(players[1]._firstName);
        }
    
        setAnnouncerMessage("Wizards, you may fight !");
    }, [players, weather, battleId]);
    

    // Receive users actions ==> log + view update
    socket.on(ESocket.BATTLE_SEND_ACTION, (data : SendActionPayload[]) => {
        //console.log("Received BATTLE_SEND_ACTION");
        let newMessage : string = "";
        data.forEach(action => {
            let senderName :string = "";
            let receiverName :string = "";
            let targetId : void = action.targetId;
            let spellName : ESpells = action.spellName;
            let accuracy : number = action.accuracy;
            let remainingHp : number = action.remainingHp;
            let damage : number = action.damage;
            if (targetId === userId){
                console.log("here")
                receiverName = playerName;
                senderName = opponentName;
                setPlayerHealth(remainingHp);
                setOpponentSpell({ spell: spellName, round: counter + 1 });
            }else {
                console.log("there")
                receiverName = opponentName;
                senderName = playerName;
                setOpponentHealth(remainingHp);
                setPlayerSpell({ spell: spellName, round: counter + 1 });
            }
            newMessage = newMessage + `\n${senderName} used ${spellName} against ${receiverName} with ${accuracy }% accuracy`
            newMessage = newMessage + `\n${receiverName} suffered ${damage} damages, they now have ${remainingHp} HP remaining\n`
        })
        setCounter((prevCounter) => prevCounter + 1);
        setAnnouncerMessage(newMessage);
    });

    useEffect(() => { handleEffects(); }, [playerSpell, opponentSpell]);

    // Game Over ==> Update view for results
    socket.on(ESocket.BATTLE_OVER, (data : BattleEndPayload) => {
        //console.log(`Received BATTLE_OVER winner has id : ${data.userId} and status : ${data.status}`);
        let status : string = data.status;
        if (status === "won"){
            handleGameEnd(playerName);
        }else {
            handleGameEnd(opponentName);
        }
    });

    return (
        <>
            {/* Résumé des joueurs */}
            <div className={styles["summary-container"]}>
                <div className={styles["player-summary"]}>
                    <PlayerSummary
                        isMainCharacter={true}
                        health={playerHealth}
                        name={playerName}
                        maxHealth={maxHealth}
                    />
                </div>

                <h2 className={styles["vs-title"]}>VS</h2>

                <div className={styles["player-summary"]}>
                    <PlayerSummary
                        isMainCharacter={false}
                        health={opponentHealth}
                        name={opponentName}
                        maxHealth={maxHealth}
                    />
                </div>
            </div>

            {/* Personnages et animations */}
            <div className={styles["characters-container"]}>
                <video
                    key={`player-${playerEffect}`}
                    ref={playerVideoRef}
                    autoPlay
                    className={`${styles["character-sprite"]} ${styles["player-sprite"]}`}
                    src={`/duel/left/${playerEffect}_attack.mov`}
                    // alt={playerName}
                />

                <video
                    key={`opponent-${opponentEffect}`}
                    ref={opponentVideoRef}
                    muted
                    autoPlay
                    className={`${styles["character-sprite"]} ${styles["opponent-sprite"]}`}
                    src={`/duel/right/${opponentEffect}_attack.mov`}
                    // alt={opponentName}
                />
            </div>

            {/* HUD pour les messages */}
            <div className={styles["hud-container"]}>
                <div className={styles["hud-message"]}>
                    <BattleAnnouncer
                        message={announcerMessage !== "" ? announcerMessage : defaultMessage}
                    />
                </div>
            </div>
        </>
    );
};
