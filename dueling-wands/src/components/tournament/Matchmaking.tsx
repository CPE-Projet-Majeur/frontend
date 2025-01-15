import React, { useEffect, useState } from 'react';
import { QrCode } from './QrCode';
import { Socket } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { update_tournament } from '../../slices/tournamentSlice';
import IUser from '../../types/IUser';
import styles from './CSS/matchmaking.module.css'
import { ESocket } from '../../types/ESocket';
import { StartPayload } from '../../types/TBattle';
import Tree from './Tree';

interface IProps {
    battleId: number;
    tree;
}

export const Matchmaking = (props : IProps) => {
    const tree = props.tree;
    const battleId = props.battleId;
    console.log("Battle ID : "+battleId);

    const mockTournamentData = {
        0: { players: ['Alice', 'Bob'], winner: 'Alice' },
        1: { players: ['Charlie', 'David'], winner: 'Charlie' },
        2: { players: ['Alice', 'Charlie'], winner: 'Alice' },
        3: { players: ['Eve', 'Frank'], winner: 'Eve' },
        4: { players: ['Grace', 'Hank'], winner: 'Grace' },
        5: { players: ['Eve', 'Grace'], winner: 'Eve' },
        6: { players: ['Alice', 'Eve'], winner: null }
    };

    return (
    <div className={styles.container}>
        {/* Affichage de l'arbre */}
        <div className={styles.treeSection}>
            <h2>Fight Preparation</h2>
            <Tree tournamentData={mockTournamentData}/>
        </div>
        {/* Affichage du QR Code */}
        <div className={styles.qrCodeSection}>
            <QrCode qrdata={battleId} />
        </div>
    </div>
);
};