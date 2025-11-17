import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import uiSlice from "./ui.slice";
import realtimeSlice from "./realtime.slice";
import coinsSlice from "./coins/coins.slice";
import coinDetailsSlice from "./coin-details/coin-details.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    realtime: realtimeSlice,
    coins: coinsSlice,
    coinDetails: coinDetailsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
