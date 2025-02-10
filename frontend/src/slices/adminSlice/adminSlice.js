import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../store/statuses";
import axiosInstance from "../../store/axiosConfig";
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        usersData: [],
        productsData:{
            products:[]
        },
        status: STATUSES.IDLE,
    },
    reducers: {
        resetIsProductAdded: (state, acion) => {
            state.isProductAdded = null;
        },
        resetIsOrderStatusUpdated: (state, action) => {
            state.isOrderStatusUpdated = null;
        },
        resetIsProductUpdated: (state, action) => {
            state.isProductUpdated = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.usersData = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(getAdminProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.productsData = action.payload;
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isProductAdded = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(updateOrderStatus.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isOrderStatusUpdated = true;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(updatedProduct.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updatedProduct.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isProductUpdated = true;
            })
            .addCase(updatedProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
    }
})
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
    try {
        const response = await axiosInstance.get('/api/v1/admin/getAllUser');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})
export const getAdminProducts = createAsyncThunk("admin/products", async () => {
    try {
        const response = await axiosInstance.get('/api/v1/admin/products');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
})
export const updateUserRole = createAsyncThunk('admin/updateuserrole', async ({ userId, role }) => {
    try {
        await axiosInstance.put(`/api/v1/admin/updateuserrole/${userId}`, { role });
    } catch (error) {
        throw error.response.data;
    }
});
export const createProduct = createAsyncThunk('admin/createproducts', async (productData) => {
    try {
        await axiosInstance.post('/api/v1/admin/product/new', productData);
    } catch (error) {
        throw error.response.data;
    }
});
export const updatedProduct = createAsyncThunk('admin/updateproduct', async ({ _id, productData }) => {
    try {
        await axiosInstance.put(`/api/v1/admin/product/${_id}`, productData);
    } catch (error) {
        throw error.response.data;
    }
})
export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ id, selectedOrderStatus }) => {
        try {
            const response = await axiosInstance.put(`/api/v1/admin/order/${id}`, { selectedOrderStatus });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    });
export default adminSlice.reducer;
export const { resetIsProductAdded, resetIsOrderStatusUpdated, resetIsProductUpdated } = adminSlice.actions;