import { configureStore } from "@reduxjs/toolkit";
import modals from "../redux/modals";

export const store = configureStore({
  reducer: {
    modals,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
