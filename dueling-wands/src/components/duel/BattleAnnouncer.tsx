import React from "react";
import styles from "./CSS/BattleAnnouncer.module.css";

interface IProps {
    message: string;
}

export const BattleAnnouncer = (props: IProps) => {
    const typedMessage: string = props.message;

    return (
        <div className={styles.main}>
            <p className={styles.message}>{typedMessage}</p>
        </div>
    );
};
