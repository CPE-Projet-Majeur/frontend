import React, { useState } from 'react';
import { Battle } from '../components/duel/Battle.tsx';
import styles from "./CSS/duel.module.css"
import { Socket } from 'socket.io-client';
import { EWeather } from '../types/EWeather.ts';
import { Player } from '../types/TBattle.ts';

interface IProps {
    socket : Socket,
    battleId : number,
    weather : EWeather,
    players : Player[],
}

export const Duel = (props : IProps) => {
    const socket=props.socket;
    const [mode,setMode] = useState('battle');
    const [winner, setWinner] = useState<string>("-");

    return (
        <div className={styles.main}>
            <div className={styles.overlay}>
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
                        <img src="https://images6.alphacoders.com/112/1120443.jpg" alt="Game Over" />
                    </div>
                )}
            </div>
        </div>
    );
};
