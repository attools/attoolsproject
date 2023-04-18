import { configureStore } from "@reduxjs/toolkit";
import jobSlice  from '../src/slices/jobslice'
export const store = configureStore({
  reducer: {
    joblist: jobSlice,
  },
});
