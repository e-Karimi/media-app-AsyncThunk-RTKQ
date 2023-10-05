import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";


const fetchAlbums = createAsyncThunk('albums/fetch',
    async (userId) => {
        const response = await apiRequest.get(`/albums`, { params: { userId:userId } })      
    
        //DEV ONLY!!
        await pause(1000)

        return response.data  //[{}]
    }
)

//DEV ONLY!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

export { fetchAlbums }