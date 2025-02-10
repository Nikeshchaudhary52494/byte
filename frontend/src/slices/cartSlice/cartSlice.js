import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../store/statuses";
import axiosInstance from "../../store/axiosConfig";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: {
            products: [],
            totalPrice: 0
        },
        shippingData: null,
        status: STATUSES.IDLE,
    },
    reducers: {
        addShippingData: (state, action) => {
            state.shippingData = { ...action.payload };
        },
        resetIsProductRemovedFromCart: (state, action) => {
            state.isProductRemovedFromCart = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // AddCase for getAllCartProducts
            .addCase(getAllCartProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getAllCartProducts.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data.products = action.payload.cart;
                state.data.totalPrice = action.payload.totalPrice;
            })
            .addCase(getAllCartProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            // AddCase for addToCart
            .addCase(addToCart.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            // AddCase for removeFromCart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isProductRemovedFromCart = true;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(clearCart.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    },
});
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
    try {
        const response = await axiosInstance.post("/api/v1/cart/add", { userId, productId, quantity });
        return response.data.cart;
    } catch (error) {
        throw error.response.data;
    }
});
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userId, productId }) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/cart/remove/${productId}`, { data: { userId, productId } });
        return response.data.cart;
    } catch (error) {
        throw error.response.data;
    }
});
export const getAllCartProducts = createAsyncThunk("cart/getAllCartProducts", async () => {
    try {
        const response = await axiosInstance.get(`/api/v1/cart`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});
export const clearCart = createAsyncThunk("cart/clearcart", async () => {
    try {
        await axiosInstance.delete("/api/v1/cart");
    } catch (error) {
        throw error.response.data;
    }
})
export default cartSlice.reducer;
export const { addShippingData, resetIsProductRemovedFromCart } = cartSlice.actions;