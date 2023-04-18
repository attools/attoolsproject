import { configureStore } from "@reduxjs/toolkit";
import jobSlice  from '../src/slices/jobslice'
import anniversarySlice from "./slices/anniversarySlice";
export const store = configureStore({
  reducer: {
    joblist: jobSlice,
    anniversarylist : anniversarySlice
  },
});
