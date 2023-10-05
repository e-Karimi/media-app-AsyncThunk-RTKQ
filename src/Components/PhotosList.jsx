/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import PhotoItem from './PhotoItem'
import { BsExclamationCircle } from 'react-icons/bs'
import { MdDone } from 'react-icons/md'
import Button from './Button'
import useThunk from '../Hooks/useThunk'
import { fetchPhotos, addPhoto } from '../store/store'
import Skeleton from './Skeleton'
import { useSelector } from 'react-redux'
import { selectPhotoByAlbumId } from './../store/slices/photoSlice'


export default function PhotosList({ album }) {
    const [dispatchFetchPhotos, isLoading, error] = useThunk(fetchPhotos)
    const [dispatchAddPhoto, addPhotoLoading, errorPhotoLoading] = useThunk(addPhoto)
    const albumId = album.id
    const albumPhotos = useSelector(state => selectPhotoByAlbumId(state, albumId))

    useEffect(() => {
        dispatchFetchPhotos(album.id)
    }, [])

    const addPhotoHandler = () => {
        dispatchAddPhoto(album.id)
    }

    let content;
    if (isLoading) {
        content = <Skeleton items={3} onClassName="h-7 w-full" />
    } else if (error) {
        content = <div>Error Loading!!</div>
    } else {
        content = albumPhotos.map(photo =>
            <PhotoItem key={photo.id} photo={photo} />
        )
    }

    return (
        <div>
            <div className="mb-2">
                <header className="flex items-end justify-between mb-1 max-w-l mx-auto px-1 font-semibold ">
                    <h3 className="text-xs flex items-center">Photos In
                        <span className="ml-1 line-clamp-1 max-w-[100px] lg:max-w-[150px]">
                            {album.name}
                        </span>
                    </h3>
                    <Button loading={addPhotoLoading} disabled={addPhotoLoading} onPhoto
                        onClick={addPhotoHandler}
                        className='w-[85px] text-xs py-1.5 border border-pink-200 rounded bg-pink-100 hover:bg-pink-200 font-semibold'>
                        + Add Photo
                    </Button>
                </header>
                <div className="flex justify-end items-center p-1">
                    {errorPhotoLoading &&
                        <span className='flex items-center text-xs text-orange-500 font-semibold'>
                            <span className='me-1'><BsExclamationCircle /></span>
                            <span>Error Creating Photo!!</span>
                        </span>
                    }
                    {addPhotoLoading &&
                        <span className='flex items-center text-xs text-pink-600 font-semibold'>
                            <span className='me-1'><MdDone /></span>
                            <span> Success Creating Photo</span>
                        </span>
                    }
                </div>
            </div>
            <div className="px-1 flex flex-wrap items-center gap-1">
                {content}
            </div>
        </div>
    )
}
