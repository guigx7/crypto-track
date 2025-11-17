import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface CoinsState {
  data: Coin[];
  loading: boolean;
}

const initialState: CoinsState = {
  data: [],
  loading: false,
};

const slice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setCoins } = slice.actions;
export default slice.reducer;
