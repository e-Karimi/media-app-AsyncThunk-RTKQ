import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchAlbums, addAlbum, deleteAlbum } from './../store'

const slice = createSlice({
    name: 'albums',
    initialState: [],
    extraReducers: (builder) => {
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            return [...action.payload]
        }),
            builder.addCase(addAlbum.fulfilled, (state, action) => {
                state.push(action.payload)
            }),
            builder.addCase(deleteAlbum.fulfilled, (state, action) => {
                const newState = state.filter(album => album.id !== action.payload)
                return newState
            })
    }
})

export const albumReducer = slice.reducer


//* Memoize with createSelectore

const selectAlbums = state => state.albums
const selectUserId = (state, userId) => userId

export const selectAlbumsByUserId = createSelector(
    [selectAlbums, selectUserId],
    (albums, userId) => {
        const userAlbums = albums.filter(album => album.userId === userId)
        return userAlbums
    }
)