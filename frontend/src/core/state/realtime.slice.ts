import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RealtimeState {
  alerts: { coinId: string; timestamp: number }[];
}

const initialState: RealtimeState = {
  alerts: []
};

const slice = createSlice({
  name: "realtime",
  initialState,
  reducers: {
    pushAlert(state, action: PayloadAction<{ coinId: string; timestamp: number }>) {
      state.alerts.push(action.payload);
    }
  }
});

export const { pushAlert } = slice.actions;
export default slice.reducer;
