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
    return (
        <div
          className={`${styles.container} ${
            props.isMainCharacter ? styles.mainCharacter : styles.opponent
          }`}
        >
          <div className={styles.info}>
            <h3 className={styles.name}>{props.name}</h3>
          </div>
          <div className={styles.health}>
            <Bar label="HP" value={props.health} maxValue={props.maxHealth} />
          </div>
        </div>
      );
}