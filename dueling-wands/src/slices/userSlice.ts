/**
 * @author Thibault Berthet
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from "../types/IUser";

interface UserState {
    user: IUser | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        update_user: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
        },
        logout_user: (state) => {
            state.user = null;
        },
    },
});

export const { update_user, logout_user } = userSlice.actions;

export default userSlice.reducer;