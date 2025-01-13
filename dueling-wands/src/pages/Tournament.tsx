import React, { Fragment, useEffect, useState } from 'react';
import { TournamentCreation } from '../components/tournament/TournamentCreation';
import { Matchmaking } from '../components/tournament/Matchmaking';
import { Fight } from '../components/tournament/Fight';
import { FightResults } from '../components/tournament/FightResult';
import { fetchTournamentByCode } from '../services/tournamentService';
import { RootState } from "../store.ts";
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import ITournament from '../types/ITournament.ts';
import { update_tournament } from '../slices/tournamentSlice.ts';
import { Duel } from './Duel.tsx';

enum TOURNAMENT_CREATION {
    TOURNAMENT_JOINED = 'TOURNAMENT_JOINED',
}

export const Tournament = () => {
    let SOCKET_SERVER_URL: string;
    const dev: string = `${import.meta.env.VITE_ENV}`
    if (dev === "DEV") {
        SOCKET_SERVER_URL = `${import.meta.env.VITE_SOCKET_URL}`
    } else {
        SOCKET_SERVER_URL = ""
    }

    const dispach = useDispatch();
    let matchState : string = useSelector((state: RootState) => state.tournament.state);
    let inTournament : boolean = useSelector((state: RootState) => state.tournament.tournament?.status || false);
    let tournamentCode : string = useSelector((state: RootState) => state.tournament.tournament?.code || "");
    let user = useSelector((state: RootState) => state.user.user!); // ⚠️ Il faudra a terme supprimer le !
    const [socket, setSocket] = useState<Socket>();

    // Initialisation de la socket
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL, { query: { userId: user.id, userName:user.login} });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("✅ Connected to the server");
        });        return () => {
            newSocket.disconnect();
        };
        
    }, [user]);

    // Écoute des événements de type GAME_STARTS
    useEffect(() => {
        if (!socket) return;

        // Écoute des événements uniquement de type TOURNAMENT_JOINED
        socket.on(TOURNAMENT_CREATION.TOURNAMENT_JOINED, () => {
            console.log('Tournament has been initialised');
            handleTournamentInitialisation();
        });
    }, [socket]);

    // Permet de fetch l'entièreté du tournoi avant de commencer les combats
    const handleTournamentInitialisation = async () => { 
        const tournament : ITournament = await fetchTournamentByCode(tournamentCode);
        dispach(update_tournament({ tournament }));
        console.log("Fetched tournament : " + tournament);
    }

    return (
        <Fragment>
            <h1>Tournament</h1>
            {!inTournament  &&(
                <div>
                    <TournamentCreation/>
                </div>
            ) }
            {inTournament && socket &&( 
                <div>
                    <Matchmaking socket={socket} user={user}/>
                </div>
            )}
            {inTournament && matchState !== 'unset' && socket &&( // Remettre a 'unset' quand j'aurai fini de tester
                <div>
                    <Duel socket={socket} />
                </div>
            )}
        </Fragment>
    );
};