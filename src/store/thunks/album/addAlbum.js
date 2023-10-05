import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";
import { faker } from '@faker-js/faker'

const addAlbum = createAsyncThunk('albums/add',
    async (userId) => {
        const response = await apiRequest.post('/albums', { name: faker.music.songName(), userId })

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

export { addAlbum }