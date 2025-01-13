/**
 * @author Thibaut Berthet
 */

import React from "react"
import styles from "./CSS/Start.module.css"

interface IProps {
    onStartClick
}

export const StartMenu = (props : IProps) => {

    return (
        <div className={styles.main}>
        <button className={styles.startButton} onClick={props.onStartClick}>
          Start Game
        </button>
      </div>
    )
}