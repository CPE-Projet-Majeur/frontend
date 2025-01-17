/**
 * @author Thibaut Berthet
 */

import React from "react"
import styles from "./CSS/Start.module.css"

export const WaitMenu = () => {
  return (
    <div className={styles.main}>
      <p>Waiting for your opponent to join the fight ...</p>
    </div>
  )
}