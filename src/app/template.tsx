'use client'

import { useEffect, useState, useCallback } from "react"
import { useAppDispatch } from "@/redux/store"
import { checkUserAuth } from "@/redux/userDataSlice"
import { usePathname } from "next/navigation"
import { useAppSelector } from "@/redux/store"
import { useRouter } from "next/navigation"
import { redirect } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {

  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const user = useAppSelector((store) => store.userData.user)
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  // внедрен самостоятельный расчет vh на основе window.innerHeight из-за его неправильного отображения в мобильных браузерах
  useEffect(
    () => {
      let root =  document.documentElement
      if(root) {
      root.style.setProperty('--main-height-overxl', `${window.innerHeight - 102}px`);
      root.style.setProperty('--main-height-beforexl', `${window.innerHeight - 64}px`);
      }
    },
    []
  )
  
  useEffect(
    () => {
      
      const handleResize = () => {
        let root =  document.documentElement
        if(root) {
        root.style.setProperty('--main-height-overxl', `${window.innerHeight - 102}px`);
        root.style.setProperty('--main-height-beforexl', `${window.innerHeight - 64}px`);
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }

    },
    []
  )
  
  useEffect(() => {
    dispatch({type: 'FETCH_INGREDIENCES'})
  }, [])

  useEffect(() => {dispatch(checkUserAuth())},[])

  useEffect(
    () => {
      if(!/^\/feed/.test(pathname)) {
          dispatch({type: 'FEED_WS_CONNECTION_STOP'})
        }
    },
    []
  )

  useEffect(
    () => {
      if(!/^\/profile\/orders/.test(pathname)) {
          dispatch({type: 'PROFILE_ORDERS_WS_CONNECTION_STOP'})
        }
    },
    []
  )

  return <div> {children} </div>
}