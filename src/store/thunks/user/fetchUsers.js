import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from './../../Axios/config'

const fetchUsers = createAsyncThunk('users/fetch',
    async () => {
        const response = await apiRequest.get('/users')

        //DEV ONLY !!!
        await pause(2000)

        return response.data
    }
)

//DEV ONLY !!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}


export { fetchUsers }