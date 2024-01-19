'use client'

import { useEffect } from "react"
import { useAppDispatch } from "@/redux/store"

export default function Feed() {

  const dispatch = useAppDispatch()

  useEffect(
    () => { 
      dispatch({type: 'FEED_WS_CONNECTION_START', payload: 'wss://norma.nomoreparties.space/orders/all'})
    },
    [dispatch]
  )

  return (
    <h1>
      123
    </h1>
  )
}

