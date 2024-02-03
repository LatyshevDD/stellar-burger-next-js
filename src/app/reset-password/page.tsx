'use client'

import { useState, useCallback } from "react"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import Link from "next/link"
import { resetPasswordRequest } from "@/utils/api"
import { useSearchParams, useRouter } from "next/navigation"
import onlyUnAuth from "@/components/onlyUnAuth/onlyUnAuth"

const ResetPassword = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const [error, setError] = useState({hasError: false, errorMessage: ''})
  const [success, setSuccess] = useState({hasSuccess: false, successMessage: ''})

  // Проверяем что пользователь перешел со страницы forgot-password
  if (from !== '/forgot-password') {
    router.push('/forgot-password')
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const res = await resetPasswordRequest({password: password, token: token})
        setSuccess({hasSuccess: res.success, successMessage: res.message})
      } catch(e) {
        setError({hasError: true, errorMessage: e as string})
      }
    },
    [password, token]
  )
  
  return (
    <main className='flex justify-center items-start sm:items-center h-[var(--main-height-beforexl)] xl:h-[var(--main-height-overxl)]'>
      <form   
        className='flex flex-col items-center'
        onSubmit={handleSubmit}
      >
        <p className="font-jet text-center text-[28px] sm:text-2xl mt-[20px] sm:mt-[0px]">
          Восстановление пароля
        </p>
        <PasswordInput 
          placeholder={'Введите новый пароль'} 
          extraClass="mt-6 !w-[304px] flex sm:!w-[480px] sm:block" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          name = {'password'}
        />
        <Input 
          placeholder={'Введите код из письма'} 
          extraClass="mt-[20px] sm:mt-[24px] mb-6 !w-[304px] flex sm:!w-[480px] sm:block" 
          value={token}
          onChange={e => setToken(e.target.value)}
          name={"token"}
        />
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
          Сохранить
        </Button>
        { 
          success.hasSuccess
          &&
          (
            <p className="text text_type_main-default text_color_inactive mt-4">
              {success.successMessage}
            </p>
          ) 
        }
        { 
          error.hasError
          &&
          (
            <p className="text text_type_main-default text_color_inactive mt-4">
              {error.errorMessage}
            </p>
          ) 
        }
        <div className='flex flex-col items-center gap-2 mt-[40px] lg:mt-[80px] lg:flex-row'>
          <p className="font-jet text-sm lg:text-base text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link href="/login">
            <p className='font-jet text-sm lg:text-base text-[#4C4CFF]'>
              Войти
            </p>
          </Link>
        </div>
      </form>
    </main>
  )
}

export default onlyUnAuth(ResetPassword)