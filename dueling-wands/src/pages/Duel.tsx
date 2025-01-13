import React, { useEffect, useState } from 'react';
import { Battle } from '../components/duel/Battle.tsx';
import { StartMenu } from '../components/Duel/StartMenu.tsx';
import styles from "./CSS/duel.module.css"
import { Socket } from 'socket.io-client';
import { ESocket } from '../types/ESocket.ts';

interface IProps {
    socket : Socket,
}

export const Duel = (props : IProps) => {
    const socket=props.socket;
    const [mode,setMode] = useState('start');
    const [winner, setWinner] = useState('');

    useEffect(() => { 
        if (!socket){
            console.log("Chaussette absente")
            return;
        }
        socket.on(ESocket.)// Continuer ici, réévaluer les évenements socket

    }, [socket]);

    return(
        <div className={styles.main}>
            {mode === 'start' && (<StartMenu onStartClick={() => setMode('battle')}/>)}
            {mode === 'battle' && (<Battle onGameEnd={winner => {
                setWinner(winner);
                setMode('gameOver');
            }}/>)}
            {mode === 'gameOver' && (<>Game Over, the winner is {winner}</>)}
        </div>
    )};