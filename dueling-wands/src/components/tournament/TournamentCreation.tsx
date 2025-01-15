import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournamentCode, joinRoom, startTournament } from '../../services/tournamentService';
import { set_tournament_code, set_owner_id } from '../../slices/tournamentSlice';
import { RootState } from '../../store';
import styles from "./CSS/tournamentCreation.module.css"
import { Socket } from 'socket.io-client';
import { ESocket } from '../../types/ESocket';

interface IProps {
    socket : Socket;
}

type TournamentParticipant = {
    name: string;
    id: number;
}

export const TournamentCreation = (props : IProps) => {
    const dispatch = useDispatch();
    const socket = props.socket;
    const ownerId : number = useSelector((state: RootState) => state.user.user?.id || -1);
    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [friendCode, setFriendCode] = useState<string>("");
    const [roomOk, setRoomOk] = useState<number>(-1);
    const [tournamentOwner, setTournamentOwner] = useState<boolean>(false);
    const [tournamentId, setTournamentId] = useState<number>(-1);
    const [tournamentParticipants, setTournamentParticipants] = useState<TournamentParticipant[]>([]);

    // ----------- Manage Socket Reception ----------- //

    // Receive the Tournament code - OK
    socket.on(ESocket.TOURNAMENT_CREATED, (data) => {
        console.log("Received data from socket on TOURNAMENT_CREATED : "+data)
        let tournamentCode : string = data.code;
        let tournamentIdentifier : number = data.tournamentId;
        setGeneratedCode(tournamentCode);
        setTournamentId(tournamentIdentifier);
        setTournamentOwner(true);
        dispatch(set_owner_id({ id : ownerId }));
    });

    // Receive the status room joining - OK
    socket.on(ESocket.TOURNAMENT_JOINED, (data) => {
        let tournamentId = data.tournamentId;
        let tournamentName = data.tournamentName;
        let tournamentParticipantsList = data.tournamentParticipants;
        console.log("Tournament list : "+tournamentParticipantsList)
        setTournamentId(tournamentId);
        setTournamentParticipants(tournamentParticipantsList);
        setRoomOk(0);
    });

    // Ask for a Tournament code generation - OK
    function generateTournamentCode () {
        const data = "Nom random";
        console.log("Try to emit TOURNAMENT_CREATION : "+data);
        socket.emit(ESocket.TOURNAMENT_CREATION, data);
    }

    // Ask to join a tournament - OK
    function joinTournament () {
        const data = friendCode
        console.log("Try to join my friend's tournament : " + data);
        socket.emit(ESocket.TOURNAMENT_JOIN, data);
    }

    // Ask to start a tournament - OK
    function start () {
        const data = tournamentId;
        console.log("Try to start the tournament with the id : "+ data);
        socket.emit(ESocket.TOURNAMENT_START, data)
    }

    return(
        <div className={styles.container}>
            <h2>Magic Room Creation</h2>
            {roomOk!==0 && (
                <div className={styles.section}>
                    <p>Generate a <b>Tournament Code</b> to share with your friends</p>
                    {generatedCode && <p>Room Code : {generatedCode}</p>}
                    <button onClick={generateTournamentCode}> Generate </button>
                    <p>Write your friend's <b>Tournament Code</b> to take part !</p>
                    <input
                        type="text"
                        placeholder="Friend's Code"
                        value={friendCode}
                        onChange={(e) => setFriendCode(e.target.value)} 
                    />
                    <button onClick={joinTournament}> Join </button>
                </div>
            ) }
            {roomOk===0 && tournamentParticipants && !tournamentOwner &&(
                <div className={styles.tournamentOwnerSection}>
                    <p>Waiting for the tournament owner to start the magic...</p>
                </div>
            )}
            {tournamentOwner && (
                <div className={styles.tournamentOwnerSection}>
                    <p>
                        Witchs and wizards in the room :{" "}
                        {tournamentParticipants.map(participant => participant.name).join(', ')}
                    </p>

                    <button onClick={start}> Start the tournament </button>
                </div>
            )}
        </div>
)};