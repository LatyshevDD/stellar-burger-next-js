'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button, EmailInput, PasswordInput, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { registerRequest } from "@/utils/api"
import onlyUnAuth from "@/components/onlyUnAuth/onlyUnAuth"


const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({hasError: false, errorMessage: ''})
  const [success, setSuccess] = useState({hasSuccess: false, successMessage: ''})

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        let res = await registerRequest({email: email, password: password, name: name})
        setSuccess({hasSuccess: res.success, successMessage: 'Регистрация прошла успешно'})
      } catch(e) {
        setError({hasError: true, errorMessage: e as string})
      }
      
    }, 
    [name, email, password]
  )

  return (
    <>
      <main className='flex justify-center items-start sm:items-center h-[calc(100vh-64px)] xl:h-[calc(100vh-102px)]'>
        <form 
          className='flex flex-col items-center'
          onSubmit={handleSubmit}
        >
          <p className="font-jet text-[28px] sm:text-2xl mt-[20px] sm:mt-[0px]">
            Регистрация
          </p>
          <Input 
            placeholder={'Имя'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            extraClass="mt-6 !w-[304px] flex sm:!w-[480px] sm:block"
            name={'name'}
          />
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
            Зарегистрироваться
          </Button>
          { 
            success.hasSuccess &&
            (
              <p className="text text_type_main-default text_color_inactive mt-4">
                {success.successMessage}
              </p>
            ) 
          }
          { 
            error.hasError &&
            (
              <p className="text text_type_main-default text_color_inactive mt-4">
                {error.errorMessage}
              </p>
            ) 
          }
          <div className='flex flex-col items-center gap-2 mt-[40px] lg:mt-[80px] lg:flex-row'>
            <p className="font-jet text-sm lg:text-base text_color_inactive">
              Уже зарегистрированы?
            </p>
            <Link href="/login">
              <p className='font-jet text-sm lg:text-base text-[#4C4CFF]'>
                Войти
              </p>
            </Link>
          </div>
        </form>
      </main>
    </>
  )
}

export default onlyUnAuth(Register)