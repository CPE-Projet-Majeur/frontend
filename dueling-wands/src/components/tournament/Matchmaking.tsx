import React from 'react';
import { QrCode } from './QrCode';
import { Socket } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { update_tournament } from '../../slices/tournamentSlice';
import IUser from '../../types/IUser';
import styles from './CSS/matchmaking.module.css'

interface IProps {
    socket: Socket;
    user: IUser;
}

export const Matchmaking = (props : IProps) => {
    const socket = props.socket;
    const user: IUser = props.user;

    const dispatch = useDispatch();
    //const tournament = await fetchTournamentByCode(generatedCode);
    //dispatch(update_tournament({ tournament }));

    const fightCode = 'test'; // Demander a la backend de générer un code de combat 
                             // à envoyer au mobile.
    return (
    <div className={styles.container}>
        {/* Affichage de l'arbre */}
        <div className={styles.treeSection}>
            <h2>Fight Preparation</h2>
            {/* <Tree /> */}
        </div>

        {/* Affichage du QR Code */}
        <div className={styles.qrCodeSection}>
            <QrCode qrdata={fightCode} />
        </div>
    </div>
);
};