import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoading: false,
    orderList: [],
    orderDetails: null
}

export const getAllOrdersForAdmin = createAsyncThunk(
    '/order/getAllOrderForAdmin',
    async () => {
        const response = await axios.get(
            `http://localhost:5000/api/admin/orders/get`
        )
        return response.data;
    }
)

export const getOrderDetailsForAdmin = createAsyncThunk(
    '/order/getOrderDetailsForAdmin',
    async (id) => {
        const response = await axios.get(
                `http://localhost:5000/api/admin/orders/details/${id}`,
        )
        return response.data;
    }
)

export const updateOrderStatus = createAsyncThunk(
    '/order/updateOrderStatus',
    async ({id, orderStatus}) => {
        const response = await axios.put(
            `http://localhost:5000/api/admin/orders/update/${id}`,{orderStatus}
        )
        return response.data;
    } 
)

const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (buider) => {
        buider
            .addCase(getAllOrdersForAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrdersForAdmin.fulfilled, (state, action)=>{
                state.isLoading = false,
                state.orderList = action.payload.data
            })
            .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
                state.isLoading = false,
                state.orderList = []
            })
            .addCase(getOrderDetailsForAdmin.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                state.orderDetails = action.payload.data
            })
            .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
                state.isLoading = false,
                state.orderDetails = null
            })
    }
})
export const {resetOrderDetails} = adminOrderSlice.actions;
export default adminOrderSlice.reducer;