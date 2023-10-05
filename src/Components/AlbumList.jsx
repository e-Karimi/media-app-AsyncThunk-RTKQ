/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react'
import Button from './Button'
import useThunk from '../Hooks/useThunk';
import { fetchAlbums, addAlbum } from '../store/store';
import Skeleton from './Skeleton'
import { useSelector } from 'react-redux';
import AlbumItem from './AlbumItem'
import { BsExclamationCircle } from 'react-icons/bs'
import { MdDone } from 'react-icons/md'
import { selectAlbumsByUserId } from './../store/slices/albumsSlice'

export default function AlbumList({ user }) {
    const [dispatchFetchAlbums, isLoading, error] = useThunk(fetchAlbums)
    const [dispatchAddAlbums, addAlbumLoading, errorAlbumLoading] = useThunk(addAlbum)
    const userId = user.id
    const userAalbums = useSelector((state) => selectAlbumsByUserId(state, userId))
    const [selected, setSelected] = useState(null)

    const handleToggle = useCallback((index) => {
        if (selected === index) {
            return setSelected(null)
        }
        setSelected(index)

    }, [selected])

    useEffect(() => {
        dispatchFetchAlbums(user.id)
    }, [user.id])

    const addAlbumHandler = () => {
        dispatchAddAlbums(user.id)
    }

    let content;
    if (isLoading) {
        content = <Skeleton times={3} onClassName="h-7 w-full" />
    } else if (error) {
        content = <div>Error Loading!!</div>
    } else {
        content = userAalbums.map((album, index) =>
            <AlbumItem
                key={album.id}
                album={album}
                selected={selected}
                handleToggle={handleToggle}
                index={index}
            />
        )
    }

    return (
        <div>
            <div className="mb-3">
                <header className="flex items-center justify-between mb-2 max-w-l mx-auto px-3.5 font-semibold">
                    <h3 className="text-sm">Albums By
                        <span className="ml-1 ">{user.name}</span>
                    </h3>
                    <Button loading={addAlbumLoading} disabled={addAlbumLoading} onAlbum
                        onClick={addAlbumHandler}
                        className='w-[90px] text-xs py-1.5 border border-purple-300 rounded bg-purple-200 hover:bg-purple-300 font-semibold'>
                        + Add Album
                    </Button>
                </header>
                <div className="flex justify-end pr-6">
                    {errorAlbumLoading &&
                        <div className='flex items-center text-xs text-orange-600 font-semibold'>
                            <div className='me-1'><BsExclamationCircle /></div>
                            <div>Error Creating Album!!</div>
                        </div>
                    }
                    {addAlbumLoading &&
                        <div className='flex items-center text-xs text-purple-800 font-semibold'>
                            <div className='me-1'><MdDone /></div>
                            <div> Success Creating Album</div>
                        </div>
                    }
                </div>
            </div>
            <div className="px-3">
                {content}
            </div>
        </div>
    )
}
