import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null
    },
    reducers: {
        setCurrentUsers: (state, action) =>{
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUsers } = usersSlice.actions;
export default usersSlice.reducer;


