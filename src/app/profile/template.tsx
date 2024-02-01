"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/store"
import { redirect } from "next/navigation"
import { usePathname } from "next/navigation"

export default function ProfileTemplate({ children }: { children: React.ReactNode }) {

  const user =  useAppSelector((store) => store.userData.user)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(
    () => {
      setTimeout(
        () => {
          setIsMounted(true)
        },
        1000
      )
    },
    []
  )
  
  if(isMounted && !user) {
    return redirect(`/login?from=${pathname}`)
  }

  return isMounted ? <> {children} </> : null
}