'use client'

import { useEffect, useState } from "react"
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

  useEffect(() => {
    dispatch({type: 'FETCH_INGREDIENCES'})
  }, [])

  useEffect(() => dispatch(checkUserAuth()), [])

  //Protectet pages

  //Страницы доступ к которым ограничен для зарегистрированных пользователей
  
  // useEffect(
  //   () => {
  //     if(pathname === '/register' && user) {
  //       redirect('/')
  //     } else {
  //       setIsAuthChecked(true)
  //     }
  //   },
  //   [user, pathname]
  // )

  // if(isAuthChecked) {
  //     return <> {children} </>
  // }

  return <> {children} </>

}