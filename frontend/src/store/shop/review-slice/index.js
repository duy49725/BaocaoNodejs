import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    reviews: [],
    error: null
}

export const addReview = createAsyncThunk(
    "/order/addReview",
    async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/shop/review/add`, formData
            );
            if(!response.data.success){
                return rejectWithValue(response.data.message);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Something went wrong')
        }
    }
)

export const getReviews = createAsyncThunk(
    '/order/getReviews',
    async(id)=>{
        const response = await axios.get(`http://localhost:5000/api/shop/review/${id}`);
        return response.data;
    }
)

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReviews.fulfilled, (state,action) => {
                state.isLoading = false,
                state.reviews = action.payload.data
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.isLoading = false,
                state.reviews = []
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true,
                state.error = null
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.isLoading = false,
                state.reviews = action.payload.data;
            })
            .addCase(addReview.rejected, (state,action) => {
                state.isLoading = false,
                state.error = action.payload
            })
    }
})

export default reviewSlice.reducer;