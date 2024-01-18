import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["search/setCheckIn", "search/setCheckOut"],
        ignoredPaths: ["search.checkIn", "search.checkOut", "payload"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
