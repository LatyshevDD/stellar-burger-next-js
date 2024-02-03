'use client'

import { useState, useCallback } from "react"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { forgotPasswordRequest } from "@/utils//api"
import { useRouter } from "next/navigation"
import onlyUnAuth from "@/components/onlyUnAuth/onlyUnAuth"
import Link from "next/link"

const ForgotPassword = () => {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState({hasError: false, errorMessage: ''})

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!email.length) {
        return setError({hasError: true, errorMessage: 'введите e-mail'})
      }
      try {
        await forgotPasswordRequest(email)
        router.push('/reset-password?from=/forgot-password')
      } catch (e) {
        setError({hasError: true, errorMessage: e as string})
      }
    },
    [email, router]
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
        <EmailInput 
          placeholder={'Указжите e-mail'} 
          extraClass="mt-6 mb-6 !w-[304px] flex sm:!w-[480px] sm:block" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          name = {'email'}
        />
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
        >
          Восстановить
        </Button>
        { 
          error
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

export default onlyUnAuth(ForgotPassword)
