import React from 'react';
import styles from '../CSS/Bar.module.css';

interface IProps {
    label: string;
    value: number;
    maxValue: number;
}

export const Bar = (props: IProps) => {
    const percentage = Math.max(0, (props.value / props.maxValue) * 100);
    let barClass = `${styles.healthBar}`;

    if (percentage < 50) barClass += ` ${styles.orange} ${styles.shake}`;
    if (percentage < 25) barClass += ` ${styles.red} ${styles.shake}`;
    if (percentage >= 50) barClass += ` ${styles.green}`;

    return (
        <div className={styles.barComponent}>
            <p className={styles.healthParagraph}>{props.label}</p>
            <div className={styles.healthBarContainer}>
                <div
                    className={barClass}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
