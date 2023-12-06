import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SettingsState = {
  navCollapsed: boolean;
};

const initialState = {
  navCollapsed: false,
} as SettingsState;

export const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: () => initialState,
    toggleCollapsedSideNav: (state, action: PayloadAction<boolean>) => {
      state.navCollapsed = action.payload;
    },
  },
});

export const { toggleCollapsedSideNav, reset } = settings.actions;
export default settings.reducer;
