import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PortfolioEntry {
  id: string;
  coinId: string;
  amount: number;
  userId: string;
  createdAt: string;
}

interface PortfolioState {
  data: PortfolioEntry[];
  loading: boolean;
}

const initialState: PortfolioState = {
  data: [],
  loading: false,
};

const slice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPortfolio(state, action: PayloadAction<PortfolioEntry[]>) {
      state.data = action.payload;
    },
    addPortfolioEntry(state, action: PayloadAction<PortfolioEntry>) {
      state.data.push(action.payload);
    },
    updatePortfolioEntry(state, action: PayloadAction<PortfolioEntry>) {
      const index = state.data.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removePortfolioEntry(state, action: PayloadAction<string>) {
      state.data = state.data.filter((e) => e.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setPortfolio,
  addPortfolioEntry,
  updatePortfolioEntry,
  removePortfolioEntry,
} = slice.actions;
export default slice.reducer;
