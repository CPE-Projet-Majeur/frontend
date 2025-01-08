/**
 * @author Thibault Berthet
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
//import gameReducer from './slices/gameStateSlice';


export const store = configureStore({
  reducer: {
    user : userReducer,
    //gameState: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;