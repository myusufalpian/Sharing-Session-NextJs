import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import postDataProductReducer from './postDataProductSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        postProduct: postDataProductReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;