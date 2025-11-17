import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import uiSlice from "./ui.slice";
import realtimeSlice from "./realtime.slice";
import coinsSlice from "./coins/coins.slice";
import coinDetailsSlice from "./coin-details/coin-details.slice";
import favoritesSlice from "./favorites/favorites.slice";
import portfolioSlice from "./portfolio/portfolio.slice";
import allCoinsSlice from "./coins/all-coins.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    realtime: realtimeSlice,
    coins: coinsSlice,
    coinDetails: coinDetailsSlice,
    favorites: favoritesSlice,
    portfolio: portfolioSlice,
    allCoins: allCoinsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
