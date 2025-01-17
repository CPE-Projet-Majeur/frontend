import React, { useEffect, useState } from 'react';
import { TournamentCreation } from '../components/tournament/TournamentCreation';
import { Matchmaking } from '../components/tournament/Matchmaking';
import { RootState } from "../store.ts";
import { io, Socket } from 'socket.io-client';
import { Duel } from './Duel.tsx';
import styles from "./CSS/tournament.module.css"
import { ESocket } from '../types/ESocket.ts';
import { EWeather } from '../types/EWeather.ts';
import { Player, StartPayload } from '../types/TBattle.ts';
import { WaitMenu } from '../components/duel/WaitMenu.tsx';
import { useSelector } from 'react-redux';

let SOCKET_SERVER_URL: string;
const dev: string = `${import.meta.env.VITE_ENV}`
if (dev === "DEV") {
    SOCKET_SERVER_URL = `${import.meta.env.VITE_SOCKET_URL}`
    console.log(`${SOCKET_SERVER_URL}`)
} else {
    SOCKET_SERVER_URL = ""
}

export const Tournament = () => {

    let user = useSelector((state: RootState) => state.user.user!); // ⚠️ Il faudra a terme supprimer le !
    const [socket, setSocket] = useState<Socket>();
    const [inTournament, setInTournament] = useState<boolean>(false);
    const [tree, setTree] = useState();
    const [players, setPlayers] = useState<Player[]>([]);
    const [weather, setWeather] = useState(EWeather.SUNNY);
    const [battleId, setBattleId] = useState(-1);
    const [inFight,setInFight] = useState(false);
    const [wait,setWait] = useState(false);

    // Initialisation de la socket
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL, { query: { userId: user.id, userFirstName:user.login, userLastName:user.lastName, type: "tournament"} });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`✅ Connected to the server with client socket id : ${newSocket.id}`);
        });        return () => {
            newSocket.disconnect();
        };
        
    }, [user]);

    if (socket){
        // Receive the information to start a tournament
        socket.on(ESocket.TOURNAMENT_BRACKET_START, (data) => {
            console.log("Received TOURNAMENT_BRACKET_START")
            let battleId : number = data.battleId;
            let userIds : number = data.userIds;
            let tree = data.tree;
            setBattleId(battleId);
            setInTournament(true);
            setTree(tree);


            // Set usefull for the other rounds of battle in the tournament :
            setInFight(false);
            setWait(false);
            //console.log("Tree : "+tree);
            //console.log("Tournament started");
        })

        // Receive the acknolegement, the user succesfully joined the room via the QRcode
        socket.on(ESocket.WAITING_ACKNOWLEDGED, () => {
            console.log("Received WAITING_ACKNOWLEDGED")
            setWait(true);
        });

        // Receive the Start ==> Users can start to fight
        socket.on(ESocket.BATTLE_START, (data : StartPayload) => {
            console.log("Received BATTLE_START : battleId : "+battleId+" - players : "+players+" - weather : "+weather);
            setBattleId(data.battleId);
            setPlayers(data.players);
            setWeather(data.weather);
            setWait(false);
            setInFight(true);
        });

        // Receive the new version of the Tree
        socket.on(ESocket.TOURNAMENT_UPDATED, (data) => {
            console.log("Received TOURNAMENT_UPDATED : "+ data);
            setTree(data.tree);
        })

        // Receive an error ==> User can be alerted
        socket.on(ESocket.ERROR, (data) => {
            alert(`Error code ${data.code}: \n${data.message}`)
        });
    }


    // Section temporaire pour tester les actions du mobile 
    const [socketMobile, setSocketMobile] = useState<Socket>();
    // Initialisation de la socket
    useEffect(() => {
        const newSocketMobile = io(SOCKET_SERVER_URL, { query: { userId: user.id, userFirstName:user.login, userLastName:user.lastName} });
        setSocketMobile(newSocketMobile);

        newSocketMobile.on("connect", () => {
            console.log(`✅ Connected to the server with mobile socket id : ${newSocketMobile.id}`);
        });        return () => {
            newSocketMobile.disconnect();
        };
        
    }, [user]);
    // Fin de section temporaire pour testes les actions du mobile

    return (
        <div className={styles.container}>
            <h1>Tournament</h1>
            {!inTournament  && socket &&( // Remettre
                <div className={styles.section}>
                    <TournamentCreation socket={socket}/>
                </div>
            ) }
            {inTournament && socket && socketMobile && !inFight && !wait &&( //Enlever !
                <div className={styles.section}>
                    <Matchmaking battleId={battleId} tree={tree} socketMobile={socketMobile}/>
                </div>
            )}
            {inTournament && !inFight && wait && (
                <div className={styles.section}>
                    <WaitMenu />
                </div>
            )}
            {inTournament && socket && socketMobile && !wait && inFight &&( // && matchState !== 'unset'
                <div className={styles.section}>
                    <Duel battleId={battleId} weather={weather} players={players} socket={socket} socketMobile={socketMobile}/>
                </div>
            )}
        </div>
    );
};