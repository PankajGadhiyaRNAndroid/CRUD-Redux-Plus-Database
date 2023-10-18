import { configureStore } from "@reduxjs/toolkit";

import FriendReducer from "./slices/FriendSlice";
import CreateFriendSlice from "./slices/CreateFriendSlice";

export const store = configureStore({
    reducer: {
        friends: FriendReducer,
        createfriend: CreateFriendSlice
    }
})