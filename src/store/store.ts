import { configureStore } from "@reduxjs/toolkit";
import modals from "../redux/modals";
import translateSite from "../redux/translate";

export const store = configureStore({
  reducer: {
    modals,
    translateSite,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
