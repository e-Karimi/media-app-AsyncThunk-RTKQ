import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from './../../Axios/config'

const deleteUser = createAsyncThunk('users/delete',
  async (id) => {

   await apiRequest.delete(`/users/${id}`)

    //DEV ONLY!!
    await pause(1000)

    return id
  }
)

//DEV ONLY!!
const pause = (duration) => {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export { deleteUser }