import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    jobList : [],
}

const jobSlice = createSlice({
  name: "jobpost",
  initialState,
  reducers: {
    addJobpost: (state, action) => {
      const id = Number((Math.random() * 100).toFixed(2));
      let job = { ...action.payload, id };
      state.jobList.push(job);
    },
    updateJobPost: (state, action) => {
      state.jobList = action.payload;
    },
    deleteJobPost: (state, action) => {
      state.jobList = state.jobList.filter(
        (job) => job.id !== action.payload.id
      );
    },
  },
});

export const {addJobpost,updateJobPost,deleteJobPost} =  jobSlice.actions;
export default jobSlice.reducer;