import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import uiSlice from "./ui.slice";
import realtimeSlice from "./realtime.slice";
import coinsSlice from "./coins/coins.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    realtime: realtimeSlice,
    coins: coinsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
