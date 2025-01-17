import React from "react";
import { useTypedMessage } from "../../hooks/useTypeMessage";
import styles from "./CSS/BattleAnnouncer.module.css"

interface IProps {
    message : string,
}

export const BattleAnnouncer = (props : IProps) => {
    const typedMessage : string = useTypedMessage(props.message);
    //console.log("Typed message :" + typedMessage);
    return (
        <div className={styles.main}>
            <p className={styles.message}> {typedMessage} </p>
        </div>
    )
}