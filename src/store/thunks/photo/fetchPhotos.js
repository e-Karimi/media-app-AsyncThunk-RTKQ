import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";

const fetchPhotos = createAsyncThunk('photos/fetch',
    async (albumId) => {
        const response = await apiRequest.get('/photos',{params:{albumId}})

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

export { fetchPhotos }