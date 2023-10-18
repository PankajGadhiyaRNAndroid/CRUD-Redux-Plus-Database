import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action to fetch Friendlists 
export const createFriend = createAsyncThunk("submitNewFriend", async (data) => {
    const response = await fetch('https://rnapp-mock-developer-edition.ap24.force.com/services/apexrest/apiservice', {
        method: "POST",
        mode: "cors",
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(data),
    });
    const result = await response.json();
    return result
});

const CreateFriendSlice = createSlice({
    name: 'friends',
    initialState: {
        isUserLoader: false,
        addedFriend: null,
        isUSerError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(createFriend.pending, (state, action) => {
            state.isUserLoader = true;
        })
        builder.addCase(createFriend.fulfilled, (state, action) => {
            state.isUserLoader = false;
            state.addedFriend = action.payload;
        })
        builder.addCase(createFriend.rejected, (state, action) => {
            state.isUserLoader = false;
            state.isUSerError = true;
        })
    }
})

export default CreateFriendSlice.reducer;