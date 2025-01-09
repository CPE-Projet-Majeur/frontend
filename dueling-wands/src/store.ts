/**
 * @author Thibault Berthet
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import tournamentReducer from './slices/tournamentSlice';


export const store = configureStore({
  reducer: {
    user : userReducer,
    tournament : tournamentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;