import { configureStore } from "@reduxjs/toolkit";
import queueSlice from "./queueSlice";

export const store = configureStore({
  reducer: {
    queue: queueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
