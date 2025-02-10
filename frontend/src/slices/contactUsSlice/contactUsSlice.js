import axiosInstance from "../../store/axiosConfig";
import { STATUSES } from "../../store/statuses";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const contactUsSlice = createSlice({
    name: "contactUs",
    initialState: {
        data: [],
        status: STATUSES.IDLE,
        error: null
    },
    reducers: {
        resetError: (state, action) => {
            state.error = null;
            state.status = STATUSES.IDLE
        },
        resetIsMessageSend: (state, action) => {
            state.isMessageSend = null;
        },
        resetIsMessageDeleted: (state, action) => {
            state.isMessageDeleted = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload.data;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(createMessage.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isMessageSend = true;
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
            .addCase(deleteMessageById.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(deleteMessageById.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.isMessageDeleted = true;
            })
            .addCase(deleteMessageById.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.error = action.error.message;
            })
    }
})
export const createMessage = createAsyncThunk('contactUs/createmessaage', async ({ message }) => {
    try {
        await axiosInstance.post("/api/v1/contactus", { message });
    } catch (error) {
        throw error.response.data;
    }
});
export const getAllMessages = createAsyncThunk('contactUs/getAllMessages', async () => {
    try {
        const response = await axiosInstance.get("/api/v1/admin/messages");
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const deleteMessageById = createAsyncThunk('contactUs/deleteMessageById', async ({ messageId }) => {
    try {
        await axiosInstance.delete(`/api/v1/admin/message/${messageId}`);
    } catch (error) {
        throw error.response.data;
    }
});

export default contactUsSlice.reducer;
export const { resetError, resetIsMessageSend, resetIsMessageDeleted } = contactUsSlice.actions;