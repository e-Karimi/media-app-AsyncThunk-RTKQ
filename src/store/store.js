import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from './slices/usersSlice'
import { albumReducer } from "./slices/albumsSlice";
import { photoReducer } from "./slices/photoSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        albums:albumReducer,
        photos:photoReducer

    }
})

export default store
export * from './thunks/user/fetchUsers'
export * from './thunks/user/addUser'
export * from './thunks/user/deleteUser'
export * from './thunks/album/fetchAlbums'
export * from './thunks/album/deleteAlbum'
export * from './thunks/album/addAlbum'
export * from './thunks/photo/fetchPhotos'
export * from './thunks/photo/addPhoto'
export * from './thunks/photo/deletePhoto'