import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    const socket = props.socket;
    const ownerName : string = useSelector((state: RootState) => state.user.user?.login || "");
    const ownerId : number = useSelector((state: RootState) => state.user.user?.id || -1);
    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [friendCode, setFriendCode] = useState<string>("");
    const [roomOk, setRoomOk] = useState<number>(-1);
    const [tournamentOwner, setTournamentOwner] = useState<boolean>(false);
    const [tournamentId, setTournamentId] = useState<number>(-1);
    const [tournamentParticipants, setTournamentParticipants] = useState<TournamentParticipant[]>([]);
    const [tournamentName, setTournamentName] = useState<string>("");

    // ----------- Manage Socket Reception ----------- //

    // Receive the Tournament code - OK
    socket.on(ESocket.TOURNAMENT_CREATED, (data) => {
        //console.log("Received data from socket on TOURNAMENT_CREATED : "+data)
        let tournamentCode : string = data.code;
        let tournamentIdentifier : number = data.tournamentId;
        setGeneratedCode(tournamentCode);
        setTournamentId(tournamentIdentifier);
        setTournamentOwner(true);
        //dispatch(set_owner_id({ id : ownerId }));
    });

    // Receive the status room joining - OK
    socket.on(ESocket.TOURNAMENT_JOINED, (data) => {
        let tournamentId = data.tournamentId;
        let tournamentName = data.tournamentName;
        let tournamentParticipantsList = data.tournamentParticipants;
        //console.log("Tournament list : "+tournamentParticipantsList)
        setTournamentId(tournamentId);
        setTournamentName(tournamentName);
        setTournamentParticipants(tournamentParticipantsList);
        setRoomOk(0);
    });

    // Ask for a Tournament code generation - OK
    function generateTournamentCode () {
        if (tournamentName === "" ) alert("Please provide a Tournament Name");
        else {
            const data = tournamentName;
            setTournamentParticipants([{name : ownerName, id : ownerId}]);
            //console.log("Try to emit TOURNAMENT_CREATION : "+data);
            socket.emit(ESocket.TOURNAMENT_CREATION, data);
        }
    }

    // Ask to join a tournament - OK
    function joinTournament () {
        const data = friendCode
        //console.log("Try to join my friend's tournament : " + data);
        socket.emit(ESocket.TOURNAMENT_JOIN, data);
    }

    // Ask to start a tournament - OK
    function start () {
        const data = tournamentId;
        //console.log("Try to start the tournament with the id : "+ data);
        socket.emit(ESocket.TOURNAMENT_START, data)
    }

    return (
        <div className={styles["magic-room-container"]}>
            <h2 className={styles["magic-room-title"]}>Magic Room Creation</h2>

            {roomOk !== 0 && (
                <div className={styles["magic-room-section"]}>
                    <input
                        className={styles["magic-room-input"]}
                        type="text"
                        placeholder="Enter Tournament Name"
                        
                        onChange={(e) => setTournamentName(e.target.value)}
                    />
                    <p className={styles["magic-room-text"]}>
                        Generate a <b>Tournament Code</b> to share with your friends
                    </p>
                    {generatedCode && (
                        <p className={styles["magic-room-code"]}>Room Code: {generatedCode}</p>
                    )}
                    <button
                        className={styles["magic-room-button"]}
                        onClick={generateTournamentCode}
                    >
                        Generate Code
                    </button>
                    {!tournamentOwner && (
                        <>
                            <p className={styles["magic-room-text"]}>
                                Enter your friend's <b>Tournament Code</b> to join!
                            </p>
                            <input
                                className={styles["magic-room-input"]}
                                type="text"
                                placeholder="Friend's Tournament Code"
                                value={friendCode}
                                onChange={(e) => setFriendCode(e.target.value)}
                            />
                            <button
                                className={styles["magic-room-button"]}
                                onClick={joinTournament}
                            >
                                Join Tournament
                            </button>
                        </>
                    )}
                </div>
            )}

            {roomOk === 0 && tournamentParticipants && !tournamentOwner && (
                <div className={styles["magic-room-owner-section"]}>
                    <h2>{tournamentName}</h2>
                    <p className={styles["magic-room-text"]}>
                        Waiting for the <b>Tournament Owner</b> to start the magic...
                    </p>
                </div>
            )}

            {tournamentOwner && (
                <div className={styles["magic-room-owner-section"]}>
                    <p className={styles["magic-room-text"]}>
                        <b>Wizards</b> in the room:{" "}
                        {tournamentParticipants.map((participant) => participant.name).join(" ~ ")}
                    </p>
                    <button
                        className={styles["magic-room-button"]}
                        onClick={start}
                    >
                        Start the Tournament
                    </button>
                </div>
            )}
        </div>
    );
};