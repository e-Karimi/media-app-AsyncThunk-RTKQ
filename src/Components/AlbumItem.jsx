/* eslint-disable react/prop-types */
import ExpandablePanel from './ExpandablePanel'
import { GoTrash } from 'react-icons/go'
import Button from './Button'
import { deleteAlbum } from './../store/store'
import useThunk from '../Hooks/useThunk'
import PhotosList from './PhotosList'

export default function AlbumItem({ album, handleToggle, selected, index }) {
    const [dispatchDeleteAlbum, isLoading, error] = useThunk(deleteAlbum)

    const deleteAlbumHandler = (albumId) => {
        dispatchDeleteAlbum(albumId)
    }

    const header = (
        <div className="flex items-center select-none pl-1 ">
            <Button onClick={() => deleteAlbumHandler(album.id)} loading={isLoading} onAlbum
                className='w-6 h-6 flex items-center justify-center border rounded me-2 hover:bg-stone-50  '>
                <GoTrash className='text-[11px] text-purple-700 ' />
            </Button>
            <span className='text-[11px] line-clamp-1 max-w-[100px]'>{album.name}</span>
            {error &&
                <span className='ml-2 text-[9px] text-orange-500 font-semibold '>
                    <span>Error Deleting Album!!</span>
                </span>
            }
        </div>
    )

    return (
        <ExpandablePanel header={header} onAlbum handleToggle={handleToggle} selected={selected} index={index} >
            <PhotosList album={album} />
        </ExpandablePanel>
    )
}
