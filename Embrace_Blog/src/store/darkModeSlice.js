import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkTheme: false,
};

const darkModeSlice = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    changeThemeToDark: (state) => {
      state.isDarkTheme = true;
    },
    changeThemeToLight: (state) => {
      state.isDarkTheme = false;
    },
  },
});

export const { changeThemeToDark, changeThemeToLight } = darkModeSlice.actions;

export default darkModeSlice.reducer;
