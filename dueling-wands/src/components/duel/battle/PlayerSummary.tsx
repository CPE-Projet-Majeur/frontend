import React from "react";
import {Bar} from './Bar'
import styles from "../CSS/PlayerSummary.module.css"

const red = "#821200"
const blue = "#1953cb"

interface IProps {
    isMainCharacter : boolean, // true si c'est moi, false si c'est l'adversaire
    name : string,
    health : number,
    maxHealth : number,
}

export const PlayerSummary = (props : IProps) => {
    //props.isMainCharacter = false;

    return (
        <div style={{backgroundColor : props.isMainCharacter ? red : blue}}>
            <div className={styles.info}>
                <h3 className={styles.name}>{props.name}</h3>
            </div>
            <div className={styles.health}>
                <Bar label="HP" value={props.health} maxValue={props.maxHealth} />
            </div>
        </div>
    )
}