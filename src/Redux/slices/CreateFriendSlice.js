import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action to fetch Friendlists 
export const createFriend = createAsyncThunk("submitNewFriend", async (data, { rejectWithValue }) => {
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
        console.log('Response :----> ', response.status);
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

export const createFriendError = createAsyncThunk("createError", async () => {
    return false;
});

const CreateFriendSlice = createSlice({
    name: 'createfriend',
    initialState: {
        isUserLoader: false,
        addedFriend: null,
        isUSerError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(createFriend.pending, (state, action) => {
            state.isUserLoader = true;
            state.isUSerError = false;
        });
        builder.addCase(createFriend.fulfilled, (state, action) => {
            state.isUserLoader = false;
            state.addedFriend = action.payload;
            state.isUSerError = false;
        });
        builder.addCase(createFriend.rejected, (state, action) => {
            console.log('REDUCERS ERROR :----> ', action.payload);
            state.isUserLoader = false;
            state.isUSerError = true;
        });

        builder.addCase(createFriendError.fulfilled, (state, action) => {
            console.log('This is action pay load :---> ',action.payload);
            state.isUSerError = action.payload;
        });
    }
})

export default CreateFriendSlice.reducer;