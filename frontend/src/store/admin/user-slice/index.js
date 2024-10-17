import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalUser: 0,
    loading: false,
    error: null,
}

export const fetchUsers = createAsyncThunk(
    '/users/fetchAll',
    async ({page=1, limit=5}) => {
        const response = await axios.get(`http://localhost:5000/api/admin/user/get?page=${page}&limit=${limit}`);
        return response.data;
    }
)

export const createUser = createAsyncThunk(
    '/users/create',
    async (userData) => {
        const response = await axios.post('http://localhost:5000/api/admin/user/create', userData);
        return response.data;
    }
)

export const deleteUser = createAsyncThunk(
    '/users/delete',
    async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/admin/user/delete/${id}`);
        return response.data;
    }
)

export const updateUserActiveStatus = createAsyncThunk(
    '/users/updateActiveStatus',
    async ({ id, isActive }) => {
        console.log(isActive, id, 'rhunh')
        const response = await axios.patch(`http://localhost:5000/api/admin/user/active/${id}`, { isActive });
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.currentPage = action.payload.pagination.currentPage;
                state.totalPages = action.payload.pagination.totalPages;
                state.pageSize = action.payload.pagination.pageSize;
                state.totalUser = action.payload.pagination.totalPages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload._id);
            })
            .addCase(updateUserActiveStatus.fulfilled, (state, action) => {
                const updatedUser = action.payload.data;  // Giả sử API trả về đối tượng người dùng trong `data`
                const index = state.users.findIndex(user => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index].isActive = updatedUser.isActive;
                }
            });
    }
})

export default userSlice.reducer;