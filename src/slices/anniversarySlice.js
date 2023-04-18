import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    anniversarylist:[]
}

const anniversarySlice = createSlice({
    name: "anniversarypost",
    initialState,
    reducers:{
        addAnniversarypost:(state, action)=>{
            const id =Number((Math.random()*100).toFixed(2));
            let anniversary ={...action.payload, id};
            state.joblist.push(anniversary)
        },
        updateAnniversaryPost:(state, action)=>{
            state.anniversarylist = action.payload;
        },
        deleteAnniversaryPost:(state, action)=>{
            state.anniversarylist = state.anniversarylist.filter(
                (anniversary)=> anniversary.id !== action.payload.id
            )
        }
    }
});

export const {addAnniversarypost, updateAnniversaryPost, deleteAnniversaryPost} =anniversarySlice.actions;
export default anniversarySlice.reducer