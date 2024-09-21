import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    image: string;
    phone: string;
    birthDate: string;
    maidenName: string;
    bloodGroup: string;
    weight: number;
    height: number;
    eyeColor: string;
}

interface AuthState {
    auth: string | null;
    user: User | null;
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
        setUser: (state, action: PayloadAction<User>) => {
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