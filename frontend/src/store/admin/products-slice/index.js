import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    productList: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalProducts: 0
}

export const addNewProduct = createAsyncThunk(
    "/product/addNewProduct",
    async(formData) => {
        const result = await axios.post('http://localhost:5000/api/admin/products/add',
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

export const fetchAllProducts = createAsyncThunk(
    "/products/fetchAllProducts",
    async ({page = 1, limit = 5}) => {
        const result = await axios.get(
            `http://localhost:5000/api/admin/products/get?page=${page}&limit=${limit}`
        );
        return result?.data;
    }
)

export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async({id, formData}) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/products/edit/${id}`,
            formData,{
                headers:{
                    "Content-Type": "application/json",
                }
            }
        );
        return result?.data;
    }
)

export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(
            `http://localhost:5000/api/admin/products/delete/${id}`
        );
        return result?.data;
    }
)

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state,action) => {
                state.isLoading = false;
                state.productList = action.payload.data;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.pageSize = action.payload.pagination.pageSize;
                state.totalProducts = action.payload.pagination.totalProducts;
            })
            .addCase(fetchAllProducts.rejected, (state,action) => {
                state.isLoading = false;
                state.productList = []
            })
    }
})

export default AdminProductsSlice.reducer