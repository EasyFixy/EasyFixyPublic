import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../features/Auth/Auth'
import { jobsSlice } from '../features/Jobs/Jobs'

export const store = configureStore({
  reducer: {
    Auth: authSlice.reducer,
    Jobs: jobsSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch