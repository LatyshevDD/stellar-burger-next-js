import { BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import Link from 'next/link'
import text_styles from '../../styles/text_styles.module.css'

export default function AppHeader() {

  return (
    <>
      <header className='flex justify-center mx-auto bg-[#1C1C21] mt-5'>
        <nav className='flex items-center mt-4 mb-4'>
          <Link href='/' className='flex transition-opacity hover:opacity-60 gap-2'>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">
              Конструктор
            </p>
          </Link>

        </nav>
      </header>
    </>
  );
}