import { useState, useCallback  } from "react"
import { useDispatch } from 'react-redux'

export default function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setIsError] = useState(null)
    const dispatch = useDispatch()

   
    const runThunk = useCallback((arg) => {

        setIsLoading(true)

        dispatch(thunk(arg))
            .unwrap()
            .catch((err) => setIsError(err))
            .finally(() => setIsLoading(false))

    }, [thunk, dispatch])


    return [runThunk, isLoading, error]
}
