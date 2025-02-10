import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../store/axiosConfig";
import { STATUSES } from "../../store/statuses";

const initialState = {
  user: { role: "user" },
  isAuthenticated: false,
  status: STATUSES.IDLE,
  error: null,
};

const setLoadingState = (state) => {
  state.status = STATUSES.LOADING;
};

const handleAuthFulfilled = (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  state.status = STATUSES.IDLE;
};

export const registerUser = createAsyncThunk("user/register", async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/register", userData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});
export const verifyUser = createAsyncThunk("user/verify", async ({ token }) => {
  try {
    const response = await axiosInstance.get(`/api/v1/verify/${token}`);

    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  try {
    const response = await axiosInstance.post("/api/v1/login", userData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axiosInstance.get("/api/v1/logout");
});

export const loadUser = createAsyncThunk("user/load", async () => {
  try {
    const response = await axiosInstance.get("/api/v1/me");
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});
export const updateUserProfile = createAsyncThunk("user/updateuserprofile", async (userData) => {
  const response = await axiosInstance.put("/api/v1/me/update", userData);
  return response.data.user;
});
export const updatepassword = createAsyncThunk('user/updatepassword', async (passwordData) => {
  try {
    const response = await axiosInstance.put("/api/v1/password/update", passwordData);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
});
export const forgotPassword = createAsyncThunk("user/forgetpassword", async ({ email }) => {
  try {
    await axiosInstance.post("/api/v1/password/forgot", { email });
  } catch (error) {
    throw error.response.data;
  }
})
export const resetPassword = createAsyncThunk("user/resetpassword", async ({ token, passwordData }) => {
  await axiosInstance.put(`/api/v1/password/reset/${token}`, passwordData);
})
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state, action) => {
      state.error = null;
      state.status = STATUSES.IDLE
    },
    resetIsProfileUpdated: (state, action) => {
      state.isProfileUpdated = null;
    },
    resetIspasswordUpdated: (state, action) => {
      state.isPasswordUpdated = null;
    },
    resetIsEmailSend: (state, action) => {
      state.isEmailSend = null;
    },
    resetIsVerified: (state, action) => {
      state.isVerified = null;
    },
    resetIsLogin: (state, action) => {
      state.isLogin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, setLoadingState)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isEmailSend = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUSES.ERROR
      })
      .addCase(verifyUser.pending, setLoadingState)
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isVerified = true;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.error = action.error;
        state.status = STATUSES.ERROR;
      })
      .addCase(forgotPassword.pending, setLoadingState)
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isEmailSend = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        console.log(action.error);
        state.error = action.error;
        state.status = STATUSES.ERROR;
      })
      .addCase(updatepassword.pending, setLoadingState)
      .addCase(updatepassword.fulfilled, (state, action) => {
        state.isPasswordUpdated = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(updatepassword.rejected, (state, action) => {
        state.error = action.error;
        state.status = STATUSES.ERROR;
      })
      .addCase(loginUser.pending, setLoadingState)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLogin = true;
        state.status = STATUSES.IDLE;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = STATUSES.ERROR
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
      .addCase(loadUser.fulfilled, handleAuthFulfilled)
      .addCase(updateUserProfile.pending, setLoadingState)
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
        state.isProfileUpdated = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { role: "user" };
        state.isAuthenticated = false;
        state.status = STATUSES.IDLE;
      });

  },
});

export default userSlice.reducer;
export const {
  resetIsProfileUpdated,
  resetIspasswordUpdated,
  resetError,
  resetIsEmailSend,
  resetIsVerified,
  resetIsLogin
} = userSlice.actions;
