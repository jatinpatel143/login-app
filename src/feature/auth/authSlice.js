import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService, { register } from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: userExist ? userExist : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true
            }).addCase(userRegister.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            }).addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.user = null
                state.message = action.payload
            }).addCase(userlogin.pending, (state) => {
                state.isLoading = true
            }).addCase(userlogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.user = action.payload
            }).addCase(userlogin.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.user = null
                state.message = action.payload
            }).addCase(logOut.fulfilled, (state) => {
                state.user = null
                state.isSuccess = false
                state.isError = false
                state.isLoading = false
                state.message = ""
            })
    },
})

export default authSlice.reducer;

// Register 
export const userRegister = createAsyncThunk("REGISTER/USER", async (formData, thunkAPI) => {
    try {
        return await authService.register(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logOut = createAsyncThunk("LOGOUT/USER", async () => {
    localStorage.removeItem("user");
})

export const userlogin = createAsyncThunk("LOGIN/USER", async (formData, thunkAPI) => {
    try {
        return await authService.log
        in(formData)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})