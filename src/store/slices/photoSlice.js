import { createSlice, createSelector } from '@reduxjs/toolkit'
import { fetchPhotos, addPhoto, deletePhoto } from './../store'

const slice = createSlice({
    name: 'photos',
    initialState: [],
    extraReducers: (builder) => {
        //* Fetch Photos
        builder.addCase(fetchPhotos.fulfilled, (state, action) => {
            return [...action.payload]
        })
        //* Add Photos
        builder.addCase(addPhoto.fulfilled, (state, action) => {
            state.push(action.payload)
        })
        //* Delete Photos
        builder.addCase(deletePhoto.fulfilled, (state, action) => {
            let newState = state.filter(photo => photo.id !== action.payload)
            return newState
        })
    }
})

export const photoReducer = slice.reducer


//*Memoize with createSelector

const selectPhotos = state => state.photos
const selectAlbumId = (state, albumId) => albumId

export const selectPhotoByAlbumId = createSelector(
    [selectPhotos, selectAlbumId],
    (photos, albumId) => {
        const albumPhotos = photos.filter(photo => photo.albumId === albumId)
        return albumPhotos
    }
)