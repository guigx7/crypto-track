import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CoinListItem {
  id: string;
  symbol: string;
  name: string;
}

interface AllCoinsState {
  data: CoinListItem[];
}

const initialState: AllCoinsState = {
  data: []
};

const slice = createSlice({
  name: "allCoins",
  initialState,
  reducers: {
    setAllCoins(state, action: PayloadAction<CoinListItem[]>) {
      state.data = action.payload;
    }
  }
});

export const { setAllCoins } = slice.actions;
export default slice.reducer;
