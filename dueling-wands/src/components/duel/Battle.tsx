import React, { useState } from "react";
import { PlayerSummary } from "./battle/PlayerSummary";
import { BattleAnnouncer } from "./BattleAnnouncer";
import styles from "./CSS/Battle.module.css"

const maxHealth : number = 1000;

interface IProps {
    onGameEnd,
}

export const Battle = (props:IProps) => {

    //const [onGameEnd, setOnGameEnd] = useState(props.onGameEnd);
    const [playerHealth, setPlayerHealth] = useState (maxHealth);
    const [opponentHealth, setOpponentHealth] = useState (maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState("");

    let opponentName = "Julie" // Provisoire, à fetch
    let playerName = "Priscilla" // Provisoire, à fetch

    const defaultMessage = "Message Displayer"


    return (
        <>
            <h2 className={styles.gameHeader}>{playerName} VS {opponentName}</h2>
            <div className={styles.summaryContainer}>
                <div className={styles.opponent}>
                    <div className={styles.summary}>
                    <PlayerSummary 
                        isMainCharacter={false} 
                        health={opponentHealth}
                        name={opponentName}
                        maxHealth={maxHealth}
                    />
                    </div>
                </div>

                <div className={styles.user}>
                    <div className={styles.summary}>
                    <PlayerSummary 
                        isMainCharacter={true} 
                        health={playerHealth}
                        name={playerName}
                        maxHealth={maxHealth}
                    />
                    </div>
                </div>
            </div>


            <div className= {styles.characters}>
                <div className={styles.gameImages}>
                    <div className={styles.playerSprite}>
                        <img 
                            src={"https://e7.pngegg.com/pngimages/248/179/png-clipart-kakaotalk-kakao-friends-emoticon-character-gargamel-hand-fictional-character-thumbnail.png"}
                            alt={playerName}
                            //className={styles[playerAnimation]}
                        />
                    </div>
                    <div className={styles.opponentSprite}>
                    <img 
                            src={"https://e7.pngegg.com/pngimages/699/594/png-clipart-smurf-male-character-illustration-gargamel-the-smurfs-azrael-smurfette-brainy-smurf-smurfs-hand-fictional-character-thumbnail.png"}
                            alt={opponentName}
                            //className={styles[opponentAnimation]}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.hud}>
                <div className={styles.hudChild}>
                    <BattleAnnouncer message={announcerMessage!=="" ? announcerMessage : defaultMessage} />
                </div>
            </div>
        </>
    )
}