'use client'

import { useState } from "react"
import Link from "next/link"
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { login } from "@/redux/userDataSlice"
// import { useNavigate, useLocation } from "react-router-dom"

export default function Login() {

  const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  // const location = useLocation()
  const error = useAppSelector((store) => store.userData.isError)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // await dispatch(login({email: email, password: password}))
    // navigate(location.state.from || '/profile')
  }

  return (
    <>
      <main className='flex justify-center items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
        <form 
          className='flex flex-col items-center'
          onSubmit={handleSubmit}
        >
          <p className="text text_type_main-medium">
            Вход
          </p>
          <EmailInput 
            placeholder={'E-mail'} 
            extraClass="mt-6" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            name = {'email'}
          />
          <PasswordInput 
            placeholder={'Пароль'} 
            extraClass="mt-6 mb-6" 
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
          <div className='flex fap-2 mt-20'>
            <p className="text text_type_main-default text_color_inactive">
              Вы - новый пользователь?
            </p>
            <Link href="/register">
              <p className='text text_type_main-default text-[#4C4CFF]'>
                Зарегистрироваться
              </p>
            </Link>
          </div>
          <div className='flex fap-2 mt-4'>
            <p className="text text_type_main-default text_color_inactive mt-4">
              Забыли пароль?
            </p>
            <Link href="/forgot-password">
              <p className='text text_type_main-default mt-4 text-[#4C4CFF]'>
                Восстановить пароль
              </p>
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}