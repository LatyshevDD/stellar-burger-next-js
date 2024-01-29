"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/store"
import { redirect } from "next/navigation";

export default function ProfileTemplate({ children }: { children: React.ReactNode }) {

  const user = useAppSelector((store) => store.userData.user);
  const [isMounted, setIsMounted] = useState(false)

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
    
    if(!user) {
      return redirect('/login') //настроить params для возврата к нужной странице после входа в систему
    }

    return isMounted ? <> {children} </> : null
}