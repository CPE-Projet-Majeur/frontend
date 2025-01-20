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
    socketMobile : Socket,
}

const getWeatherVideo = (weather: EWeather) => {
    switch (weather) {
        case EWeather.SUNNY: 
            return "https://videos.pexels.com/video-files/2098989/2098989-hd_1920_1080_25fps.mp4";
        case EWeather.SUNNY: 
            return "https://videos.pexels.com/video-files/3197031/3197031-hd_1920_1080_25fps.mp4";
        case EWeather.SUNNY: 
            return "https://videos.pexels.com/video-files/857094/857094-hd_1920_1080_25fps.mp4";
        default:
            return "https://videos.pexels.com/video-files/3433955/3433955-uhd_2732_1440_24fps.mp4";
    }
}

export const Duel = (props : IProps) => {
    const socket=props.socket;
    const [mode,setMode] = useState('battle');
    const [winner, setWinner] = useState<string>("-");

    const videoSource = getWeatherVideo(props.weather);

    return (
        <div className={styles.main}>
            {/* <video
                key={videoSource} 
                src={videoSource}
                autoPlay
                muted
                loop
                playsInline
                className={styles.backgroundVideo}
            /> */}
            <div className={styles.overlay}>
                {mode === 'battle' && (
                    <div className={styles.battle}>
                        <Battle socketMobile={props.socketMobile} battleId={props.battleId} weather={props.weather} players={props.players} socket={socket} onGameEnd={winner => {
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
