import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '@/utils/api';

export const addProduct = createAsyncThunk<any, { productData: any }>(
    'products/addProduct',
    async ({ productData }) => {
        const response = await fetchApi('products/add', 'POST', productData);
        if (response.status !== 200) {
            throw new Error('Failed to add product');
        }
        return response;
    }
);

interface ProductState {
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    loading: false,
    error: null,
};

const postDataProductSlice = createSlice({
    name: 'postDataProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default postDataProductSlice.reducer;