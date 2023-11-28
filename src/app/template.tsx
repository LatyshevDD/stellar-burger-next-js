'use client'

import { useEffect } from "react"
import { useAppDispatch } from "@/redux/store"
import { getIngredience } from "@/utils/api"
import { setIngrediences, setError } from "@/redux/ingrediencesDataSlice"
import { checkUserAuth } from "@/redux/userDataSlice"

export default function Template({ children }: { children: React.ReactNode }) {

  const dispatch = useAppDispatch()

  useEffect(() => {
    getIngredience()
      .then(res => dispatch(setIngrediences([...res.data])))
      .catch(e => dispatch(setError({hasError: true, errorMessage: e})))
  }, [])

  useEffect(() => dispatch(checkUserAuth()), [])

  return <>{children}</>
}