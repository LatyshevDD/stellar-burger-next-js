'use client'

import { BurgerIcon, Logo, ListIcon, ProfileIcon, MenuIcon, CloseIcon, ArrowDownIcon, ArrowUpIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Link from 'next/link'
import Image from 'next/image'
import LogoSmal from '../../_images/logo.svg'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function AppHeader() {

  const pathname = usePathname()

  const [burgerMenu, setBurgerMenu] = useState(false)

  return (
    <>
      <header className={`flex justify-center mx-auto bg-[#1C1C21] lg:mt-5 ${burgerMenu && 'hidden'}`}>
        <nav className='hidden items-center mt-4 mb-4 w-[83%] lg:flex'>
          <Link href='/' className={`flex justify-center transition-opacity hover:opacity-60 gap-2 grow-[1] ${pathname === '/' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'}`}>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default">
              Конструктор
            </p>
          </Link>
          <Link href='/feed' className={`flex justify-center transition-opacity hover:opacity-60 gap-2 grow-[1] ${pathname === '/feed' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'}`}>
            <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default">
              Лента заказов
            </p>
          </Link>
          <Link href='/' className='flex justify-center grow-[4]'>
            <Logo />
          </Link>
          <Link href='/profile' className={`flex justify-center transition-opacity hover:opacity-60 gap-2 grow-[1] ${pathname === '/profile' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'}`}>
            <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">
              Личный кабинет
            </p>
          </Link>
        </nav>
        <nav className='flex justify-between lg:hidden items-center w-[83%] mt-3 mb-3 gap-2'>
          <Image src={LogoSmal} alt='Логотип Бургер'/>
          <MenuIcon type='primary' onClick={() => setBurgerMenu(!burgerMenu)} />
        </nav>
      </header>
      <nav className={`${burgerMenu ? 'translate-y-0' : 'translate-y-[-200%]'} flex flex-col pt-4 px-2 z-10 h-screen transition-all absolute top-0 w-full`}>
          <div className='flex justify-between gap-2'>
            <p className="text text_type_main-medium">
              Меню
            </p>
            <CloseIcon type='primary' onClick={() => setBurgerMenu(!burgerMenu)} />
          </div>
          <div className='flex justify-between my-3.5'>
            <Link href='/profile' className='flex gap-2'>
              <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 ${pathname === '/profile' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'} `}>
                Личный кабинет
              </p>
            </Link>
            <ArrowDownIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
          </div>
          <Link href='/' className='flex my-3.5 gap-2'>
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ${pathname === '/' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'}`}>
              Конструктор бургеров
            </p>
          </Link>
          <Link href='/feed' className='flex my-3.5 gap-2'>
            <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ${pathname === '/feed' ? 'text-[rgba(242,242,243,1)]' : 'text-[rgba(133,133,173,1)]'}`}>
              Лента заказов
            </p>
          </Link>
      </nav>
    </>
  );
}