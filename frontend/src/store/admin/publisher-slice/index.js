import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    publisherList: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalPublishers: 0
}

export const addNewPublisher = createAsyncThunk(
    '/publiser/addNewPublisher',
    async(formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/publisher/add',
            formData,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }
        )
        return result?.data;
    }
)

export const fetchAllPublisher = createAsyncThunk(
    '/publisher/fetchAllPublisher',
    async ({page = 1, limit = 5}) => {
        const result = await axios.get(
            `http://localhost:5000/api/admin/publisher/get?page=${page}&limit=${limit}`
        )
        return result?.data;
    }
)

export const editPublisher = createAsyncThunk(
    '/publisher/editPublisher',
    async({id, formData}) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/publisher/edit/${id}`,
            formData,{
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )
        return result?.data;
    }
)

export const deletePublisher = createAsyncThunk(
    '/publisher/deletePublisher',
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/admin/publisher/delete/${id}`
        );
        return result?.data;
    }
)

const AdminPublisherSlice = createSlice({
    name: "adminPublisher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPublisher.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllPublisher.fulfilled, (state,action) => {
                state.isLoading = false;
                state.publisherList = action.payload.data;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.pageSize = action.payload.pagination.pageSize;
                state.totalPublishers = action.payload.pagination.totalPublishers;
            })
            .addCase(fetchAllPublisher.rejected, (state) => {
                state.isLoading = false;
                state.publisherList = [];
            })
    }
})

export default AdminPublisherSlice.reducer;