import React from 'react';
import { QrCode } from './QrCode';
import { fetchTournamentByCode } from '../../services/tournamentService';
import { useDispatch } from 'react-redux';
import { update_tournament } from '../../slices/tournamentSlice';

export const Matchmaking = () => {

    const dispatch = useDispatch();
    //const tournament = await fetchTournamentByCode(generatedCode);
    //dispatch(update_tournament({ tournament }));

    const fightCode = 'test'; // Demander a la backend de générer un code de combat 
                            // à envoyer au mobile.
    return(
    <div>
        <QrCode qrdata={fightCode}/>
    </div>
    );};