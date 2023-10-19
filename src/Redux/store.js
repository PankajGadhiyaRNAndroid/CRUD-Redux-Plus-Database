import { configureStore } from "@reduxjs/toolkit";

import FriendReducer from "./slices/FriendSlice";
import CreateFriendSlice from "./slices/CreateFriendSlice";
import SyncSlice from "./slices/SyncSlice";

export const store = configureStore({
    reducer: {
        friends: FriendReducer,
        createfriend: CreateFriendSlice,
        synchronise: SyncSlice
    }
})