import React from "react";
import styles from "../CSS/Bar.module.css"

interface IProps {
    label : string,
    value : number,
    maxValue : number
}

export const Bar = (props : IProps) => {
    return (
        <div className={styles.main}>
            <h3>{props.label}</h3>
            <div className={styles.max}>
                <p className={styles.value} 
                style = {{width : `${(props.value/props.maxValue)*100}%`}}>

                </p>
            </div>

        </div>
    )
}