'use client'

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";

export default function onlyUnAuth(Component: () => JSX.Element) {

  return function OnlyUnAuth() {

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
    
    if(user) {
      return redirect('/')
    }

    return isMounted ? <Component /> : null
  }
}
