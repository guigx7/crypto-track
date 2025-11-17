import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import uiSlice from "./ui.slice";
import realtimeSlice from "./realtime.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    realtime: realtimeSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
