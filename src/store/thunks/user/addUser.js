import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Axios/config";
import { faker } from '@faker-js/faker'

const addUser = createAsyncThunk('users/add',
    async () => {
        const response = await apiRequest.post('/users', { name: faker.person.fullName() })

        //DEV ONLY !!!!
        await pause(1000)

        return response.data
    }
)

 //DEV ONLY !!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })

}


export { addUser }