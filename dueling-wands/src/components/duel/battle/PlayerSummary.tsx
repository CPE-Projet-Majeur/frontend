import React from "react";
import {Bar} from './Bar'
import styles from "../CSS/PlayerSummary.module.css"

interface IProps {
    isMainCharacter : boolean, // true si c'est moi, false si c'est l'adversaire
    name : string,
    health : number,
    maxHealth : number,
}

export const PlayerSummary = (props : IProps) => {
  let hp : string = `HP : ${props.health}%`; 

  return (
    <div
        className={`${styles.container} ${
            props.isMainCharacter ? styles.mainCharacter : styles.opponent
        }`}
    >
        {/* Informations principales */}
        <div className={styles.info}>
            <h3 className={styles.name}>{props.name}</h3>
        </div>

        {/* Barre de santé */}
        <div className={styles.health}>
            <Bar label={hp} value={props.health} maxValue={props.maxHealth} />
        </div>
    </div>
);
};