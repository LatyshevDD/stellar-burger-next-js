'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { login } from "@/redux/userDataSlice"
import { useRouter, useSearchParams } from "next/navigation"
import onlyUnAuth from "@/components/onlyUnAuth/onlyUnAuth"

const Login = () => {

  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  const dispatch = useAppDispatch()
  const router = useRouter()
  const error = useAppSelector((store) => store.userData.isError)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await dispatch(login({email: email, password: password}))
      router.push(`${from ? from : 'profile'}`)
    }, 
    [dispatch, email, password, from, router]
  )

  return (
    <>
      <main className='flex justify-center items-start sm:items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
        <form 
          className='flex flex-col items-center'
          onSubmit={handleSubmit}
        >
          <p className="font-jet text-[28px] sm:text-2xl mt-[20px] sm:mt-[0px]">
            Вход
          </p>
          <EmailInput 
            placeholder={'E-mail'} 
            extraClass="mt-6 !w-[304px] flex sm:!w-[480px] sm:block" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            name = {'email'}
          />
          <PasswordInput 
            placeholder={'Пароль'} 
            extraClass="mt-[20px] sm:mt-[24px] mb-6 !w-[304px] flex sm:!w-[480px] sm:block" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            icon={"ShowIcon"}
            name={"password"}
          />
          <Button 
            htmlType="submit" 
            type="primary" 
            size="medium" 
          >
            Войти
          </Button>
          { 
            error
            &&
            (
              <p className="text text_type_main-default text_color_inactive mt-4">
                Неверный e-mail или пароль
              </p>
            ) 
          }
          <div className='flex flex-col items-center gap-2 mt-[40px] lg:mt-[80px] lg:flex-row'>
            <p className="font-jet text-sm lg:text-base text_color_inactive">
              Вы - новый пользователь?
            </p>
            <Link href="/register">
              <p className='font-jet text-sm lg:text-base text-[#4C4CFF]'>
                Зарегистрироваться
              </p>
            </Link>
          </div>
          <div className='flex flex-col items-center gap-2 mt-4 lg:flex-row'>
            <p className="font-jet text-sm lg:text-base  text_color_inactive">
              Забыли пароль?
            </p>
            <Link href="/forgot-password">
              <p className='font-jet text-sm lg:text-base  text-[#4C4CFF]'>
                Восстановить пароль
              </p>
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}

export default onlyUnAuth(Login)