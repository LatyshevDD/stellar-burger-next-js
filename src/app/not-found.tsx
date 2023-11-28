import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import Link from "next/link"

export default function NotFound() {

  return (
    <main className='flex flex-col gap-5 justify-center items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
      <p className="text text_type_main-large">
        Oops!
      </p>
      <p className="text text_type_main-large">
        Page not found
      </p>
      <Link href={'/'}>
        <p className="font-jet text-2xl text-purple-700">
          Вернуться на главную
        </p>
      </Link>
    </main>
  )
}
