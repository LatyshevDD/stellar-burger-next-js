'use client'

import { BurgerIcon, Logo, ListIcon, ProfileIcon, MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Link from 'next/link'
import Image from 'next/image'
import LogoSmal from '../../_images/logo.svg'
import { usePathname } from 'next/navigation';

export default function AppHeader() {

  const pathname = usePathname()

  return (
    <>
      <header className='flex justify-center mx-auto bg-[#1C1C21] mt-5'>
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
        <nav className='flex lg:hidden items-center w-[83%] mt-3 mb-3 gap-2'>
          <Image src={LogoSmal} alt='Логотип Бургер'/>
          <MenuIcon type='primary' />
        </nav>
      </header>
    </>
  );
}