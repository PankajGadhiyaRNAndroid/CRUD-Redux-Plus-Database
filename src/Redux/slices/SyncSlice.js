import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action to fetch Friendlists 
export const syncFriends = createAsyncThunk("syncFriends", async (data, { rejectWithValue }) => {
    try {
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
        if (response.status == 200) {
            const result = await response.json();
            return result;
        } else {
            return rejectWithValue(response.status);
        }
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const syncError = createAsyncThunk("syncError", async () => {
    return false;
});

const SyncSlice = createSlice({
    name: 'sync',
    initialState: {
        syncLoader: false,
        syncData: null,
        syncError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(syncFriends.pending, (state, action) => {
            state.syncLoader = true;
            state.syncError = false;
        });
        builder.addCase(syncFriends.fulfilled, (state, action) => {
            state.syncLoader = false;
            state.syncData = action.payload;
            state.syncError = false;
        });
        builder.addCase(syncFriends.rejected, (state, action) => {
            state.syncLoader = false;
            state.syncError = true;
        });
        builder.addCase(syncError.fulfilled, (state, action) => {
            state.syncError = action.payload;
        });
    }
})

export default SyncSlice.reducer;