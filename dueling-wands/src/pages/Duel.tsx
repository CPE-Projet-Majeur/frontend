import React, { useEffect, useState } from 'react';
import { Battle } from '../components/duel/Battle.tsx';
import { StartMenu } from '../components/Duel/StartMenu.tsx';
import styles from "./CSS/duel.module.css"
import { Socket } from 'socket.io-client';
import { ESocket } from '../types/ESocket.ts';
import { EWeather } from '../types/EWeather.ts';
import IUser from '../types/IUser.ts';

interface IProps {
    socket : Socket,
    battleId : number,
    weather : EWeather,
    players : IUser[],
}

export const Duel = (props : IProps) => {
    const socket=props.socket;
    const [mode,setMode] = useState('start');
    const [winner, setWinner] = useState(null);

    useEffect(() => { 
        if (!socket){
            console.log("Chaussette absente")
            return;
        }
    }, [socket]);

    return (
        <div className={styles.main}>
            {mode === 'start' && (
                <div className={styles.startMenu}>
                    <h2>Welcome to the Magical Battle</h2>
                    <StartMenu onStartClick={() => setMode('battle')} />
                </div>
            )}
            {mode === 'battle' && (
                <div className={styles.battle}>
                    <Battle battleId={props.battleId} weather={props.weather} players={props.players} socket={socket} onGameEnd={winner => {
                        setWinner(winner);
                        setMode('gameOver');
                    }} />
                </div>
            )}
            {mode === 'gameOver' && (
                <div className={styles.gameOver}>
                    <p>Game Over, the winner is <b>{winner}</b></p>
                </div>
            )}
        </div>
    );
};