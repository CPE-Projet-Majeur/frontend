import React from 'react';
import { QrCode } from './QrCode';
import { Socket } from "socket.io-client";
import styles from './CSS/matchmaking.module.css'
import Tree from './Tree';
import { TournamentNode } from '../../pages/Tournament';

interface IProps {
    battleId: number;
    tree ?: Map<number, TournamentNode[]>;
}

export const Matchmaking = (props : IProps) => {
    const tree = props.tree;
    const battleId = props.battleId;

    return (
    <div className={styles.container}>
        {/* Affichage de l'arbre */}
        <div className={styles.treeSection}>
            <Tree tournamentData={tree}/>
        </div>
        {/* Affichage du QR Code */}
        <div className={styles.qrCodeSection}>
            <QrCode qrdata={battleId} />
        </div>
    </div>
);
};