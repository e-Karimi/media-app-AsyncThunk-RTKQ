import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";


const deleteAlbum = createAsyncThunk('albums/delete',
    async (albumId) => {
        await apiRequest.delete(`/albums/${albumId}`)

         //DEV ONLY!!
         await pause(1000)

        return albumId
    }
)



//DEV ONLY!!
const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration)
    })
}

export { deleteAlbum }