import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    featureImageList: [],
    error: null
}

export const getFeatureImages = createAsyncThunk(
    "/feature/getFeatureImages",
    async () => {
        const response = await axios.get(
            `http://localhost:5000/api/common/feature/get`
        )
        return response.data;
    }
)

export const deleteFeatureImages = createAsyncThunk(
    "/feature/deleteFeatureImage",
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/common/feature/delete/${id}`
        )
        return result?.data;
    }
)

export const addFeatureImages = createAsyncThunk(
    "/feature/addFeatureImage",
    async (image) => {
        const response = await axios.post(
            `http://localhost:5000/api/common/feature/add`,
            {image}
        )
        return response.data;
    }
)

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImages.rejected, (state,action) => {
                state.isLoading = false,
                state.featureImageList = [],
                state.error = action.error.message
            })
    }
})

export default commonSlice.reducer;