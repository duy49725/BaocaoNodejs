import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    categoryList: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCategories: 0,
}

export const addNewCategory = createAsyncThunk(
    "/category/addNewCategory",
    async(formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/category/add',
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

export const fetchAllCategory = createAsyncThunk(
    "/category/fetchAllCategory",
    async ({ page = 1, limit = 5 }) => {
        const result = await axios.get(
            `http://localhost:5000/api/admin/category/get?page=${page}&limit=${limit}`
        );
        return result?.data;
    }
);

export const editCategory = createAsyncThunk(
    "/category/editCategory",
    async({id, formData}) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/category/edit/${id}`,
            formData,{
                headers:{
                    "Content-Type": "application/json",
                }
            }
        );
        return result?.data;
    }
)

export const deleteCategory = createAsyncThunk(
    "/category/deleteCategory",
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/admin/category/delete/${id}`
        );
        return result?.data;
    }
)

const AdminCategorySlice = createSlice({
    name: "adminCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categoryList = action.payload.data;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.pageSize = action.payload.pagination.pageSize;
                state.totalCategories = action.payload.pagination.totalCategories;
            })
            .addCase(fetchAllCategory.rejected, (state) => {
                state.isLoading = false;
                state.categoryList = [];
            });
    },
});

export default AdminCategorySlice.reducer