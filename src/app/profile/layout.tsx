'use client'

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/redux/userDataSlice"
import { useCallback, useState, useEffect } from "react"
import { redirect } from "next/navigation"

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
    [dispatch, router]
  )
  
  /* Проверка авторицации пользователя */
  const user =  useAppSelector((store) => store.userData.user)
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
  
  if(isMounted && !user) {
    return redirect(`/login?from=${pathname}`)
  }
  
  /* если пройдена авторизация отображаем страницу личного кабинета,
  иначе перенаправляем на страницу авторизации */
  return isMounted ? (
    <main className="relative flex flex-col pt-4 lg:pt-10 pl-2 lg:pl-4 lg:flex-row lg:gap-[60px] xl:w-[80%] mx-auto h-[var(--main-height-beforexl)] xl:h-[var(--main-height-overxl)] overflow-hidden">
      <section className="hidden lg:flex flex-col gap-[80px] w-[26%]">
        <nav className="flex flex-col gap-10 pt-[80px]">
          <Link 
            href="/profile" 
            className={`${pathname === "/profile" ? "text-[#F2F2F3]" : "text-[#8585AD]"}`}
          >
            <p className="font-jet text-[24px] font-bold leading-8">
            Профиль
            </p>  
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
        {
          pathname === "/profile"
          &&
          <p className="font-jet text-16 font-normal leading-6 text-[#8585AD]">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        }
        {
          pathname === "/profile/orders"
          &&
          <p className="font-jet text-16 font-normal leading-6 text-[#8585AD]">
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        }
      </section>
      {children}
    </main>
  ) 
  : null
}