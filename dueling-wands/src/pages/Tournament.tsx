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
import Tree from '../components/tournament/Tree.tsx';

let SOCKET_SERVER_URL: string;
const dev: string = `${import.meta.env.VITE_ENV}`
if (dev === "DEV") {
    SOCKET_SERVER_URL = `${import.meta.env.VITE_SOCKET_URL}`
    console.log(`${SOCKET_SERVER_URL}`)
} else {
    SOCKET_SERVER_URL = ""
}

export type TournamentNode ={
    _userIds: number[],
    _winners: number[],
    _status: string,
    _battleId: number,
    _left: TournamentNode | null,
    _right: TournamentNode | null,
}

export type BracketStartData = {
    battleId: number;
    userIds: number[];
    tree: Map<number, TournamentNode[]>;
}

export const Tournament = () => {

    let user = useSelector((state: RootState) => state.user.user!);
    const [socket, setSocket] = useState<Socket>();
    const [inTournament, setInTournament] = useState<boolean>(false);
    const [tree, setTree] = useState<Map<number, TournamentNode[]>>();
    const [players, setPlayers] = useState<Player[]>([]);
    const [weather, setWeather] = useState(EWeather.SUNNY);
    const [battleId, setBattleId] = useState(-1);
    const [inFight,setInFight] = useState(false);
    const [wait, setWait] = useState(false);
    const [tournamentOver, setTournamentOver] = useState(false);

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
        socket.on(ESocket.TOURNAMENT_BRACKET_START, (data : BracketStartData) => {
            console.log("Received TOURNAMENT_BRACKET_START")
            let battleId : number = data.battleId;
            let userIds : number[] = data.userIds;
            let tree : Map<number, TournamentNode[]> = data.tree;
            setBattleId(battleId);
            setInTournament(true);
            setTree(tree);

            // Set usefull for the other rounds of battle in the tournament :
            setInFight(false);
            setWait(false);
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

        socket.on(ESocket.TOURNAMENT_OVER, (data : number[])=>{
            setTournamentOver(true);
        });

        // Receive an error ==> User can be alerted
        socket.on(ESocket.ERROR, (data) => {
            alert(`Error code ${data.code}: \n${data.message}`)
        });
    }

    function RestartNewTournament (){
        setInTournament(false);
        setPlayers([]);
        setInFight(false);
        setWait(false);
        setTournamentOver(false);
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
            {!inTournament  && socket &&(
                <div className={styles.section}>
                    <TournamentCreation socket={socket}/>
                </div>
            ) }
            {inTournament && socket && socketMobile && !inFight && !wait &&(
                <div className={styles.section}>
                    <Matchmaking battleId={battleId} tree={tree} socketMobile={socketMobile}/>
                </div>
            )}
            {inTournament && !inFight && wait && (
                <div className={styles.section}>
                    <WaitMenu />
                </div>
            )}
            {inTournament && socket && socketMobile && !wait && inFight && !tournamentOver &&(
                <div className={styles.section}>
                    <Duel battleId={battleId} weather={weather} players={players} socket={socket} socketMobile={socketMobile}/>
                </div>
            )}
            {tournamentOver && (
                <div className={styles.section}>
                    <h2>The tournament is Over</h2>
                    <p className={styles.sectionP}>Thanks for your <b>Magic</b> participation <b>Warloks</b></p>
                    <Tree tournamentData={tree}/>
                    <button className={styles.overButton} onClick={RestartNewTournament}>Start a new Tournament</button>
                </div>
            )}
        </div>
    );
};