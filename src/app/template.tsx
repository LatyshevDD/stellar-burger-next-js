'use client'

import { useEffect } from "react"
import { useAppDispatch } from "@/redux/store"
import { getIngredience } from "@/utils/api"
import { setIngrediences, setError } from "@/redux/ingrediencesDataSlice"
import { checkUserAuth } from "@/redux/userDataSlice"

export default function Template({ children }: { children: React.ReactNode }) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({type: 'FETCH_INGREDIENCES'})
  }, [])

  useEffect(() => dispatch(checkUserAuth()), [])

  return <>{children}</>
}