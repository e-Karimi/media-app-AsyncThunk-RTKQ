/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from './../thunks/user/fetchUsers'
import { addUser } from '../thunks/user/addUser'
import { deleteUser } from './../thunks/user/deleteUser'


const slice = createSlice({
    name: 'users',
    initialState: [],
    extraReducers: (builder) => {
        //* Fetch Users
        builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
        //* addUser
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        //*Delete User
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const newState = state.filter(user => user.id !== action.payload)
            return newState
        })
    }
})


export const usersReducer = slice.reducer


