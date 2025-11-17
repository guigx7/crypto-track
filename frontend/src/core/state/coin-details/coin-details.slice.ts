import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CoinDetailsData {
  name: string;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
  };
}

interface CoinDetailsState {
  data: CoinDetailsData | null;
  history: number[][];
  loading: boolean;
}

const initialState: CoinDetailsState = {
  data: null,
  history: [],
  loading: false,
};

const slice = createSlice({
  name: "coinDetails",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDetails(state, action: PayloadAction<CoinDetailsData>) {
      state.data = action.payload;
    },
    setHistory(state, action: PayloadAction<number[][]>) {
      state.history = action.payload;
    },
    clearDetails(state) {
      state.data = null;
      state.history = [];
      state.loading = false;
    },
  },
});

export const { setLoading, setDetails, setHistory, clearDetails } = slice.actions;
export default slice.reducer;
