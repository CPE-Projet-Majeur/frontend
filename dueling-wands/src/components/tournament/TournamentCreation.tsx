import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTournamentCode, joinRoom, startTournament } from '../../services/tournamentService';
import { set_tournament_code, set_owner_id } from '../../slices/tournamentSlice';
import { RootState } from '../../store';

export const TournamentCreation = () => {
    const dispatch = useDispatch();

    const ownerId : number = useSelector((state: RootState) => state.user.user?.id || -1);

    const [generatedCode, setGeneratedCode] = useState<string>("");
    const [friendCode, setFriendCode] = useState<string>("");
    const [roomOk, setRoomOk] = useState<number>(-1);
    const [tournamentOwner, setTournamentOwner] = useState<boolean>(false); // Mettre a false quand j'aurai fini de tester

    // Demander au backend de générer un code de tournoi à envoyer aux amis pour rejoindre la room.
    const generateTournamentCode = async () => { 
        const tournamentCode = await fetchTournamentCode();
        setGeneratedCode(tournamentCode);
        setFriendCode("");
        setTournamentOwner(true);
        dispatch(set_owner_id({ id : ownerId }));
        joinTournament();
    }

    const start = async () => { 
        const tournament : boolean= await startTournament(ownerId);
        tournament ? (
            console.log("Tournament started")
        ) : (
            console.log("Error when starting the tournament")
        );
    }

    const joinTournament = async () => {
        const code : string = friendCode ? friendCode : generatedCode;
        console.log(`Joining tournament with code: ${code}`);
        setRoomOk( await joinRoom(code));
        switch (roomOk) {
            case 0:
                console.log("Room joined successfully");
                dispatch(set_tournament_code({ code }));
                break;
            case 1:
                alert("Room not found");
                console.log("Room not found");
                break;
            case 2:
                alert("Room is full");
                console.log("Room is full");
                break;
            case 3:
                alert("Room is already started");
                console.log("Room is already started");
                break;
            default:
                //alert("Internal Error");
                //console.log("Error");
                break;
        }
    }

    return(
        <Fragment>
            {roomOk!==0 ? (
                <div>
                    <p>Generate a <b>Tournament Code</b> to share with your friends</p>
                    <output>Room Code : </output>
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
            ) : (
                <p>waiting for the tournament owner to start...</p>
            )}
            {tournamentOwner && (
                <div>
                    <p>Number of witchs and wizards in the room : </p>
                    <button onClick={start}> Start the tournament </button>
                </div>
            )}

        </Fragment>
)};