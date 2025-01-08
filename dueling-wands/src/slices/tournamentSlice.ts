/**
 * @author Thibault Berthet
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ITournament from "../types/ITournament";

interface TournamentState {
    state : string;
    tournament: ITournament | null;
}

const initialState: TournamentState = {
    state: 'unset',
    tournament: null,
};

export const tournamentSlice = createSlice({
    name: 'Tournament',
    initialState,
    reducers: {
        update_tournament: (state, action: PayloadAction<{ tournament: ITournament }>) => {
            state.tournament = action.payload.tournament;
        },
        set_tournament_code: (state, action: PayloadAction<{ code: string }>) => {
            state.tournament!.code = action.payload.code;
        },
        update_state: (state, action: PayloadAction<{ state: string }>) => {
            state.state = action.payload.state;
        },
    },
});

export const { update_tournament, set_tournament_code, update_state } = tournamentSlice.actions;

export default tournamentSlice.reducer;