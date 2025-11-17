import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  data: string[];
}

const initialState: FavoriteState = {
  data: [],
};

const slice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<string[]>) {
      state.data = action.payload;
    },
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.data.includes(action.payload)) {
        state.data.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.data = state.data.filter((c) => c !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = slice.actions;
export default slice.reducer;
