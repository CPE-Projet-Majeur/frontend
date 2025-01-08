import React, { Fragment } from 'react';
import { TournamentCreation } from '../components/tournament/TournamentCreation';
import { Matchmaking } from '../components/tournament/Matchmaking';
import { Fight } from '../components/tournament/Fight';
import { FightResults } from '../components/tournament/FightResult';

import { RootState } from "../store.ts";
import { useSelector } from 'react-redux';

export const Tournament = () => {
    let inTournament : boolean = false; // Remettre a false quand j'aurai fini de tester
    let inFight : boolean = false; // Remettre a false quand j'aurai fini de tester
    let matchState : string = useSelector((state: RootState) => state.tournament.state);
    let tournamentCode : string = useSelector((state: RootState) => state.tournament.tournament?.code || "");

    return (
        <Fragment>
            <h1>Tournament</h1>
            {!inTournament ?(
                <div>
                    <TournamentCreation/>
                </div>
            ) : (
                <div>
                    <Matchmaking />
                </div>
            )}
            {matchState !== 'unset' && ( // Remettre a 'unset' quand j'aurai fini de tester
                <div>
                    <Fight />
                    <FightResults />
                </div>
            )}
        </Fragment>
    );
};