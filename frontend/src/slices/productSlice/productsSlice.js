import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from '../../store/statuses'
import axiosInstance from "../../store/axiosConfig";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        totalPages: 1,
        currentPage: 1,
        productDetails: {},
        status: STATUSES.IDLE,
        productreviewsData: [],
        error: null,
        filters: {
            keyword: "",
            minPrice: 0,
            maxPrice: 2500,
            ratings: 0,
            itemCondition: "",
            categoryName: "",
        },
    },
    reducers: {
        resetError: (state, action) => {
            state.status = STATUSES.IDLE;
            state.error = null
        },
        resetIsReviewAdded: (state, action) => {
            state.isReviewAdded = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload.products;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.payload;
            })
            .addCase(getProductDetails.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.productDetails = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(updatedProductStock.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updatedProductStock.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
            })
            .addCase(updatedProductStock.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(getProductReviews.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getProductReviews.fulfilled, (state, action) => {
                state.productreviewsData = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(getProductReviews.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(addReview.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isReviewAdded = true;
                state.status = STATUSES.IDLE;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = STATUSES.ERROR;
            })
    },
});
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { filters, currentPage } = getState().products;
            let link = `/api/v1/products?page=${currentPage}&limit=8&keyword=${filters.keyword}&ratings[gte]=${filters.ratings}&price[gte]=${filters.minPrice}&price[lte]=${filters.maxPrice}`;

            if (filters.categoryName) {
                link += `&category=${filters.categoryName}`;
            }

            if (filters.itemCondition) {
                link += `&itemCondition=${filters.itemCondition}`;
            }

            const { data } = await axiosInstance.get(link);
            console.log(link);
            return {
                products: data.products,
                totalPages: Math.ceil(data.filteredProductsCount / 8),
            };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const getProductDetails = createAsyncThunk('productDetails/fetch', async ({ id }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/product/${id}`);
        return response.data.product;
    } catch (error) {
        throw error.response.data;
    }
});
export const updatedProductStock = createAsyncThunk('products/updateproductstock', async ({ quantityShipped, productId }) => {
    await axiosInstance.put(`/api/v1/product/updatestock`, { quantityShipped, productId });
})
export const getProductReviews = createAsyncThunk('products/getProductsreviews', async ({ productId }) => {
    try {
        const response = await axiosInstance.get(`/api/v1/reviews?productId=${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    };
});
export const deleteProductReviews = createAsyncThunk('products/deleteProductReviews', async ({ productId, reviewId }) => {
    try {
        await axiosInstance.delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`);
    } catch (error) {
        throw error.response.data;
    }
});
export const deleteProduct = createAsyncThunk('products/deleteproduct', async ({ productId }) => {
    try {
        await axiosInstance.delete(`/api/v1/admin/product/${productId}`);
    } catch (error) {
        throw error.response.data;
    }
})
export const addReview = createAsyncThunk(
    'products/addReview',
    async ({ rating, comment, productId }) => {
        try {
            await axiosInstance.put('/api/v1/review', {
                rating,
                comment,
                productId,
            });
        } catch (error) {
            throw error.response.data;
        }
    }
);
export const { resetError, resetIsReviewAdded, setCategory, setFilters, setCurrentPage } = productSlice.actions;