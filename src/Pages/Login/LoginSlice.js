import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async({ email, password }, thunkAPI) => {
        const body = JSON.stringify({
            email,
            password,
        });

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/auth/login/web/",
                body, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );

            const data = res.data;

            if (res.status === 200) {
                localStorage.setItem('token', res.data.access);

                console.log(res.data.access);
                return data;
            } else {
                throw new Error('Login failed');
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || 'An unknown error occurred');
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        token: "" // Add a user field to store user data or token
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user data or token
            state.isAuthenticated = true; // Mark the user as authenticated
        },
        AddToken: (state) => {
            state.token = localStorage;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload: { user, token } }) => {
                state.token = token,
                    state.user = user
                localStorage.getItem("token", JSON.stringify(token))
                localStorage.getItem("user", JSON.stringify(user))
                state.loading = false;
                state.isAuthenticated = true; // Mark the user as authenticated
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false; // Reset authentication status on failure
            });
    },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;