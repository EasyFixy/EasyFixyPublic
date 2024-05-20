import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isLogged: boolean;
    token: string;
    id: number| null;
    date: number | null;
  }
  
  const initialState: AuthState = {
    isLogged: false,
    token: "",
    id: null,
    date: null
  }
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; id: number; date: number }>) => {
            state.isLogged = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.date = action.payload.date;
        },
        logout: (state) => {
            state.isLogged = false;
            state.token = '';
            state.id = null;
            state.date = null;
        },
    },
})
// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer;