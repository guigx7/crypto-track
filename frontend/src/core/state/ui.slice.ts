import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
}

const initialState: UIState = {
  theme: "light"
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});

export const { toggleTheme } = slice.actions;
export default slice.reducer;
