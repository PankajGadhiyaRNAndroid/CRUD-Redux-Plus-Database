import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action to fetch Friendlists 
export const fetchFriends = createAsyncThunk("fetchFriendList", async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const result = await res.json();
    return result;
});

export const clearFriends = createAsyncThunk("ClearFriend", async () => {
    const blankArray = [];
    return blankArray;
})

const FriendSlice = createSlice({
    name: 'friends',
    initialState: {
        isLoader: false,
        friendData: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFriends.pending, (state, action) => {
            state.isLoader = true;
        })
        builder.addCase(fetchFriends.fulfilled, (state, action) => {
            state.isLoader = false;
            state.friendData = action.payload;
        })
        builder.addCase(fetchFriends.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
        })
    },
})

export default FriendSlice.reducer;