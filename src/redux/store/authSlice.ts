import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    auth: string | null;
    user: {
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: string;
        image: string;
    } | null;
}

const initialState: AuthState = {
    auth: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<string>) => {
            state.auth = action.payload;
        },
        setUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.auth = null;
            state.user = null;
        },
    },
});

export const { setAuth, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
