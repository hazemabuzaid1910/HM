import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const HotelPage = createAsyncThunk(
    'hotel/HotelPage',
    async() => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/photos");

            const limitedData = response.data.slice(0, 20);
            return limitedData;


        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

    }
);

const HotelSlice = createSlice({
    name: "hotel",
    initialState: {
        data: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(HotelPage.pending, (state) => {
                state.loading = true;
            })
            .addCase(HotelPage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Set the fetched data
            })
            .addCase(HotelPage.rejected, (state) => {
                state.loading = false;
                state.error = "Error fetching data";
            });
    },
});

export const { selectAll: selectAllPosts } = HotelSlice.caseReducers;

export default HotelSlice.reducer;