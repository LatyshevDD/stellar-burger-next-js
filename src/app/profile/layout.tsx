'use client'

import Link from "next/link"
import { useAppDispatch } from "@/redux/store"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/redux/userDataSlice"
import { useCallback, useState } from "react"

export default function ProfileLayout({children}: {children: React.ReactNode}) {

  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const [active, setActive] = useState(false)


  const onLogout = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      setActive(true)
      await dispatch(logout())
      router.replace("/login")
    },
    [dispatch]
  )
  
  return (
    <main className="flex flex-col mt-10 pl-4 lg:flex-row lg:gap-[60px] xl:w-[80%] mx-auto h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)] overflow-hidden">
      <section className="flex flex-col gap-[80px] w-[26%]">
        <nav className="flex flex-col gap-10">
          <Link 
            href="/profile" 
            className={`font-jet text-[24px] font-bold leading-8 ${pathname === "/profile" ? "text-[#F2F2F3]" : "text-[#8585AD]"}`}
          >
            Профиль
          </Link>
          <Link 
            href="/profile/orders" 
            className={`font-jet text-[24px] font-bold leading-8 ${pathname === "/profile/orders" ? "text-[#F2F2F3]" : "text-[#8585AD]"}`}
          >
            История заказов
          </Link>
          <Link 
            href="" 
            className={`font-jet text-[24px] font-bold leading-8 ${active ? "text-[#F2F2F3]" : "text-[#8585AD]"}`}
            onClick={onLogout}
          >
            Выход
          </Link>
        </nav>
      </section>
      {children}
    </main>
  )
}