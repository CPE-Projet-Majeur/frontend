import React, { useEffect, useState } from "react";
import { PlayerSummary } from "./battle/PlayerSummary";
import { BattleAnnouncer } from "./BattleAnnouncer";
import styles from "./CSS/Battle.module.css"
import { Socket } from "socket.io-client";
import { ESocket } from "../../types/ESocket";
import { BattleEndPayload, Player, SendActionPayload, StartPayload } from "../../types/TBattle";
import { EWeather } from "../../types/EWeather";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface IProps {
    onGameEnd : (winner: string) => void,
    socket : Socket,
    players : Player[],
    weather : EWeather,
    battleId : number,
    socketMobile : Socket,
}

const defaultMessage = "Message Displayer"
const maxHealth : number = 100;

export const   Battle = (props:IProps) => {
    const [playerHealth, setPlayerHealth] = useState (maxHealth);
    const [opponentHealth, setOpponentHealth] = useState (maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [opponentName, setOpponentName] = useState("");

    let userId = useSelector((state: RootState) => state.user.user!.id);

    const setWinner : (winner: string) => void= props.onGameEnd;
    let players : Player[] = props.players;
    let weather : EWeather = props.weather;
    let battleId : number = props.battleId;
    const socket = props.socket;
    const socketMobile = props.socketMobile; // to comment

    const handleGameEnd = (winner: string) => {
        setWinner(winner);
    };

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
        console.log("Received BATTLE_SEND_ACTION");
        let newMessage : string = "";
        data.forEach(action => {
            let senderName :string = "";
            let receiverName :string = "";
            let targetId : void = action.targetId;
            let spellName : string = action.spellName; // Enum à terme ?
            let accuracy : number = action.accuracy;
            let remainingHp : number = action.remainingHp;
            let damage : number = action.damage;

            if (targetId === userId){
                receiverName = playerName;
                senderName = opponentName;
                setPlayerHealth(remainingHp);
            }else {
                receiverName = opponentName;
                senderName = playerName;
                setOpponentHealth(remainingHp);
            }
            
            newMessage = newMessage + `\n${senderName} used ${spellName} against ${receiverName} with ${accuracy }% accuracy`
            newMessage = newMessage + `\n${receiverName} suffered ${damage} damages, they now have ${remainingHp} HP remaining\n`
        })
        setAnnouncerMessage(newMessage);
    });

    // Game Over ==> Update view for results
    socket.on(ESocket.BATTLE_OVER, (data : BattleEndPayload) => {
        console.log(`Received BATTLE_OVER winner has id : ${data.userId} and status : ${data.status}`);
        let winnerId : number = data.userId;
        let status : string = data.status;
        if (status === "won"){
            handleGameEnd(playerName);
        }else {
            handleGameEnd(opponentName);
        }
    });

    // Simulate an emit of attack 
    function sendAttack () {
        const data = {
            accuracy : 1,
            spellId : 2, // 8 one shot pour les tests
            battleId : battleId,
        };
        console.log("Try to send BATTLE_RECEIVE_ACTION --> accuracy : "+data.accuracy+ " spellId : "+ data.spellId + " battleId : "+ data.battleId + " with socket :"+socketMobile.id)
        socketMobile.emit("BATTLE_RECEIVE_ACTION", data);
    }
    function oneShot () {
        const data = {
            accuracy : 1,
            spellId : 8, // 8 one shot pour les tests
            battleId : battleId,
        };
        console.log("Try to send BATTLE_RECEIVE_ACTION --> accuracy : "+data.accuracy+ " spellId : "+ data.spellId + " battleId : "+ data.battleId + " with socket :"+socketMobile.id)
        socketMobile.emit("BATTLE_RECEIVE_ACTION", data);
    }
    // Simulate an emit of attack 

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
                <img
                    className={`${styles["character-sprite"]} ${styles["player-sprite"]}`}
                    src="https://e7.pngegg.com/pngimages/248/179/png-clipart-kakaotalk-kakao-friends-emoticon-character-gargamel-hand-fictional-character-thumbnail.png"
                    alt={playerName}
                />

                <img
                    className={`${styles["character-sprite"]} ${styles["opponent-sprite"]}`}
                    src="https://e7.pngegg.com/pngimages/699/594/png-clipart-smurf-male-character-illustration-gargamel-the-smurfs-azrael-smurfette-brainy-smurf-smurfs-hand-fictional-character-thumbnail.png"
                    alt={opponentName}
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

            {/* Boutons d'actions */}
            <div className={styles["action-buttons"]}>
                <button
                    className={styles["action-button"]}
                    onClick={sendAttack}
                >
                    Send an Attack
                </button>
                <button
                    className={styles["action-button"]}
                    onClick={oneShot}
                >
                    Send a OneShot
                </button>
            </div>
        </>
    );
};
