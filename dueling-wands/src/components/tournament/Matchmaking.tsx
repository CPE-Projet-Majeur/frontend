import React from 'react';
import { QrCode } from './QrCode';
import { Socket } from "socket.io-client";
import styles from './CSS/matchmaking.module.css'
import Tree from './Tree';
import { EWeather } from '../../types/EWeather';
import { TournamentNode } from '../../pages/Tournament';

interface IProps {
    battleId: number;
    tree ?: Map<number, TournamentNode[]>;
    socketMobile : Socket;
}

export const Matchmaking = (props : IProps) => {
    const tree = props.tree;
    const battleId = props.battleId;

    // Section ne servant que pour la simulation du tel qui scan le qr code et contacte le back
    const socketMobile = props.socketMobile;
    function simulateMobile () {
        if (socketMobile) {
            console.log("Try to emit BATTLE_WAITING")
            const data = {battleId:battleId, weather:EWeather.WINDY};
            socketMobile.emit("BATTLE_WAITING", data);
        }
    }
    // Section ne servant que pour la simulation du tel qui scan le qr code et contacte le back

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
        {/* <button onClick={simulateMobile}>Simulate Mobile</button> */}
    </div>
);
};