import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";

const addPhoto = createAsyncThunk('photos/add',
    async (albumId) => {
        const response = await apiRequest.post('/photos', { url: 'https://via.placeholder.com/150/f66b97', albumId })

        //DEV ONLY!!
        await pause(1000)

        return response.data
    }
)

//DEV ONLY!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

export { addPhoto }