import React, { useEffect, useState } from 'react';
import { TournamentCreation } from '../components/tournament/TournamentCreation';
import { Matchmaking } from '../components/tournament/Matchmaking';
import { fetchTournamentByCode } from '../services/tournamentService';
import { RootState } from "../store.ts";
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { Duel } from './Duel.tsx';
import styles from "./CSS/tournament.module.css"
import { ESocket } from '../types/ESocket.ts';
import IUser from '../types/IUser.ts';
import { EWeather } from '../types/EWeather.ts';
import { StartPayload } from '../types/TBattle.ts';

export const Tournament = () => {
    let SOCKET_SERVER_URL: string;
    const dev: string = `${import.meta.env.VITE_ENV}`
    if (dev === "DEV") {
        SOCKET_SERVER_URL = `${import.meta.env.VITE_SOCKET_URL}`
        console.log(`${SOCKET_SERVER_URL}`)
    } else {
        SOCKET_SERVER_URL = ""
    }

    const dispach = useDispatch();
    let matchState : string = useSelector((state: RootState) => state.tournament.state);
    //let inTournament : boolean = useSelector((state: RootState) => state.tournament.tournament?.status || false);
    let tournamentCode : string = useSelector((state: RootState) => state.tournament.tournament?.code || "");
    let user = useSelector((state: RootState) => state.user.user!); // ⚠️ Il faudra a terme supprimer le !
    const [socket, setSocket] = useState<Socket>();
    const [inTournament, setInTournament] = useState<boolean>(false);
    const [tree, setTree] = useState();
    const [players, setPlayers] = useState<IUser[]>([]);
    const [weather, setWeather] = useState(EWeather.SUNNY);
    const [battleId, setBattleId] = useState(-1);

    // Initialisation de la socket
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL, { query: { userId: user.id, userName:user.login, type: "tournament"} });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("✅ Connected to the server");
        });        return () => {
            newSocket.disconnect();
        };
        
    }, [user]);

    if (socket){
        // Receive the information to start a tournament
        socket.on(ESocket.TOURNAMENT_BRACKET_START, (data) => {
            let battleId : number = data.battleId;
            let userIds : number = data.userIds;
            let tree = data.tree;
            setBattleId(battleId);
            setInTournament(true);
            setTree(tree);
            console.log("Tree : "+tree);
            console.log("Tournament started");
        })

        // Receive the Start ==> Users can start to fight
        socket.on(ESocket.BATTLE_START, (data : StartPayload) => {
            console.log("Received BATTLE_START : "+battleId+players+weather);
            setBattleId(data.battleId);
            setPlayers(data.players);
            setWeather(data.weather);
        });
    }

    return (
        <div className={styles.container}>
            <h1>Tournament</h1>
            {!inTournament  && socket &&( // Remettre
                <div className={styles.section}>
                    <TournamentCreation socket={socket}/>
                </div>
            ) }
            {inTournament && socket &&( //Enlever !
                <div className={styles.section}>
                    <Matchmaking battleId={battleId} tree={tree}/>
                </div>
            )}
            {inTournament && socket && matchState !== 'unset' &&( // Remettre a 'unset' quand j'aurai fini de tester + enlever !
                <div className={styles.section}>
                    <Duel battleId={battleId} weather={weather} players={players} socket={socket} />
                </div>
            )}
        </div>
    );
};