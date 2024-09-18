import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/constants/type/product';

interface ProductsState {
    products: Product[];
    filteredProducts: Product[];
    categories: string[];
}

const initialState: ProductsState = {
    products: [],
    filteredProducts: [],
    categories: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.filteredProducts = action.payload;
        },
        setFilteredProducts(state, action: PayloadAction<Product[]>) {
            state.filteredProducts = action.payload;
        },
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload;
        },
    },
});

export const { setProducts, setFilteredProducts, setCategories } = productsSlice.actions;
export default productsSlice.reducer;
