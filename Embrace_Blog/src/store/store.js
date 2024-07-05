import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import darkModeSlice from "./darkModeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    DarkMode: darkModeSlice,
    //TODO: add more slices here for posts
  },
});

export default store;
